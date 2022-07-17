import json
import talib as ta
import numpy as np
from datetime import datetime
import statistics
import copy
# TODO old version, rework
class ConfigBacktester:
    def init(self):
        self.sma_len = 9
        self.std_multiplier_buy = 0.001
        self.std_multiplier_sell = 0.001

        # params from API start
        spread1 = {}
        spread1["leg1"] = "GOQ"
        spread1["leg2"] = "BCN"
        spread1["leg1_price_multiplier"] = 1  # TODO add to FE or use %?
        spread1["leg2_price_multiplier"] = 10
        spreads = []
        spreads.append(spread1)

        dates = {}
        dates["startDate"] = "2000-08-13"
        dates["endDate"] = "2000-08-12"
        dates["firstYear"] = 1994
        dates["lastYear"] = 2021
        # params from API end

        self.spreads = spreads

        # common params
        self.first_year = dates["firstYear"]
        self.last_year = dates["lastYear"]

        self.start_date = dates["startDate"]
        self.end_date = dates["endDate"]

        self.data = self.fill_data()
        pass

    def fill_data(self):
        data = []
        for year in range(self.first_year, self.last_year + 1):
            current_year_data = {
                "year": year,
                "spreads": self.fill_spreads_data(year)
            }
            data.append(current_year_data)
        return data

    def fill_spreads_data(self, year):
        spreads = []
        for i in range(0, len(self.spreads)):
            leg_1 = self.read_leg_from_file(self.spreads[i]["leg1"], year)
            leg_2 = self.read_leg_from_file(self.spreads[i]["leg2"], year)
            leg1_len_adjusted = self.cut_leg(leg_1, leg_2)
            leg2_len_adjusted = self.cut_leg(leg_2, leg_1)

            leg1_normalized = leg1_len_adjusted  # TODO
            leg2_normalized = leg2_len_adjusted

            # TODO adjust leg length if days missed ( day offs in different countries )
            current_spread = {
                "leg1_ticker": self.spreads[i]["leg1"],
                "leg2_ticker": self.spreads[i]["leg2"],
                "leg1_data": leg1_len_adjusted,
                "leg2_data": leg2_len_adjusted,
                "leg1_multiplier": 1,  # deprecated
                "leg1_price_multiplier": self.spreads[i]["leg1_price_multiplier"],
                "leg2_multiplier": 1,
                "leg2_price_multiplier": self.spreads[i]["leg2_price_multiplier"],
                "sma_len": self.sma_len,
            }
            spreads.append(current_spread)
        return spreads

    def cut_leg(self, focus_leg, sample_leg):
        sample_start_date = datetime.strptime(sample_leg[0][0], "%Y-%m-%d")
        sample_end_date = datetime.strptime(sample_leg[len(sample_leg) - 1][0], "%Y-%m-%d")
        current_list = []
        for p in focus_leg:
            p_date = datetime.strptime(p[0], "%Y-%m-%d")
            if sample_start_date <= p_date <= sample_end_date:
                current_list.append(p)
        return current_list

    def read_leg_from_file(self, leg, year):
        with open('data/' + leg + '/' + str(year) + '.json') as json_file:
            r = json.load(json_file)
            items = r['data'][0]
            current_list = []
            for p in items:
                # p_date = datetime.strptime(p[0], "%Y-%m-%d")
                if p[1] is not None:  # leaving long date for sma  # start_date <= p_date and
                    current_list.append(p)
            return current_list

    def get_last_not_null_value(self, items):
        for a in reversed(items):
            if a[1] is not None:
                return a
        return None

    def run(self):
        results = []
        for i in range(0, len(self.data)):  # each data element == year
            current = self.data[i]

            start_date = datetime.strptime(self.start_date, "%Y-%m-%d")
            end_date = datetime.strptime(self.end_date, "%Y-%m-%d")
            if start_date > end_date:
               start_date = start_date.replace(year=current["year"]-1)
            else:
               start_date = start_date.replace(year=current["year"])
            end_date = end_date.replace(year=current["year"])


            current_results = {
                "year": current["year"],
                "data": []  # TODO buy_num, sell_num
            }

            items_len = len(current["spreads"][0]["leg1_data"])  # leg1 and leg2 have same number of items, all spreads have same number of items ( on current implementation )

            for j in range(0, len(current["spreads"])):
                spread = current["spreads"][j]
                leg1_data = spread["leg1_data"]
                leg2_data = spread["leg2_data"]
                sma_len = spread["sma_len"]
                closes = []
                dates = []
                for g in range(0, items_len):
                    p1 = leg1_data[g]
                    p2 = leg2_data[g]
                    if p1[0] != p2[0]:
                        raise RuntimeError('Something wrong: 2 spread dates are not equal.')
                    price = float(p1[1] * spread["leg1_price_multiplier"]) - float(p2[1] * spread["leg2_price_multiplier"])
                    closes.append(price)
                    dates.append(p1[0])
                    current_results["data"].append({
                        "date": p1[0],
                        "slots": [],
                        "price": price
                    })
                np_closes = np.array(closes)
                sma = ta.SMA(np_closes, sma_len)
                std = ta.STDDEV(np_closes, sma_len)
                spread["closes"] = closes
                spread["sma"] = sma
                spread["std"] = std
                spread["dates"] = dates

            # TODO single buy
            for g in range(0, items_len):
                self.copy_prev_slots(current_results["data"], g)
                self.remove_sold_spreads(current_results["data"], g)

                for j in range(0, len(current["spreads"])):
                    spread = current["spreads"][j]
                    p_date = datetime.strptime(spread["dates"][g], "%Y-%m-%d")
                    if p_date >= start_date:
                        self.apply_percents(current_results["data"], g, spread["leg1_data"], spread["leg2_data"], spread["leg1_ticker"], spread["leg2_ticker"], spread["leg1_price_multiplier"], spread["leg2_price_multiplier"])
                        # can sell after end date but not buy
                        if p_date < end_date and\
                                spread["closes"][g] < spread["sma"][g] - abs(spread["std"][g]) * self.std_multiplier_buy:
                            # print("buy - price:" + str(spread["closes"][g]) + "; date:" + spread["dates"][g])
                            self.buy(current_results["data"], g, spread["leg1_ticker"], spread["leg2_ticker"])
                        if spread["closes"][g] > spread["sma"][g] + abs(spread["std"][g]) * self.std_multiplier_sell:
                            # print("sell - price:" + str(spread["closes"][g]) + "; date:" + spread["dates"][g])
                            self.sell(current_results["data"], g, spread["leg1_ticker"], spread["leg2_ticker"])
            results.append(current_results)
        return results

    def analyze_results(self, results):
        years_num = len(results)
        total_percent = 0
        for i in range(0, years_num):
            yearly_percent = 0
            # drawdown
            prev_yearly_percent = 0
            drawdown = 0
            drawdowns = []
            trades_num = 0
            days_in_trading = 0
            # /drawdown
            data = results[i]["data"]
            for j in range(0, len(data)):
                slots = data[j]["slots"]
                if len(slots) > 0:
                    days_in_trading += 1
                for g in range(0, len(slots)):
                    yearly_percent = yearly_percent + slots[g]["percent_from_prev"]
                    # drawdown
                    if prev_yearly_percent > yearly_percent:
                        drawdown = drawdown + (prev_yearly_percent - yearly_percent)
                    else:
                        if drawdown > 0:
                            drawdowns.append(drawdown)
                            drawdown = 0
                    if slots[g]["sell"] is True:
                        trades_num += 1
                    prev_yearly_percent = yearly_percent
                    # /drawdown
            total_percent = total_percent + yearly_percent
            maxDrawdown = max(drawdowns) if drawdowns else 0
            avgDrawdown = statistics.mean(drawdowns) if drawdowns else 0
            print("year " + str(results[i]["year"]) + "; percent " + "{:.2f}".format(yearly_percent) + "; max drawdown " + "{:.2f}".format(maxDrawdown) + "; average drawdown " + "{:.2f}".format(avgDrawdown) +
                  "; trades num " + "{:.0f}".format(trades_num) + "; days in trading " + "{:.0f}".format(days_in_trading))
        print("average yearly % " + "{:.2f}".format(total_percent / years_num))
        pass

    def copy_prev_slots(self, data, g):
        if g == 0:
            return
        data[g]["slots"] = copy.deepcopy(data[g - 1]["slots"])
        pass

    def apply_percents(self, data, g, leg1_data, leg2_data, leg1_ticker, leg2_ticker, leg1_price_multiplier, leg2_price_multiplier):
        if g == 0:
            return
        if not self.spread_exists(data[g]["slots"], leg1_ticker, leg2_ticker):  # spread is not bought
            return
        if not self.spread_exists(data[g - 1]["slots"], leg1_ticker, leg2_ticker):  # spread was just bought, nothing to calculate
            return
        slot = self.get_slot(data[g]["slots"], leg1_ticker, leg2_ticker)
        slot["percent_from_prev"] = self.trade_percent(leg1_data[g][1], leg2_data[g][1], leg1_data[g - 1][1], leg2_data[g - 1][1], leg1_price_multiplier, leg2_price_multiplier)
        pass

    def trade_percent(self, leg1Price, leg2Price, leg1PrevPrice, leg2PrevPrice, leg1_price_multiplier, leg2_price_multiplier):
        buyPrice = leg1PrevPrice * leg1_price_multiplier - leg2PrevPrice * leg2_price_multiplier
        sellPrice = leg1Price * leg1_price_multiplier - leg2Price * leg2_price_multiplier
        diff = sellPrice - buyPrice
        initialPosition = leg1PrevPrice * leg1_price_multiplier + leg2PrevPrice * leg2_price_multiplier
        return diff / initialPosition * 100

    def buy(self, data, g, leg1, leg2):
        if self.spread_exists(data[g]["slots"], leg1, leg2):
            return
        data[g]["slots"].append({"leg1": leg1, "leg2": leg2, "percent_from_prev": 0, "sell": False})
        pass

    def sell(self, data, g, leg1, leg2):
        if not self.spread_exists(data[g]["slots"], leg1, leg2):
            return
        slot = self.get_slot(data[g]["slots"], leg1, leg2)
        slot["sell"] = True  # marking as "sold", not deleting right away to save percent
        pass

    def remove_sold_spreads(self, data, g):
        sold_indexes = self.get_sold_indexes(data[g]["slots"])
        for i in range(0, len(sold_indexes)):
            data[g]["slots"].pop(sold_indexes[i])
        pass

    def spread_exists(self, slots, leg1, leg2):
        for i in range(0, len(slots)):
            if slots[i]["leg1"] == leg1 and slots[i]["leg2"] == leg2:
                return True
        return False

    def get_sold_indexes(self, slots):
        out = []
        for i in range(0, len(slots)):
            if slots[i]["sell"] == True:
                out.append(i)
        return out

    def get_slot(self, slots, leg1, leg2):
        for i in range(0, len(slots)):
            if slots[i]["leg1"] == leg1 and slots[i]["leg2"] == leg2:
                return slots[i]
        return None

algo = ConfigBacktester()
algo.init()
results = algo.run()
algo.analyze_results(results)
print('Finished')
