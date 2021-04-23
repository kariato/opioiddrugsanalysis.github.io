// JavaScript source code
charts = [];
chartIds = [];

const argSort = (labelsList, valuesList) => labelsList
    .map((item, index) => [valuesList[index], item])
    .sort(([arg1], [arg2]) => arg2 - arg1)
    .map(([, item]) => item);


function listAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function (item, index) {
        total += item;
        count++;
    });

    return total / count;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


function cleanCanvas() {

    for (i = 0; i < charts.length; i++)
    {
        charts[i].destroy();
    }

    for (i = 0; i < chartIds.length; i++) {
        document.getElementById(chartIds[i]).width += 0;
        document.getElementById(chartIds[i]).html = "";
    }
    chartIds = [];
    //document.getElementById("correlated1").width += 0;
    //document.getElementById("correlated2").width += 0;
    //document.getElementById("correlated3").width += 0;
    //document.getElementById("correlated1").html = "";
    //document.getElementById("correlated2").html = "";
    //document.getElementById("correlated3").html = "";

}

function d3AddhorizontalBar() {
    var data = [{
        "name": "Apples",
        "value": 20,
    },
    {
        "name": "Bananas",
        "value": 12,
    },
    {
        "name": "Grapes",
        "value": 19,
    },
    {
        "name": "Lemons",
        "value": 5,
    },
    {
        "name": "Limes",
        "value": 16,
    },
    {
        "name": "Oranges",
        "value": 26,
    },
    {
        "name": "Pears",
        "value": 30,
    }];

    //sort bars based on value
    data = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
    };

    var width = 360 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    var svg = d3.select("#correlated1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .rangeRound([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0);
    //.orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });
}

function getTop3Contributers(countyDataDict, endingKeys) {
    labelList = [];
    valueList = [];
    attributes = {};


    


    for (var key in countyDataDict) {

        if (countyDataDict.hasOwnProperty(key)) {
            value = Math.abs(parseFloat(countyDataDict[key]));


            for (i = 0; i < endingKeys.length; i++) {
                endingKey = endingKeys[i];
                if (key.endsWith(endingKey)) {
                    newKey = key.replace(endingKey, '');
                    if (attributes.hasOwnProperty(newKey))
                        attributes[newKey].push(value)
                    else {
                        attributes[newKey] = [value]
                    }
                    break;
                }
            };
        }

    }

    for (var attribute in attributes) {
        attributes[attribute] = listAverage(attributes[attribute]);
        labelList.push(attribute);
        valueList.push(attributes[attribute])
    }


    orderedLabelList = argSort(labelList, valueList);

    top3Labels = orderedLabelList.slice(0, 3);
    return top3Labels;
}

function addCorrelationCharts(fips, allCountiesDataDict, historicalDrugsData) {
    endingKeys = ["_grams_oxy", "_quant_oxy", "_grams_hydro", "_quant_hydro"];
    top3Contributers = getTop3Contributers(allCountiesDataDict[fips], endingKeys);
    if (top3Contributers.length < 3) { return;}
    //alert("I'm getting fired");
    cleanCanvas();

    

    firstContributerData = historicalDrugsData[fips][top3Contributers[0].toLowerCase()];
    secondContributerData = historicalDrugsData[fips][top3Contributers[1].toLowerCase()];
    thirdContributerData = historicalDrugsData[fips][top3Contributers[2].toLowerCase()];

    canvasID = "correlated1"
    chartType = "line"
    chartTitle = "Top correlated factor: " + top3Contributers[0];
    chartLabel = "Data for:"
    listOfLabels1 = [];
    listOfValues1 = [];
    for (var key in firstContributerData) {
        listOfLabels1.push(key);
        listOfValues1.push(parseFloat(firstContributerData[key]));


    }




    canvasID2 = "correlated2"
    chartType2 = "line"
    chartTitle2 = "Second correlated factor: " + top3Contributers[1];
    chartLabel2 = "Data for:"
    listOfLabels2 = [];
    listOfValues2 = [];
    for (var key in secondContributerData) {
        listOfLabels2.push(key);
        listOfValues2.push(secondContributerData[key]);
    }





    canvasID3 = "correlated3"
    chartType3 = "line"
    chartTitle3 = "Third correlated factor: " + top3Contributers[2];
    chartLabel3 = "Data for:"
    listOfLabels3 = [];
    listOfValues3 = [];
    for (var key in thirdContributerData) {
        listOfLabels3.push(key);
        listOfValues3.push(Math.round(thirdContributerData[key], 2));
    }

    opioidsOxy = historicalDrugsData[fips]["GRAMS_OXYCODONE"];
    opioidsHydro = historicalDrugsData[fips]["GRAMS_HYDROCODONE"];


    listOfOxyLabels = []
    listOfOxyValues = []
    listOfHydroLabels = []
    listOfHydroValues = []

    for (var key in opioidsOxy) {
        listOfOxyLabels.push(key);
        listOfOxyValues.push(Math.round(parseFloat(opioidsOxy[key]),2));
    }


    for (var key in opioidsHydro) {
        listOfHydroLabels.push(key);
        listOfHydroValues.push(Math.round(parseFloat(opioidsHydro[key]),2));
    }

    //, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues
    addChart(canvasID, "line", chartTitle, "Data per year", listOfLabels1, listOfValues1, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
    addChart(canvasID2, "line", chartTitle2, "Data per year", listOfLabels2, listOfValues2, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
    addChart(canvasID3, "line", chartTitle3, "Data per year", listOfLabels3, listOfValues3, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);

    //document.getElementById("correlated1").width += 0;
    //document.getElementById("correlated2").width += 0;
    //document.getElementById("correlated3").width += 0;

}

//, listOfData,
//oxyLabels, oxyValues, hydroLabels, hydroValues

function addChart(canvasID, chartType, chartTitle, chartLabel, listOfLabels, listOfData, oxyLabels, oxyValues, hydroLabels, hydroValues) {

    //var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);
    var COLORS = "red";
    oxyValues.map(value => isNaN(value) ? 0 : value);
    hydroValues.map(value => isNaN(value) ? 0 : value);
    listOfData.map(value => isNaN(value) ? 0 : value);


    oxyMax = Math.max(...oxyValues);
    oxyMin = Math.min(...oxyValues);

    hydroMax = Math.max(...hydroValues);
    hydroMin = Math.min(...hydroValues);

    oxyMin = Math.min(...oxyValues);

    opioidMax = Math.min(oxyMax, hydroMax);
    opioidMin = Math.min(oxyMin, hydroMin);

    let correlatedMax = Math.max(...listOfData);
    let correlatedMin = Math.min(...listOfData);
    chartIds.push(canvasID);
    aChart = new Chart(document.getElementById(canvasID), {
        type: chartType,
        data: {
            labels: listOfLabels,
            datasets: [
                
                
                {
                    yAxisID: 'B',
                    label: 'Oxycodone',
                    //backgroundColor: "white",
                    borderColor: "#de2d26",
                    data: oxyValues,
                    fill: false
                },
                {
                    yAxisID: 'B',
                    label: 'Hydrocodone',
                    //backgroundColor: "white",
                    borderColor: "#fc9272",
                    data: hydroValues,
                    fill: false
                },
                {
                    yAxisID: 'A',
                    label: 'Correlated factor',
                    //backgroundColor: "white",
                    borderColor: "#3e95cd",
                    data: listOfData,
                    fill: false
                }

            ]
        },
        options: {
            legend: { display: true },
            title: {
                display: true,
                text: chartTitle
            },
            scales: {
                yAxes: [{
                    id: 'B',
                    type: 'linear'
                    
                }, {
                    id: 'A',
                    type: 'linear',
                    position: 'right',
                        ticks: {
                            max: correlatedMax,// Math.round(opioidMax / 1000) * 1000,
                            min: correlatedMin
                        }

                }]
            }
        }
    });
    charts.push(aChart);



}


function addChartDynamic(canvasID, chartType, chartTitle, dataSetDictionary) {

    //var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);
    var COLORS = ['#fd8d3c', '#d94701', '#6baed6', '#2171b5'];

    chartDS = [];
    listOfLabels = [];
    i = 0;
    Object.keys(dataSetDictionary).forEach(key => {
        dataSetDictionary[key][1].map(value => isNaN(value) ? 0 : value);
        listOfLabels.push(dataSetDictionary[key][0]);
        chartDS.push({
            label: key,
            //backgroundColor: "white",
            borderColor: COLORS[i++],
            data: dataSetDictionary[key][1],
            fill: false
        });
    });

    chartIds.push(canvasID);
    aChart = new Chart(document.getElementById(canvasID), {
        type: chartType,
        data: {
            labels: listOfLabels[0],
            datasets: chartDS
        },
        options: {
            legend: { display: true },
            title: {
                display: true,
                text: chartTitle
            }

        }
    });
    charts.push(aChart);



}


