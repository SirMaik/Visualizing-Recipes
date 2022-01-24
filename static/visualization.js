
// set the size and margins of the graph
const margin = {top: 100, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
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
      .domain([1, 100])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(${shiftx}, ${height - 20})`)
      .call(d3.axisBottom(x).ticks(15));

// Add Y axis
const y = d3.scaleLinear()
    .domain([0, 20])
    .range([height, 0]);
 svg.append("g")
    .attr("transform", `translate(${shiftx}, -20)`)
    .call(d3.axisLeft(y));
 
 

// Add color scale for rating
// const c = d3.scaleSequential()
//   .domain([0 , 6])
//   .interpolator(d3.interpolateViridis);

regions = ['asian', 'north-american', 'south-american', 'european', 'african', 'central-american', 'indian-subcontinent', 'oceania' ];
// color scale for regions
const c = d3.scaleOrdinal()
  .domain(regions)
  .range(d3.schemeSet3);

// Label X-Axis
svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width - 200)
  .attr("y", height + 20 )
  .text("Time to cook");

// Label Y-Axis
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -height/3)
    .attr("y", -20)
    .attr("transform", "rotate(-90)")
    .text("No. of ingredients");
    
// Add title
svg.append("text")
  .attr("class", "title")
  .attr("x", 30)
  .attr("y", -50)
  .text("Average Recipe by Country - Time to cook vs. No. of ingredients vs. rating")


// add legend for bubble sizes
// Source: https://www.d3-graph-gallery.com/graph/bubble_legend.html



const xValCircle = width - 130 
const xValLabel = width 
const yValCircle = 150
const legendYShift = 120

// add a line with instruction
svg.append("text")
  .attr("class", "legendTitle")
  .attr("text-anchor", "end")
  .attr("x", xValCircle + 160)
  .attr("y", yValCircle - legendYShift)
  .attr("dy", "1em")
  .text("Hover over each bubble to see the cuisine")



// y-Offset scale for regions
var ylegend = d3.scaleOrdinal()
  .domain(regions)  
  .range([0, 20,40,60,80,100,120,140]) 



xCircle = 100
xLabel = xCircle + 30

// legend circles regions
svg
  .selectAll("legend")
  .data(regions)
  .enter()
  .append("circle")
    .attr("cx", xCircle)
    .attr("cy", d => ylegend(d))
    .attr("r", 7)
    .style("fill", d => c(d))
    .attr("stroke", "black")


// legend circle labels
svg
  .selectAll("legend")
  .data(regions)
  .enter()
  .append("text")
    .attr('x', xLabel)
    .attr('y', d => ylegend(d) )
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
      .style('left', x(d.minutes) + shiftx + 'px')
      .style('top', margin.top + y(d.n_ingredients) + 90 +  'px')
      // here, the normalized value is printed
      .text(d.country)
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

    
// 
  
//Read the data
// Source: https://www.d3-graph-gallery.com/graph/bubble_basic.html
d3.csv(dataset).then(function(data) {
  
  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    // .filter(function(d){ if (d.country == "italian") return d})
    .enter().append("circle")
      .attr("cx", d => (x(d.minutes) + shiftx))
      .attr("cy", d => (y(d.n_steps) - 17))
      .attr("r", d => 7)
      .style("fill", d => c(d.region))
      // reduce opacity so bubbles are visible underneath each over
      .style("opacity", "1")
      .attr("stroke", "black")
      .on("click", function(event){
        const active   = svg.active ? false : true,
        opacity = svg.active ? 0.5 : 1;
        d3.select(event.currentTarget).style("opacity", opacity);
        svg.active = active;
      })
      // add mouse hovering actions
      .on("mouseover",(event, d) => onMouseOver(d))
      .on("mouseout", (event, d) => onMouseOut(d));   


})