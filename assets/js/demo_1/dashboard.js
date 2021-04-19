(function ($) {
  'use strict';
  $(function () {
    var lineStatsOptions = {
      scales: {
        yAxes: [{
          display: false
        }],
        xAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        },
        line: {
          tension: 0
        }
      },
      stepsize: 100
      }
      console.log(drugTotals);

  });
    var MixedChartCanvas = document.getElementById('mixed-chart').getContext('2d');
    lineChart = new Chart(MixedChartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Revenue and number of lincences sold'
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: '#212229',
                        stepSize: 50,
                        min: 0,
                        max: 150,
                        autoSkip: true,
                        autoSkipPadding: 15,
                        maxRotation: 0,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Sales',
                        fontSize: 12,
                        lineHeight: 2
                    },
                    ticks: {
                        fontColor: '#212229',
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 20,
                        min: 0,
                        max: 100
                    },
                    gridLines: {
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            },
            legendCallback: function (chart) {
                var text = [];
                text.push('<div class="chartjs-legend d-flex justify-content-center mt-4"><ul>');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                    console.log(chart.data.datasets[i]); // see what's inside the obj.
                    text.push('<li>');
                    text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
                    text.push(chart.data.datasets[i].label);
                    text.push('</li>');
                }
                text.push('</ul></div>');
                return text.join("");
            }
        }
    });

})(jQuery);