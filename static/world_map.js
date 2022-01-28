// Choropleth map
// https://www.d3-graph-gallery.com/graph/choropleth_basic.html

{
  const jsonPath= "static/data/country-data.json";
  const geoURL  = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

   // Height and width
   const width = 750;
   const height = 500;
 

  // Zoom
  const handleZoom = (e) => worldMap.attr('transform', e.transform);
  const zoom = d3.zoom()
    .scaleExtent([1, 7])
    .on('zoom', handleZoom);

  const div = d3.select("#worldMap")

  // The svg
  const svg = div
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

 
  // Map and projection
  let map = new Map();
  const path = d3.geoPath();
  const projection = d3.geoMercator()
    .scale(115)
    .center([0,30])
    .translate([width / 2, height / 2 + 30]);

  // World map svg areas
  const worldMap = svg.append('g');

  // Tooltip
  let tooltip = div
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "worldTooltip")
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
      text += "Number of recipes: " + country["n_recipes"] + "<br>";
      text += "Cuisines:";

      for (entry of country["tags"]) {
        text += "<br>" + "&nbsp&nbsp&nbsp&nbsp&#8226 " + entry ;
      }

    }
    else 
      text += "No further information available";

    return text;
  }

  function whileMouseOver(event, d, country) {
    tooltip
      .style("visibility", "visible")
      .style("left", (event.clientX+5) + "px")
      .style("top", (event.clientY+5) + "px")
      .html(extractText(d));


    d3.selectAll(".country")
      .transition()
      .duration(200)
      .style("opacity", .7)
      .style("stroke", "none");

    country.transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black");
  }

  function whileMouseMove(event) {
    var tooltipHeight = document.getElementById('worldTooltip').clientHeight;

    tooltip
      .style("left", (event.clientX+5) + "px")
      .style("top", (event.clientY+5) + "px")
  }

  function whileMouseOut() {
    tooltip.style("visibility", "hidden");

    d3.selectAll(".country")
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "none");
  }


  // Load data to map
  function loadData(jsonData) {
    for (country of jsonData) {
      map.set(country["code"], country);
    }
  }

  // Load external data and boot
  Promise.all([d3.json(geoURL),
    d3.json(jsonPath)
    ]).then(function(jsonData){
      let topo = jsonData[0];
      
      loadData(jsonData[1])
      // Min/Max
      const minNumberOfRecipes = d3.min(map.values(), d => d["n_recipes"]);
      const maxNumberOfRecipes = d3.max(map.values(), d => d["n_recipes"]);

      // Color scale
      //const interpolators = [d3.interpolateYlGnBu, d3.interpolateRdPu, d3.interpolateYlGn, d3.interpolateYlOrBr, d3.interpolateViridis];
      const colorScale = d3.scaleSequentialLog(d3.interpolateViridis)
        .domain([minNumberOfRecipes, maxNumberOfRecipes]);

      // Coloring function
      const zeroColor = d3.rgb(192,192,192);

      function getColor(x) {
        if (x == 0)
          return zeroColor;

        return colorScale(x);
      }


      // Draw the map
      countries = worldMap.selectAll("countries")
        .data(topo.features)
        .join("path")
        .attr("class", "country")
        // draw each country
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
          country = map.get(d.id);

          if (!!country)
            d.total = country["n_recipes"];
          else
            d.total = 0;

            return getColor(d.total); 
        })
        .on("mouseover", function(event, d){ whileMouseOver(event, d, d3.select(this)); } )
        .on("mousemove", function(event){ whileMouseMove(event); } )
        .on("mouseleave", whileMouseOut )


      // Legend 
      
      const xRatio = width / 7
      const yRatio = height / 8

      const leftPadding =  xRatio
      const upperPadding = 6 *yRatio + 20

      const legend = svg.append('g')
        .attr("class", "legend")
        .attr("transform", "translate(" + leftPadding + "," + upperPadding + ")");

      const legendWidth = 5 * xRatio
      const legendHeight = 1.15 * yRatio

      // Background
      legend.append("rect")
        .attr("x", 0)
        .attr("y", -18)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style("fill", "white")
        .style("opacity", "0.5");
      
      // Title
      legend.append("text")
        .text("Number of recipes:")
        .attr("x", 15);
      
      const lRectWidth = legendWidth / 12
      const lRectHeight = legendHeight / 4.5

      // First rectangle
      legend.append("rect")
        .attr("x", lRectWidth/2)
        .attr("y", 0.8 * lRectHeight)
        .attr('width', lRectWidth)
        .attr('height', lRectHeight)
        .style("fill", getColor(0))
        .style("stroke", "black");

      legend.append("text")
        .attr("x", lRectWidth)
        .attr("y", 2.7 * lRectHeight)
        .text("Unavailable")
        .style("font-size", "11px")
        .style("text-anchor", "middle")
      
      // Rest of the rectangles
      values = [5, 15, 50, 200, 750, 3000, 10000, 40000]
      
      rectangles = legend.selectAll("legend.rectangles")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", d => 3 * lRectWidth + values.indexOf(d)*lRectWidth)
        .attr("y", 0.8 * lRectHeight)
        .attr('width', lRectWidth)
        .attr('height', lRectHeight)
        .style("fill", d => getColor(d))
        .style("stroke", "black");
        
      labels = legend.selectAll("legend.labels")
        .data(values)
        .enter()
        .append("text")
          .attr("x", d => 3 * lRectWidth + lRectWidth / 2 + values.indexOf(d)*lRectWidth)
          .attr("y", 2.7 * lRectHeight)
          .text(d => d)
          .style("font-size", "11px")
          .style("text-anchor", "middle")
  ;
    })
}