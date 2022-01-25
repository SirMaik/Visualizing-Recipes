
//var defaultvalue=  document.getElementById('data').value
//console.log(defaultvalue)
//console.log(jsonPath)

function printData(dataset){
    if (country in dataset == getvalue()){
        for (country of dataset){
            console.log(dataset)
        }
    }
}

function getvalue() {
    var select = document.getElementById('data');
    
    var option = select.options[select.selectedIndex];
    console.log(option.value)
    
}

getvalue();

d3.json(top6Path).then(function(data){
    console.log(data)
})

/* set the dimensions and margins of the graph
const width = 450,
    height = 450,
    margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

// create 2 data_set
        
const data1 = {a: 37533.0, b: 5070.0, c:1530.0}
const data2 = {a: 6, b: 16, c:20,}

// set the color scale
const color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  const pie = d3.pie()
    .value(function(d) {return d[1]; })
    .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  const data_ready = pie(Object.entries(data))

  // map to data
  const u = svg.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .join('path')
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data[0])) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)


}

update(data1)*/
