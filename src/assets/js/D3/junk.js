// JavaScript source code
//https://bl.ocks.org/dnprock/b48388ee8bc5582947b6 <-- I used this as my template so some code is directly cloned/modified from this example
// enter code to define margin and dimensions for svg
var width = 1400;
var height = 700;
var svg = d3.select("div#choropleth").append("svg").attr("preserveAspectRatio", "xMinYMin meet").style("background-color", "#c9e8fd")
	.attr("viewBox", "0 0 " + width + " " + height)
	.classed("svg-content", true);

var projection = d3.geoNaturalEarth().translate([width / 2, height / 2]).scale(280).center([10, 10]);
var geopath = d3.geoPath().projection(projection);
// enter code to create svg

// enter code to create color scale

// enter code to define tooltip

// enter code to define projection and path required for Choropleth

// define any other global variables
// load data



	// draw map
function SetupMap() {
	const color = d3.scaleThreshold()
	selectors = { 'All': "All", "2006": 2006, "2007": 2007, "2008": 2008, "2009": 2009, "2010": 2010, "2011": 2011, "2012": 2012 };
	var fields = Object.keys(selectors);
	var option_select = d3.select('#selectors').append("select")
		.attr("class", "option-select");
	for (var i = 0; i < fields.length; i++) {
		var opt = option_select.append("option")
			.attr("value", fields[i])
			.text(fields[i]);

		if (fields[i] === config.defaultValue) {
			opt.attr("selected", "true");
		}
	}
	option_select.on("change", function (d) {
		console.log(this.value);
		//drawMap(this.value);
	});
}
	//createMapAndLegend(values[0], gameSales, gameRatings, config.defaultValue);
	//map = values[0];



// enter code to call ready() with required arguments


//     .attr("data-legend",function(d) { return d.name})
//     legend = svg.append("g")
// .attr("class","legend")
// .attr("transform","translate(50,30)")
// .style("font-size","12px")
// .call(d3.legend);
// this function should be called once the data from files have been read
// world: topojson from world_countries.json
// gameData: data from ratings-by-country.csv

function ready(error, world, gameData) {
	// enter code to extract all unique games from gameData
	// enter code to append the game options to the dropdown
	// event listener for the dropdown. Update choropleth and legend when selection changes. Call createMapAndLegend() with required arguments.
	// create Choropleth with default option. Call createMapAndLegend() with required arguments.
}

//function drawMap(selectedGame) {
//	createMapAndLegend(map, gameSales, gameRatings, selectedGame);
//}

// this function should create a Choropleth and legend using the world and gameData arguments for a selectedGame
// also use this function to update Choropleth and legend when a different game is selected from the dropdown
function createMapAndLegend() {
	//gameName = selectedGame;
	var colorScale = d3.scaleQuantile()
		.domain(gameRatings[selectedGame])
		.range(["#edf8e9", "#bae4b3", "#74c476", "#238b45"]);
	svg.selectAll("path").remove();
	var tool_tip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-8, 0])
		.html(function (d) {
			if (d.properties.name in gameSales[gameName]) {
				var xy = gameSales[gameName][d.properties.name];
				return "<ul><li>Country: " + xy.Country + "</li><li>Game: " + xy.Game + "</li><li>Avg Rating:  " + xy["Average Rating"] + "</li><li>Number of Users: " + xy["Number of Users"] + "</li></ul>";
			}
			return "<ul><li>Country: " + d.properties.name + "</li></ul>";
		});
	svg.call(tool_tip);
	var x = height - 140;
	svg.selectAll("path")
		.data(worldmap.features)
		.enter()
		.append("path")
		.attr("class", "continent")
		.attr("d", geopath)
		.attr('fill', function (d) {
			if (d.properties.name in gameSales[selectedGame]) {
				//console.log(d.properties.name, gameSales[selectedGame][d.properties.name]["Average Rating"]);
				return colorScale(gameSales[selectedGame][d.properties.name]["Average Rating"]);
			}
			else {
				return "grey";
			}
		})
		.style('stroke', 'white')
		.style('opacity', 0.8)
		.style('stroke-width', 0.3)
		.on('mouseover', tool_tip.show)
		.on('mouseout', tool_tip.hide);
	svg.append("g")
		.attr("class", "legendQuant")
		.attr("transform", "translate(20," + x + ")");

	var legend = d3.legendColor()
		.labelFormat(d3.format(".2f"))
		.useClass(false)
		.title("User Rating")
		.titleWidth(100)
		.scale(colorScale);

	svg.select(".legendQuant")
		.call(legend);

}



			//option_select.on("change", function () {
			//	drawMap($("#selectors").find(".option-select").val());
			//});