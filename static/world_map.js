/*
    @author Ordonez, Miguel
*/

// Zoom
const handleZoom = (e) => worldMap.attr('transform', e.transform);
const zoom = d3.zoom()
  .scaleExtent([1, 7])
  .on('zoom', handleZoom);

// The svg
const svg = d3.select("#worldMap")
  .call(zoom);

// Height and width
const width = svg.attr("width");
const height = svg.attr("height");

// Map and projection
let map = new Map()
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(80)
  .center([0,20])
  .translate([width / 2, height / 2 + 10]);

// World map svg areas
const worldMap = svg.append('g');
const legend = svg.append('g')
  .attr("class", "legend")
  .attr("transform", "translate(" + 100 + "," + 350 + ")");


// Tooltip
 let tooltip = d3.select("#worldBlock")
  .append("div")
  .attr("class", "tooltip")
  .style("background-color", "rgba(255,255,255, 0.7)")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("position", "absolute")
  .style("visibility", "hidden");

// Function that extracts text into data
function extractText(d) {
  text = "Country: " + d.properties.name + "<br>";
  text += "Code: " + d.id + "<br>";

  country = map.get(d.id);
  
  if (!!country) {
    text += "Tags with number of recipes:<br>";

    for (entry of country["tags_with_number_of_recipes"]) {
      text += "&nbsp&nbsp&nbsp&nbsp&#8226 " + entry["tag"] + ": " + entry["number_of_recipes"] + "<br>";
    }

    text += "Total number of recipes: " + country["total_number_of_recipes"];
  }
  else 
    text += "No further information available";

  return text;
}

function whileMouseOver(event, d) {
  tooltip
    .style("visibility", "visible")
    .style("left", (event.clientX+5) + "px")
    .style("top", (event.clientY+5) + "px")
    .html(extractText(d));
}

function whileMouseMove(event) {
  tooltip
    .style("left", (event.clientX+5) + "px")
    .style("top", (event.clientY+5) + "px")
}



// Load data to map
function loadData(jsonData) {
  for (country of jsonData) {
    var total_number_of_recipes = 0;
    for (entry of country["tags_with_number_of_recipes"]) {
      total_number_of_recipes += entry["number_of_recipes"];
    }

    country["total_number_of_recipes"] = total_number_of_recipes;

    map.set(country["code"], country);
  }
}

// Load external data and boot
Promise.all([d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.json("static/data/countries.json")
  ]).then(function(jsonData){
    let topo = jsonData[0];

    loadData(jsonData[1])

    // Min/Max
    const minNumberOfRecipes = d3.min(map.values(), d => d["total_number_of_recipes"]);
    const maxNumberOfRecipes = d3.max(map.values(), d => d["total_number_of_recipes"]);

    // Color scale
    //const interpolators = [d3.interpolateYlGnBu, d3.interpolateRdPu, d3.interpolateYlGn, d3.interpolateYlOrBr, d3.interpolateViridis];
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
        country = map.get(d.id);

        if (!!country)
          d.total = country["total_number_of_recipes"];
        else
          d.total = 0;

          return getColor(d.total); 
      })
      .on("mouseover", function(event, d){ whileMouseOver(event, d); } )
      .on("mousemove", function(event){ whileMouseMove(event); } )
      .on("mouseleave", function () {tooltip.style("visibility", "hidden");})


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
    values = [5, 25, 75, 225, 650, 2000, 5500, 16500]
    
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