/*
    @author Ordonez, Miguel
*/

// Zoom
const handleZoom = (e) => worldMap.attr('transform', e.transform);
const zoom = d3.zoom()
  .scaleExtent([1, 7])
  .on('zoom', handleZoom);

// The svg
const svg = d3.select("svg#worldMap")
  .call(zoom);

// Height and width
const width = svg.attr("width");
const height = svg.attr("height");

// World map svg areas
const worldMap = svg.append('g');
const legend = svg.append('g')
  .attr("class", "legend")
  .attr("transform", "translate(" + 100 + "," + 350 + ")");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(80)
  .center([0,20])
  .translate([width / 2, height / 2 + 10]);

// Tooltip
const tooltip = d3.select("#tooltip")

function extractText(d) {
  dict = data.get(d.id);
  
  if (!!dict) 
    values = [dict["country"], dict["tag"], dict["number_of_recipes"]]
  else
    values = [d.properties.name, "Unavailable", "Unavailable"]

  text = "Country: " + values[0] + "<br>";
  text += "Tag: " + values[1] + "<br>";
  text += "Number of recipes: " + values[2];

  return text;
}

function whenClick(event, d) {
  tooltip.html(extractText(d))
}

// Data 
let data = new Map()

// Load external data and boot
Promise.all([d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.csv("https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/world_map/data/countries.csv", 
    function(d) {
      d["number_of_recipes"] = parseInt(d["number_of_recipes"]);
      data.set(d.code, d);

      return d;
    })
  ]).then(function(loadData){
    let topo = loadData[0];

    // Min/Max
    const minNumberOfRecipes = d3.min(data.values(), d => d["number_of_recipes"]);
    const maxNumberOfRecipes = d3.max(data.values(), d => d["number_of_recipes"]);

    // Color scale
    const interpolators = [d3.interpolateYlGnBu, d3.interpolateRdPu, d3.interpolateYlGn, d3.interpolateYlOrBr, d3.interpolateViridis];
    const colorScale = d3.scaleSequentialLog(d3.interpolateViridis)
      .domain([minNumberOfRecipes, maxNumberOfRecipes]);

    // Coloring function
    const zeroColor = d3.rgb(192,192,192)//d3.rgb(205,92,92);

    function getColor(x) {
      if (x == 0)
        return zeroColor;

      return colorScale(x);
    }


    // Draw the map
    countries = worldMap.selectAll("countries")
      .data(topo.features)
      .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        dict = data.get(d.id);

        if (!!dict)
          d.total = dict["number_of_recipes"];
        else
          d.total = 0;

        return getColor(d.total);
      })
      .on("click", whenClick)

    // Legend

    // Background
    legend.append("rect")
      .attr("x", 0)
      .attr("y", -17)
      .attr('width', 400)
      .attr('height', 60)
      .style("fill", "white")
      .style("opacity", "0.5");
    
    // Title
    legend.append("text")
      .text("Number of recipes:")
      .attr("x", 10);

    // First rectangle
    legend.append("rect")
      .attr("x", 20)
      .attr("y", 10)
      .attr('width', 35)
      .attr('height', 15)
      .style("fill", getColor(0))
      .style("stroke", "black");

    legend.append("text")
      .attr("x", 37)
      .attr("y", 38)
      .text("Unavailable")
      .style("font-size", "10px")
      .style("text-anchor", "middle")
    
    // Rest of the rectangles
    values = [5, 25, 100, 500, 1000, 2500, 5000, 7500]
    
    rectangles = legend.selectAll("legend.rectangles")
      .data(values)
      .enter()
      .append("rect")
        .attr("x", d => 100 + values.indexOf(d)*35)
        .attr("y", 10)
        .attr('width', 35)
        .attr('height', 15)
        .style("fill", d => getColor(d))
        .style("stroke", "black");
      
    labels = legend.selectAll("legend.labels")
      .data(values)
      .enter()
      .append("text")
        .attr("x", d => 117 + values.indexOf(d)*35)
        .attr("y", 38)
        .text(d => d)
        .style("font-size", "10px")
        .style("text-anchor", "middle")
;
  })