import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChardSpread, FEChardSpread } from '../../../spreads/shared/models/spread-response.model';
// TODO proper import
declare const d3: any;
declare const techan: any;

@Component({
  selector: 'app-close-chart',
  templateUrl: './close-chart.component.html',
  styleUrls: ['./close-chart.component.scss']
})
export class CloseChartComponent implements OnInit, OnChanges {

  @Input() spreads: FEChardSpread[] | null = null;

  // TODO horizontal support lines ( not movable ) http://bl.ocks.org/andredumas/10194a84a3e46fe127d4

  ngOnInit(): void {
    this.update();
  }

  private update = (spreads: any | null = null) => {
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%d-%b-%y');

    const parseDateApi = d3.timeParse('%Y-%m-%d');

    const x = techan.scale.financetime()
      .range([0, width])
      .outerPadding(0);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const close = techan.plot.close()
      .xScale(x)
      .yScale(y);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const selection = d3.select('#chart-svg');
    selection.text('');  // removing previous data
    const svg = selection
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const tradearrow = techan.plot.tradearrow()  // http://bl.ocks.org/andredumas/3c0eefdd77a6380b1a35
      .xScale(x)
      .yScale(y)
      .orient(function(d: any) { return d.type.startsWith('buy') ? 'up' : 'down'; })
      .on('mouseenter', enter)
      .on('mouseout', out);

    if (!!spreads) {
      const colors = ['orange', 'pink', 'red', 'blue'];
      let i = 0;
      spreads.forEach((e: any) => loadApiData(e.data, svg, ++i + '', colors.pop() || 'green'));
    } else {
      loadCsvData('/assets/data.csv', svg, '1', 'red');
      loadCsvData('/assets/data2.csv', svg, '2', 'blue');
    }

    const valueText = svg.append('text')
      .style('text-anchor', 'end')
      .attr('class', 'coords')
      .attr('x', width - 5)
      .attr('y', -8);

    const dateFormat = d3.timeFormat('%d-%b-%y'),
      valueFormat = d3.format(',.2f');

    function enter(d: any) {
      valueText.style('display', 'inline');
      refreshText(d);
    }

    function out() {
      valueText.style('display', 'none');
    }

    function refreshText(d: any) {
      valueText.text('Trade: ' + dateFormat(d.date) + ', ' + d.type + ', ' + valueFormat(d.price));
    }

    function loadCsvData(path: string, svg: any, id: string, color: string) {
      d3.csv(path, function(error: any, data: any) {
        const accessor = close.accessor();

        data = data.slice(0, 200).map(function(d: any) {
          return {
            date: parseDate(d.Date),
            open: +d.Open,
            high: +d.High,
            low: +d.Low,
            close: +d.Close,
            volume: +d.Volume
          };
        }).sort(function(a: any, b: any) { return d3.ascending(accessor.d(a), accessor.d(b)); });

        svg.append('g')
          .attr('class', 'close' + id)
          .attr('id', 'close' + id);

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
          .attr('class', 'y axis')
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Price ($)');

        svg.append('g')
          .attr('class', 'tradearrow');

        const trades = [
          { date: data[5].date, type: 'buy', price: data[5].close, quantity: 1000 },
          { date: data[15].date, type: 'sell', price: data[15].close, quantity: 200 }
        ];

        // Only want this button to be active if the data has loaded
        draw(data.slice(0, data.length - 20), svg, id, trades);
        // d3.select('button').on('click', function() { draw(data, svg); }).style('display', 'inline');

        const obj = document.getElementById('close' + id);
        obj?.querySelector('path.line')?.setAttribute('style', 'stroke: ' + color);
      });
    }

    function loadApiData(data: [string, number][], svg: any, id: string, color: string) {
        const accessor = close.accessor();

        const outData = data.slice(0, 200).map(function(d: [string, number]) {
          return {
            date: parseDateApi(d[0]),
            open: +d[1],
            high: +d[1],
            low: +d[1],
            close: +d[1],
            volume: +d[1]
          };
        }).sort(function(a: any, b: any) { return d3.ascending(accessor.d(a), accessor.d(b)); });

        svg.append('g')
          .attr('class', 'close' + id)
          .attr('id', 'close' + id);

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
          .attr('class', 'y axis')
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Price ($)');

        svg.append('g')
          .attr('class', 'tradearrow');

        // const trades = [
        //   { date: data[5].date, type: 'buy', price: data[5].close, quantity: 1000 },
        //   { date: data[15].date, type: 'sell', price: data[15].close, quantity: 200 }
        // ];

        // Only want this button to be active if the data has loaded
        draw(outData.slice(0, data.length - 20), svg, id, []);  // trades
        // d3.select('button').on('click', function() { draw(data, svg); }).style('display', 'inline');

        const obj = document.getElementById('close' + id);
        obj?.querySelector('path.line')?.setAttribute('style', 'stroke: ' + color);

    }

    function draw(data: any, svg: any, id: string, trades: any) {
      x.domain(data.map(close.accessor().d));
      y.domain(techan.scale.plot.ohlc(data, close.accessor()).domain());

      svg.selectAll('g.close' + id).datum(data).call(close);
      svg.selectAll('g.tradearrow').datum(trades).call(tradearrow);

      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    !!changes.spreads.currentValue && !!changes.spreads.currentValue.length && this.update(changes.spreads.currentValue);
  }

}
