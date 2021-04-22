// JavaScript source code



//https://stackoverflow.com/questions/5731193/how-to-format-numbers
var formatThousandsNoRounding = function (n, dp) {
    var e = '', s = e + n, l = s.length, b = n < 0 ? 1 : 0,
        i = s.lastIndexOf('.'), j = i == -1 ? l : i,
        r = e, d = s.substr(j + 1, dp);
    while ((j -= 3) > b) {r = ',' + s.substr(j, 3) + r; }
    return s.substr(0, j + 3) + r +
        (dp ? '.' + d + (d.length < dp ?
            ('00000').substr(0, dp - d.length) : e) : e);
};

function totalUpdate(fipcode, headcol, targethead, chartlabelid, chartlabel, fmt) {
    if (fmt == "Percentage") {
    $(targethead).html("+" + parseFloat(drugTotals[fipcode][headcol]).toFixed(2) + "%");
    } else {
    $(targethead).html(formatThousandsNoRounding(drugTotals[fipcode][headcol]), 0);
    }
    years = [];
    unemp = [];
    if (chartlabelid in chartRefs) {
        chartRefs[chartlabelid].destroy();
    }
    Object.keys(drugTotalsYear).forEach(function (key) {years.push(key), unemp.push(drugTotalsYear[key][headcol]); });
    chartHandles[chartlabelid] = document.getElementById(chartlabelid).getContext('2d');
    var gradientStrokeFill_1 = chartHandles[chartlabelid].createLinearGradient(0, 100, 200, 0);
    gradientStrokeFill_1.addColorStop(0, '#fa5539');
    gradientStrokeFill_1.addColorStop(1, '#fa3252');

    var areaData = {
    labels: years,
        datasets: [{
    label: chartlabel,
            data: unemp,
            backgroundColor: gradientStrokeFill_1,
            borderColor: '#fa394e',
            borderWidth: 0,
            pointBackgroundColor: "#fa394e",
            pointRadius: 7,
            pointBorderWidth: 3,
            pointBorderColor: '#fff',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "#fa394e",
            pointHoverBorderColor: "#fa394e",
            pointHoverBorderWidth: 2,
            pointHitRadius: 7,
        }]
    };
    var areaOptions = {
    responsive: true,
        animation: {
    animateScale: true,
            animateRotate: true
        },
        elements: {
    point: {
    radius: 0
            }
        },
        layout: {
    padding: {
    left: -10,
                right: 0,
                top: 0,
                bottom: -10
            }
        },
        legend: false,
        scales: {
    xAxes: [{
    gridLines: {
    display: false
                },
                ticks: {
    display: false
                }
            }],
            yAxes: [{
    gridLines: {
    display: false
                },
                ticks: {
    display: false
                }
            }]
        }
    }
    chartRefs[chartlabelid] = new Chart(chartHandles[chartlabelid], {
    type: 'line',
        data: areaData,
        options: areaOptions
    });
};

function fipsUpdate(fipcode, headcol, targethead, chartlabelid, chartlabel, fmt) {
   
    if (fmt == "Percentage") {
        $(targethead).html("+" + parseFloat(drugTotalsFIPS[fipcode][headcol]).toFixed(2) + "%");
    } else {
        $(targethead).html(formatThousandsNoRounding(drugTotalsFIPS[fipcode][headcol]), 0);
    }
    years = [];
    unemp = [];
    if (chartlabelid in chartRefs) {
        chartRefs[chartlabelid].destroy();
    }
    Object.keys(drugTotalsYear).forEach(function (key) { years.push(key), unemp.push(drugTotalsFIPS[fipcode][headcol][key]); });
    chartHandles[chartlabelid] = document.getElementById(chartlabelid).getContext('2d');
    var gradientStrokeFill_1 = chartHandles[chartlabelid].createLinearGradient(0, 100, 200, 0);
    gradientStrokeFill_1.addColorStop(0, '#fa5539');
    gradientStrokeFill_1.addColorStop(1, '#fa3252');

    var areaData = {
        labels: years,
        datasets: [{
            label: chartlabel,
            data: unemp,
            backgroundColor: gradientStrokeFill_1,
            borderColor: '#fa394e',
            borderWidth: 0,
            pointBackgroundColor: "#fa394e",
            pointRadius: 7,
            pointBorderWidth: 3,
            pointBorderColor: '#fff',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "#fa394e",
            pointHoverBorderColor: "#fa394e",
            pointHoverBorderWidth: 2,
            pointHitRadius: 7,
        }]
    };
    var areaOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        elements: {
            point: {
                radius: 0
            }
        },
        layout: {
            padding: {
                left: -10,
                right: 0,
                top: 0,
                bottom: -10
            }
        },
        legend: false,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }]
        }
    }
    chartRefs[chartlabelid] = new Chart(chartHandles[chartlabelid], {
        type: 'line',
        data: areaData,
        options: areaOptions
    });
};
        var config = { "defaultValue": "GRAMS_OXYCODONE_PER_PERSON" };
        var property1 = "GRAMS_OXYCODONE_PER_PERSON";
        var property2 = "All";
        var width = 1400;
        var height = 700;
        var svg = d3.select("#root").append("svg").attr("preserveAspectRatio", "xMinYMin meet").style("background-color", "#c9e8fd")
            .attr("viewBox", "0 0 " + width + " " + height)
            .classed("svg-content", true);

        //var projection = d3.geoNaturalEarth().translate([width / 2, height / 2]).scale(280).center([10, 10]);
        var geopath = d3.geoPath();
       

        function setupResizeMap() {
            const color = d3.scaleThreshold()

            headers = ['median_household_income', 'indiv_in_poverty', 'num_degree_holders', 'indiv_in_school',
                'pop_nonwhite', 'num_veterans', 'housing_units', 'median_home_value', 'num_homes_with_mortgage',
                'median_monthly_housing_costs', 'est_total_bedrooms',
                'pop_labor_jobs', 'unemployment_rate', 'osha_deaths', 'POPESTIMATE',
                'nonviolent_crime_for_county', 'violent_crime_for_county', 'GRAMS_HYDROCODONE', 'GRAMS_OXYCODONE', 'Opioid_Deaths',
                'QUANTITY_HYDROCODONE',  'GRAMS_OXYCODONE', 'QUANTITY_OXYCODONE', 
                'QUANTITY_HYDROCODONE_PER_PERSON', 'QUANTITY_OXYCODONE_PER_PERSON', 'GRAMS_HYDROCODONE_PER_PERSON', 'GRAMS_OXYCODONE_PER_PERSON'];

            header_texts = ['median_household_income', 'indiv_in_poverty', 'num_degree_holders', 'indiv_in_school',
                'poulation_nonwhite', 'number_of_veterans', 'housing_units', 'median_home_value', 'num_homes_with_mortgage',
                'median_monthly_housing_costs', 'est_total_bedrooms',
                'poulation_labor_jobs', 'unemployment_rate', 'osha_deaths', 'Population Estimates',
                'non-violent_crime_for_county', 'violent_crime_for_county', 'GRAMS_HYDROCODONE', 'GRAMS_OXYCODONE', 'Opioid_Deaths',
                'QUANTITY_HYDROCODONE', 'GRAMS_OXYCODONE', 'QUANTITY_OXYCODONE',
                'QUANTITY_HYDROCODONE_PER_PERSON', 'QUANTITY_OXYCODONE_PER_PERSON', 'GRAMS_HYDROCODONE_PER_PERSON', 'GRAMS_OXYCODONE_PER_PERSON'];

            var option_select = d3.select('#selectors').append("div");
            for (var i = 0, size = headers.length; i < size; i++) {
                property1s = header_texts[i].replace(/_/g, " ");
                property1s = property1s.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
                javastr = "javascript:setfeat('" + headers[i] + "')";
                var opt = option_select.append("a")
                    .attr("value", headers[i])
                    .attr("href", javastr)
                    .attr("class", "dropdown - item")
                    .text(property1s);
             opt.attr("selected", "true");
                //}
            }
            option_select.on("change", function (d) {
                console.log(this.value);
                property1 = this.value;
                createMapAndLegend(this.value);
            });

            var field2s = ["All", "2006", "2007", "2008", "2009", "2010", "2011", "2012"];
            var option_select2 = d3.select('#selectorsYears').append("div");
            for (var i = 0; i < field2s.length; i++) {
                javastr = "javascript:setyear('" + field2s[i] + "')";
                var opt = option_select2.append("a")
                    .attr("href", javastr)
                    .attr("value", field2s[i])
                    .attr("class", "dropdown - item")
                    .text(field2s[i]);

            }
            option_select2.on("change", function (d) {
                console.log(this.value);
                property2 = this.value;
                createMapAndLegend(this.value);
            });
            drawResizeMap();
            //createMapAndLegend(values[0], gameSales, gameRatings, config.defaultValue);
            //map = values[0];

};

function setgraphs(graphtypes) {
    //Unemployment
    //'pop_labor_jobs', 'unemployment_rate',
    //    'nonviolent_crime_for_county', 'violent_crime_for_county',
    //    Income
    //'indiv_in_poverty', median_household_income, 'median_home_value', 'unemployment_rate'
    //Housing
    //'housing_units', 'median_home_value', 'num_homes_with_mortgage',
    //    'median_monthly_housing_costs', 'est_total_bedrooms',
    //    Opioid_Deaths

    //'Opioid_Deaths',  , 'osha_deaths',
    //    'GRAMS_HYDROCODONE_PER_PERSON', 'GRAMS_OXYCODONE_PER_PERSON'
    //Demographics
    //'median_household_income', 'pop_nonwhite', 'num_veterans', 'POPESTIMATE',
    //    Education
    //'num_degree_holders', 'indiv_in_school',
    //    female_bach_degree, male_bach_degree,
}

function setfeat(feat) {
    property1 = feat;
        property1s = feat.replace(/_/g, " ");
        property1s = property1s.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));;
            $("#FeatureName").html("Feature: " + property1s);
            drawResizeMap();
        }

function setyear(feat) {
    property2 = feat;
    $("#YearValue").html("Year: " + property2);
    drawResizeMap();
}
        function drawResizeMap() {
            SelectedValues = [0];
            var fields = Object.keys(drugTotalsFIPS);
            for (var i = 1; i < fields.length; i++) {
                if (property2 == "All") {
                    if (drugTotalsFIPS[fields[i]][property1] != 0.0) {
                        SelectedValues.push(drugTotalsFIPS[fields[i]][property1]);
                    }
                } else {
                    if (drugs[fields[i]][property1][property2] != 0.0) {
                        SelectedValues.push(drugs[fields[i]][property1][property2]);
                    }
                }
            };
            property1s = property1.replace(/_/g, " ");
            property1s = property1s.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));;
            var colorScale = d3.scaleQuantile()
                .domain(SelectedValues)
                .range(['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026']);
            svg.selectAll("path").remove();
            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([300, 150])
                .html(function (d) {
                    state = states[d.id.substr(0, 2)]['State'];
                    
                    if (property2 == "All") {
                        od = drugTotalsFIPS[d.id]["Opioid_Deaths"];
                        pop = drugTotalsFIPS[d.id]["POPESTIMATE"];
                        HYDROCODONE_PER_PERSON = drugTotalsFIPS[d.id]["QUANTITY_HYDROCODONE_PER_PERSON"];
                        OXYCODONE_PER_PERSON = drugTotalsFIPS[d.id]["QUANTITY_OXYCODONE_PER_PERSON"];
                        GRAMS_HYDROCODONE_PER_PERSON = drugTotalsFIPS[d.id]["GRAMS_HYDROCODONE_PER_PERSON"];
                        GRAMS_OXYCODONE_PER_PERSON = drugTotalsFIPS[d.id]["GRAMS_OXYCODONE_PER_PERSON"];
                        featureValue = drugTotalsFIPS[d.id][property1];
                    } else {
                        od = drugs[d.id]["Opioid_Deaths"][property2];
                        pop = drugs[d.id]["POPESTIMATE"][property2];
                        HYDROCODONE_PER_PERSON = drugs[d.id]["QUANTITY_HYDROCODONE_PER_PERSON"][property2];
                        OXYCODONE_PER_PERSON = drugs[d.id]["QUANTITY_OXYCODONE_PER_PERSON"][property2];
                        GRAMS_HYDROCODONE_PER_PERSON = drugs[d.id]["GRAMS_HYDROCODONE_PER_PERSON"][property2];
                        GRAMS_OXYCODONE_PER_PERSON = drugs[d.id]["GRAMS_OXYCODONE_PER_PERSON"][property2];
                        featureValue = drugs[d.id][property1][property2];
                    }
                    return "<ul><li>County: " + d.properties.name +
                        "</li><li> State: " + state + 
                        "</li><li> " + property1s + ": " + formatThousandsNoRounding(featureValue, 4) +
                        "</li><li> Opioid Deaths: " + formatThousandsNoRounding(od,0) +
                        "</li><li> Population: " + formatThousandsNoRounding(pop, 0) +
                       "</li><li> HYDROCODONE PER PERSON (pills): " + formatThousandsNoRounding(HYDROCODONE_PER_PERSON,3) +
                        "</li><li> OXYCODONE_PER_PERSON (pills): " + formatThousandsNoRounding(OXYCODONE_PER_PERSON,2) +
                        "</li><li> HYDROCODONE_PER_PERSON (grams): " + formatThousandsNoRounding(GRAMS_HYDROCODONE_PER_PERSON,4) +
                "</li><li> OXYCODONE_PER_PERSON (grams): " + formatThousandsNoRounding(GRAMS_OXYCODONE_PER_PERSON,4) +
                        "</li></ul> ";
                });
            svg.call(tool_tip);
            var x = height - 440;

            svg.selectAll("path")
                .data(topojson.feature(counties, counties.objects.counties).features)
                .enter()
                .append("path")
                .attr("d", geopath)
                .attr('fill', function (d) {
                    if (d.id in drugTotalsFIPS) {
                        //console.log(d.properties.name, gameSales[selectedGame][d.properties.name]["Average Rating"]);
                        t1 = drugTotalsFIPS[d.id];
                        t2 = t1[property1];
                        if (property2 == "All") {
                            return colorScale(drugTotalsFIPS[d.id][property1]);
                        } else {
                            return colorScale(parseInt(drugs[d.id][property1][parseInt(property2)]));
                        }
                    }
                    else {
                        return "grey";
                    }
                })
                .style('stroke', 'white')
                .style('opacity', 0.9)
                .style('stroke-width', 0.3)
                .on('mouseover', tool_tip.show)
                .on('mouseout', tool_tip.hide)
                .on('click', function (d) {
                    
                    fipsUpdate(d.id, "unemployment_rate", '#unemploymentDelta', 'unemply-chart', 'Unemployment', "Percentage");
                    fipsUpdate(d.id, "DEATHS_CENSUS", '#ttldeaths', 'ttldeathschart', 'Total Deaths');
                    fipsUpdate(d.id, "All_Overdose_deaths", '#ttloddeaths', 'ttloddeathschart', 'Overdose Deaths');
                    addCorrelationCharts(d.id, coeff2, drugs); addCorrelationChartsPart2("10001", coeff2, drugs);
                    addCorrelationChartsPart2(d.id, coeff2, drugs);
                    addCorrelationChartsPart3(d.id, coeff2, drugs);
                    add_predict(d.id, predictions, drugs);
                    add_predict2(d.id, predictions, drugs);
                    state = states[d.id.substr(0, 2)]['State'];
                    cnty = d.properties.name;
                    $("#StateName").html("State: "+state);
                    $("#CountyName").html("County: " + cnty);
                    if (property2 == "All") { pop = drugTotalsFIPS[d.id]["POPESTIMATE"]; }
                    else { pop = drugs[d.id]["POPESTIMATE"][property2];}
                    $("#PopulationValue").html("Population: " + formatThousandsNoRounding(pop,0));
                    console.log(d.id);
                });

            svg.selectAll("path")
                .data(topojson.feature(counties, counties.objects.states).features)
                .enter()
                .append("path")
                .attr("d", geopath)
                .style('stroke', 'blue')
                .style('opacity', 1)
                .style('stroke-width', 1);

            svg.append("g")
                .attr("class", "legendQuant")
                .attr("transform", "translate(+970," + x + ")");
            property1s = property1.replace(/_/g, " ");
            property1s = property1s.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));;
            var legend = d3.legendColor()
                .labelFormat(d3.format(".2f"))
                .useClass(false)
                .title(property1s)
                .titleWidth(100)
                .scale(colorScale);

            svg.select(".legendQuant")
                .call(legend);
}

function addCorrelationChartsPart2(fips, allCountiesDataDict, historicalDrugsData) {

    //alert("I'm getting fired");
    //cleanCanvas();

    top3Contributers = getTop3Contributers(allCountiesDataDict[fips]);

    firstContributerData = historicalDrugsData[fips][top3Contributers[0]];
    secondContributerData = historicalDrugsData[fips][top3Contributers[1]];
    thirdContributerData = historicalDrugsData[fips][top3Contributers[2]];

    canvasID = "correlated21"
    chartType = "line"
    chartTitle = "Top correlated factor: " + top3Contributers[0];
    chartLabel = "Data for:"
    listOfLabels1 = [];
    listOfValues1 = [];
    for (var key in firstContributerData) {
        listOfLabels1.push(key);
        listOfValues1.push(parseFloat(firstContributerData[key]));


    }




    canvasID2 = "correlated22"
    chartType2 = "line"
    chartTitle2 = "Second correlated factor: " + top3Contributers[1];
    chartLabel2 = "Data for:"
    listOfLabels2 = [];
    listOfValues2 = [];
    for (var key in firstContributerData) {
        listOfLabels2.push(key);
        listOfValues2.push(secondContributerData[key]);
    }





    canvasID3 = "correlated23"
    chartType3 = "line"
    chartTitle3 = "Second correlated factor: " + top3Contributers[2];
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
        listOfOxyValues.push(Math.round(parseFloat(opioidsOxy[key]), 2));
    }


    for (var key in opioidsHydro) {
        listOfHydroLabels.push(key);
        listOfHydroValues.push(Math.round(parseFloat(opioidsHydro[key]), 2));
    }

    //, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues
    addChart(canvasID, "line", chartTitle, "Data per year", listOfLabels1, listOfValues1, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
    addChart(canvasID2, "line", chartTitle2, "Data per year", listOfLabels2, listOfValues2, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
    addChart(canvasID3, "line", chartTitle3, "Data per year", listOfLabels3, listOfValues3, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);

    //document.getElementById("correlated1").width += 0;
    //document.getElementById("correlated2").width += 0;
    //document.getElementById("correlated3").width += 0;
}


    function addCorrelationChartsPart3(fips, allCountiesDataDict, historicalDrugsData) {

        //alert("I'm getting fired");
        //cleanCanvas();

        top3Contributers = getTop3Contributers(allCountiesDataDict[fips]);

        firstContributerData = historicalDrugsData[fips][top3Contributers[0]];
        secondContributerData = historicalDrugsData[fips][top3Contributers[1]];
        thirdContributerData = historicalDrugsData[fips][top3Contributers[2]];

        canvasID = "correlated31"
        chartType = "line"
        chartTitle = "Top correlated factor: " + top3Contributers[0];
        chartLabel = "Data for:"
        listOfLabels1 = [];
        listOfValues1 = [];
        for (var key in firstContributerData) {
            listOfLabels1.push(key);
            listOfValues1.push(parseFloat(firstContributerData[key]));


        }




        canvasID2 = "correlated32"
        chartType2 = "line"
        chartTitle2 = "Second correlated factor: " + top3Contributers[1];
        chartLabel2 = "Data for:"
        listOfLabels2 = [];
        listOfValues2 = [];
        for (var key in firstContributerData) {
            listOfLabels2.push(key);
            listOfValues2.push(secondContributerData[key]);
        }





        canvasID3 = "correlated33"
        chartType3 = "line"
        chartTitle3 = "Second correlated factor: " + top3Contributers[2];
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
            listOfOxyValues.push(Math.round(parseFloat(opioidsOxy[key]), 2));
        }


        for (var key in opioidsHydro) {
            listOfHydroLabels.push(key);
            listOfHydroValues.push(Math.round(parseFloat(opioidsHydro[key]), 2));
        }

        //, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues
        addChart(canvasID, "line", chartTitle, "Data per year", listOfLabels1, listOfValues1, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
        addChart(canvasID2, "line", chartTitle2, "Data per year", listOfLabels2, listOfValues2, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);
        addChart(canvasID3, "line", chartTitle3, "Data per year", listOfLabels3, listOfValues3, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);

        //document.getElementById("correlated1").width += 0;
        //document.getElementById("correlated2").width += 0;
        //document.getElementById("correlated3").width += 0;

}

function add_predict(fips, predict, drughist) {
    canvasID = "projected21"
    chartType = "line"
    chartTitle = "Top correlated factor: " + top3Contributers[0];
    chartLabel = "Data for:"
    listOfLabels1 = [];
    listOfValues1 = [];
    for (var key in drughist[fips]['GRAMS_OXYCODONE']) {
        listOfLabels1.push(key);
        listOfValues1.push(Math.round(parseFloat(drughist[fips]['GRAMS_OXYCODONE'][key]),2));


    }

    listOfOxyLabels = []
    listOfOxyValues = []
    listOfHydroLabels = []
    listOfHydroValues = []

    for (var key in predict[fips]["oxy"]) {
        listOfOxyLabels.push(key);
        listOfOxyValues.push(Math.round(parseFloat(predict[fips]["oxy"][key]), 2));
    }


    for (var key in predict[fips]["hydro"]) {
        listOfHydroLabels.push(key);
        listOfHydroValues.push(Math.round(parseFloat(predict[fips]["hydro"][key]), 2));
    }
    addChart(canvasID, "line", chartTitle, "Data per year", listOfLabels1, listOfValues1, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);

}
function add_predict2(fips, predict, drughist) {
    canvasID = "projected22"
    chartType = "line"
    chartTitle = "Top correlated factor: " + top3Contributers[0];
    chartLabel = "Data for:"
    listOfLabels1 = [];
    listOfValues1 = [];
    for (var key in drughist[fips]['GRAMS_OXYCODONE']) {
        listOfLabels1.push(key);
        listOfValues1.push(Math.round(parseFloat(drughist[fips]['GRAMS_OXYCODONE'][key]), 2));


    }

    listOfOxyLabels = []
    listOfOxyValues = []
    listOfHydroLabels = []
    listOfHydroValues = []

    for (var key in predict[fips]["oxy"]) {
        listOfOxyLabels.push(key);
        listOfOxyValues.push(Math.round(parseFloat(predict[fips]["oxy"][key]), 2));
    }


    for (var key in predict[fips]["hydro"]) {
        listOfHydroLabels.push(key);
        listOfHydroValues.push(Math.round(parseFloat(predict[fips]["hydro"][key]), 2));
    }
    addChart(canvasID, "line", chartTitle, "Data per year", listOfLabels1, listOfValues1, listOfOxyLabels, listOfOxyValues, listOfHydroLabels, listOfHydroValues);

}


            








