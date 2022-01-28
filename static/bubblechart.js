{
// set the size and margins of the graph
const margin = {top: 100, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 670 - margin.top - margin.bottom;

// add svg to the body of the page
const shiftx = 40

const svg = d3.select("svg")
  .append("svg")
    .attr("width", width+ margin.left + margin.right + shiftx)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add x-axis
const x = d3.scaleLinear()
      .domain([1, 360])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(${shiftx}, ${height - 20})`)
      .style("font-size", 18)
      .call(d3.axisBottom(x).ticks(10));

// Add Y axis
const y = d3.scaleLinear()
    .domain([0, 16])
    .range([height, 0]);
 svg.append("g")
    .attr("transform", `translate(${shiftx}, -20)`)
    .style("font-size", 18)
    .call(d3.axisLeft(y));
 
 

// Add color scale for rating
// const c = d3.scaleSequential()
//   .domain([0 , 6])
//   .interpolator(d3.interpolateViridis);

regions = ['asian', 'north-american', 'south-american', 'european', 'african', 'central-american', 'indian-subcontinent', 'oceania', 'middle-eastern'];
// color scale for regions
const c = d3.scaleOrdinal()
  .domain(regions)
  .range(d3.schemeSet3);

// Label X-Axis
svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width - 210)
  .attr("y", height + 30 )
  .style("font-size", 22)
  .text("Time to cook (minutes)");

// Label Y-Axis
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -height/4)
    .attr("y", -20)
    .style("font-size", 22)
    .attr("transform", "rotate(-90)")
    .text("Number of ingredients");
    
// Add title
svg.append("text")
  .attr("class", "title")
  .attr("x", 0)
  .attr("y", -50)
  .text("Average Recipe by Region: Time to cook vs. Number of ingredients")


const xValCircle = width - 130 
const xValLabel = width 
const yValCircle = 150
const legendYShift = 120

ellipse_eu = svg.append("ellipse")
  .attr("rx", 80)  
  .attr("ry", 50)
  .attr("cx", xValCircle + 50)
  .attr("cy", yValCircle - legendYShift + 200)
  .attr("stroke", "red")
  .attr("fill", "transparent")
  .attr("stroke-width", 3)
  .style("opacity", 0)

ellipse_kor = svg.append("ellipse")
  .attr("rx", 20)  
  .attr("ry", 20)
  .attr("cx", xValCircle + 102)
  .attr("cy", yValCircle - legendYShift + 157)
  .attr("stroke", "red")
  .attr("fill", "transparent")
  .attr("stroke-width", 3)
  .style("opacity", 0)

ellipse_ind = svg.append("ellipse")
  .attr("rx", 75)  
  .attr("ry", 25)
  .attr("cx", xValCircle - 385)
  .attr("cy", yValCircle - legendYShift - 30)
  .attr("stroke", "red")
  .attr("fill", "transparent")
  .attr("stroke-width", 3)
  .style("opacity", 0)
  .attr("transform", "rotate(30)")

ellipse_afr = svg.append("ellipse")
  .attr("rx", 50)  
  .attr("ry", 25)
  .attr("cx", xValCircle - 370)
  .attr("cy", yValCircle - legendYShift + 160)
  .attr("stroke", "red")
  .attr("fill", "transparent")
  .attr("stroke-width", 3)
  .style("opacity", 0)
  .attr("transform", "rotate(30)")

infotext_eu = svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", xValCircle + 190)
  .attr("y", yValCircle - legendYShift + 100)
  .attr("dy", "1em")
  .style("font-size", 14)
  .style("fill", "transparent")
  .text("Many european recipes involve fermentation or brining")

infotext_kor = svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", xValCircle + 180)
  .attr("y", yValCircle - legendYShift +  100)
  .attr("dy", "1em")
  .style("font-size", 14)
  .style("fill", "transparent")
  .text("Kimchi, a typical Korean dish, takes a lot of time to ferment")


infotext_ind = svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", xValCircle - 20)
  .attr("y", yValCircle - legendYShift + 60)
  .style("font-size", 16)
  .style("fill", "transparent")
  .text("On average, indian dishes require more ingredients.")

infotext_afr = svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", xValCircle - 0)
  .attr("y", yValCircle - legendYShift + 250)
  .style("font-size", 16)
  .style("fill", "transparent")
  .text("The three cuisines with the shortest average recipes are African")

  

// add legend for bubble sizes
// Source: https://www.d3-graph-gallery.com/graph/bubble_legend.html




// add a line with instruction
svg.append("text")
  .attr("class", "legendTitle")
  .attr("text-anchor", "middle")
  .attr("x", xValCircle - 20)
  .attr("y", yValCircle - legendYShift)
  .style("font-size", 14)
  .text("Hover over each bubble to see the cuisine.")


svg.append("text")
  .attr("class", "legendTitle")
  .attr("text-anchor", "middle")
  .attr("x", xValCircle - 20)
  .attr("y", yValCircle - legendYShift)
  .attr("dy", "1em")
  .style("font-size", 14)
  .text("Click on a regional bubble to expand into smaller bubbles.")

svg.append("text")
  .attr("class", "legendTitle")
  .attr("text-anchor", "middle")
  .attr("x", xValCircle - 20 )
  .attr("y", yValCircle - legendYShift)
  .attr("dy", "2em")
  .style("font-size", 14)
  .text("The number of countries per regional bubble is encoded in its size.")

// y-Offset scale for regions
var ylegend = d3.scaleOrdinal()
  .domain(regions)  
  .range([0, 20,40,60,80,100,120,140, 160]) 



xCircle = 100
xLabel = xCircle + 30

// legend circles regions
svg
  .selectAll("legend")
  .data(regions)
  .enter()
  .append("circle")
    .attr("cx", xCircle + 400)
    .attr("cy", d => ylegend(d) + 300)
    .attr("r", 7)
    .style("fill", d => c(d))
    .attr("stroke", "black")


// legend circle labels
svg
  .selectAll("legend")
  .data(regions)
  .enter()
  .append("text")
    .attr('x', xLabel + 400)
    .attr('y', d => ylegend(d) + 300 )
    .text(d => d)
    .style("font-size", 14)
    .attr('alignment-baseline', 'middle')

// mouseover tooltip
function onMouseOver(d){
  // update tooltip position and value
  d3.select('#tooltip')
      .append("div")
      // initial opacity is 0
      .style("opacity", 0)
      .attr("data-html", "true")
      .style('left', x(d.minutes) + shiftx + 70 +  'px')
      // ensure that no bubble has a another tooltip overlapping with it
      // tooltips were overlapping with bubbles before, which prevented the hover-effect for other bubbles
      .style('top', d.n_ingredients < 10 ?  (margin.top + y(d.n_ingredients) + 240 + 'px') : (margin.top + y(d.n_ingredients) + 20 + 'px') )
      // here, the normalized value is printed
      .html(d.continent == "false" ? d.country : d.country  + " <br> number of cuisines: " + d.continent)
      .style("position", "absolute")   
      .style("visibility", "visible")
      .style("background-color", "aquamarine")
      // transition to visible
      .transition()
        .delay(100)
        .duration(200)
        .style("opacity", 1);    
   }


// mouseout tooltip
function onMouseOut(d){
  d3.selectAll('#tooltip')
    .selectAll("div")
    //transition to opacity of 0
    .transition()
      .delay(100)
      .duration(600)
      .style("opacity",0);
}

    
// add text depending on selection
function addText(d, active){
  
  if (d.region == "european" && d3.select("#icelandic").style("opacity") == hidden && active) {
    eu_opacity = 1
    eu_color = "black"
    kor_opacity = 0
    kor_color = "transparent"
    ind_opacity = 0
    ind_color = "transparent"
    afr_opacity = 0
    afr_color = "transparent"
  } 
  else if (d.region == "asian" && d3.select("#korean").style("opacity") == hidden && active) {
    kor_opacity = 1
    kor_color = "black"
    eu_opacity = 0
    eu_color =  "transparent"
    ind_opacity = 0
    ind_color = "transparent"
    afr_opacity = 0
    afr_color = "transparent"}
  else if (d.region == "indian-subcontinent" && d3.select("#indian").style("opacity") == hidden && active) {
    ind_opacity = 1
    ind_color = "black"
    kor_opacity = 0
    kor_color = "transparent"
    eu_opacity = 0
    eu_color =  "transparent"
    afr_opacity = 0
    afr_color = "transparent"
  }
  else if (d.region == "african" && d3.select("#sudanese").style("opacity") == hidden && active) {
    ind_opacity = 0
    ind_color = "transparent"
    kor_opacity = 0
    kor_color = "transparent"
    eu_opacity = 0
    eu_color =  "transparent"
    afr_opacity = 1
    afr_color = "black"
  }else{
    eu_opacity = 0
    eu_color = "transparent"
    kor_opacity = 0
    kor_color = "transparent"
    ind_opacity = 0
    ind_color = "transparent"
    afr_opacity = 0
    afr_color = "transparent"}
  
  infotext_eu.transition().delay(200).duration(600).style("fill", eu_color)
  ellipse_eu.transition().delay(200).duration(600).style("opacity", eu_opacity)
  infotext_kor.transition().delay(200).duration(600).style("fill", kor_color)
  ellipse_kor.transition().delay(200).duration(600).style("opacity", kor_opacity)
  infotext_ind.transition().delay(200).duration(600).style("fill", ind_color)
  ellipse_ind.transition().delay(200).duration(600).style("opacity", ind_opacity)
  infotext_afr.transition().delay(200).duration(600).style("fill", afr_color)
  ellipse_afr.transition().delay(200).duration(600).style("opacity", afr_opacity)

}
  
//Read the data
// Source: https://www.d3-graph-gallery.com/graph/bubble_basic.html
d3.csv(dataset).then(function(data) {
  hidden = 0.1
  visible = 1
  
  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    // .filter(function(d){ if (d.country == "italian") return d})
    .enter().append("circle")
      .attr("cx", d => (x(d.minutes) + shiftx))
      .attr("cy", d => (y(d.n_ingredients) - 17))
      .attr("r", d => d.continent != "false"? Math.sqrt(d.continent)*7: 7)
      .style("fill", d => c(d.region))
      // reduce opacity so bubbles are visible underneath each over
      .style("opacity", d => d.continent != "false"? visible: hidden)
      .attr("stroke", "black")
      .attr("class", d => d.region) 
      .attr("id", d => d.country)     
      // add mouse hovering actions
      .on("mouseover",(event, d) => onMouseOver(d))
      .on("mouseout", (event, d) => onMouseOut(d))
      .on("click", function(event){
        
        opacity = d => (event.srcElement.__data__.region == d.region && active) ? 
        (d.continent == "false" ? visible : hidden):(d.continent == "false" ? hidden : visible);
        const active   = event.srcElement.active ? false : true;
        d3.selectAll("." + event.srcElement.__data__.region)
        .transition()
        .delay(100)
        .duration(200).style("opacity", opacity);
        addText(event.srcElement.__data__, active)
        event.srcElement.active = active;
      });   


})}