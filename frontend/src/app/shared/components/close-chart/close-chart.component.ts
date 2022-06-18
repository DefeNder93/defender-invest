import { Component, OnInit } from '@angular/core';
// TODO proper import
declare const d3: any;
declare const techan: any;

@Component({
  selector: 'app-close-chart',
  templateUrl: './close-chart.component.html',
  styleUrls: ['./close-chart.component.scss']
})
export class CloseChartComponent implements OnInit {

  ngOnInit(): void {
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%d-%b-%y');

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

    const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    loadData('/assets/data.csv', svg, '1', 'red');
    loadData('/assets/data2.csv', svg, '2', 'blue');

    function loadData(path: string, svg: any, id: string, color: string) {
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
        // Only want this button to be active if the data has loaded
        draw(data.slice(0, data.length-20), svg, id);
        // d3.select('button').on('click', function() { draw(data, svg); }).style('display', 'inline');

        const obj = document.getElementById('close' + id);
        obj?.querySelector('path.line')?.setAttribute('style', 'stroke: ' + color);
      });
    }

    function draw(data: any, svg: any, id: string) {
      x.domain(data.map(close.accessor().d));
      y.domain(techan.scale.plot.ohlc(data, close.accessor()).domain());

      svg.selectAll('g.close' + id).datum(data).call(close);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }

}
