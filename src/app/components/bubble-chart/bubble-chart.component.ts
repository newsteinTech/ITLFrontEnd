import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

    //d3 bubble chart
    dataset = {
        "children": [
          {
            name: 'ABC',
            children: [
              { "Name": "Olives", "Count": 4319 },
              { "Name": "Tea", "Count": 4159 },
              { "Name": "Mashed Potatoes", "Count": 2583 },
              { "Name": "Boiled Potatoes", "Count": 2074 },
              { "Name": "Milk", "Count": 1894 },
              { "Name": "Chicken Salad", "Count": 1809 },
              { "Name": "Vanilla Ice Cream", "Count": 1713 },
              { "Name": "Cocoa", "Count": 1636 },
              { "Name": "Lettuce Salad", "Count": 1566 }
            ]
          }, {
            name: 'CDE',
            children: [{ "Name": "Lobster Salad", "Count": 1511 },
            { "Name": "Chocolate", "Count": 1489 },
            { "Name": "Apple Pie", "Count": 1487 },
            { "Name": "Orange Juice", "Count": 1423 },
            { "Name": "American Cheese", "Count": 1372 },
            { "Name": "Green Peas", "Count": 1341 },
            { "Name": "Assorted Cakes", "Count": 1331 },
            { "Name": "French Fried Potatoes", "Count": 1328 },
            { "Name": "Potato Salad", "Count": 1306 },
            { "Name": "Baked Potatoes", "Count": 1293 },
            { "Name": "Roquefort", "Count": 1273 },
            { "Name": "Stewed Prunes", "Count": 1268 }]
          }
        ]
    }

    //ng2 bubble chart
    /* public bubbleChartOptions: ChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{ ticks: { min: 0, max: 30, } }],
          yAxes: [{ ticks: { min: 0, max: 30, } }]
        }
      };
      public bubbleChartType: ChartType = 'bubble';
      public bubbleChartLegend = true;
    
      public bubbleChartData: ChartDataSets[] = [
        {
          data: [
            { x: 10, y: 10, r: 10 },
            { x: 15, y: 5, r: 15 },
            { x: 26, y: 12, r: 23 },
            { x: 7, y: 8, r: 8 },
          ],
          label: 'Series A',
        },
      ];
    
      public bubbleChartColors: Color[] = [
        {
          backgroundColor: [
            'red',
            'green',
            'blue',
            'purple',
          ]
        }
      ]; */

  constructor() { }

  ngOnInit() {

    this.renderChart();
  }


  renderChart() {
    let diameter = 600;
    let height = 400;
    let width = 600;
    let width2 = 200;
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let bubble = d3.pack()
      .size([width, height])
      .padding(1.5);

    let svg = d3.select('#chart')
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bubble")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");;

    let nodes = d3.hierarchy(this.dataset)
      .sum(function (d: any) {
        return d.Count;
      });

    let node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      }).style("fill", function (d, i: any) {
        return color(i);
      });

    node.append("title")
      .text(function (d: any) {
        return d.Name + ": " + d.Count;
      });

    node.append("circle")
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y })
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d, i: any) {
        return color(i);
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append('text')
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    // d3.select(self.frameElement)
    //   .style("height", height + "px")
    //   .style("width", width2 + "px");;


  }

}
