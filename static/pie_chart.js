/*
    author: Clarissa
*/

{
const piePath= "static/data/country-data.json";


const w_pie = 200,
h_pie = 200,
m_pie = 10;

// The radius of the pieplot is half of height and width
const radius = Math.min(w_pie, h_pie) / 2 - m_pie;

const keys= ["0", "1", "2"]
const lables= ["Others", "Vegetarian", "Vegan"]

const color = d3.scaleOrdinal()
    .domain(keys)
    .range([ "#20a486", "#5ec962", "#c8e020"]);




//function for getting only selected data
function selectedData_pie(dataset){

//hard code world data
const worlddata =[
        {main_tag : "world"},
        {percentage_non_type: "75.69"},
        {percentage_veggi_n_recipes: "15.75"},
        {percentage_vegan_n_recipes: "8.53"}  
     ]; 

    selected_country= getvalue_pie()
   // console.log("Got new value")
   
     if( selected_country== "world"){
        var data_filter= worlddata
        //console.log(data_filter)
        return data_filter
     }
     else{
        var data_filter = dataset.filter( element => element.main_tag ==selected_country)
        //console.log(data_filter)
        return data_filter 
    } 
}
const div = d3.select("#myPieChart")


const svg_pie = d3.select("#myPieChart")
    .append("svg")
    .attr("width", w_pie+200)
    .attr("height", h_pie)
    .append("g")
    .attr("transform", `translate(${w_pie/2}, ${h_pie/2})`)

// add a Tooltip
let pietooltip = div
    .append("div")
    .attr("id", "pieTooltip")
    .style("background-color", "rgba(255,255,255, 0.7)")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("visibility", "hidden");       

//function on mouse over
function mouseover_pie(event, d) {
    pietooltip
        .style("visibility", "visible")
        .style("left", (event.clientX+5) + "px")
        .style("top", (event.clientY+5) + "px")
        .html(extractText_pie(d));
}
//function on mouse move
function mousemove_pie(event) {
    var tooltipHeight = document.getElementById('pieTooltip').clientHeight;    
    //console.log(event)
    pietooltip
        .style("left", (event.pageX+15) + "px")
        .style("top", (event.pageY+15) + "px")
}
//function on mouse out
function mouseout_pie() {
    pietooltip.style("visibility", "hidden");
}

// function extracts text into data
function extractText_pie(d) {
    text = d.value +"%";
    return text;
}
//add color legend
svg_pie.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
            .attr("cx", 150)
            .attr("cy", function(d,i){ return -80 + i*20}) 
            .attr("r", 4)
            .style("fill", function(d){ return color(d)})
            .style("opacity", "1")

svg_pie.selectAll("mylabels")
        .data(lables)
        .enter()
        .append("text")
            .attr("x", 160)
            .attr("y", function(d,i){ return -80 + i*20}) 
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
          

//source    https://www.geeksforgeeks.org/d3-js-pie-function/
//          https://www.d3-graph-gallery.com/graph/pie_changeData.html

// A function that create / update the plot
function update() {

    d3.json(piePath).then(function(data){
        
        //call function get selected data
        data= selectedData_pie(data)
        //store data values
        const recipeTypeNone = data.map(({percentage_non_type:nontype}) =>nontype );
        const recipeTypeVeggi= data.map(({percentage_veggi_n_recipes:veggi, }) =>veggi );
        const recipeTypeVegan= data.map(({percentage_vegan_n_recipes:vegan}) =>vegan );

        var recipeTypeList= []
        //compute it to a list

        var value_selected= getvalue_pie()

        //seperate case for world data
        if( value_selected =="world"){
            var maxnon = d3.max(recipeTypeNone);
            var maxveggi= d3.max(recipeTypeVeggi);
            var maxvegan= d3.max(recipeTypeVegan);
            recipeTypeList= [maxnon,maxveggi,maxvegan]
        }

        else{
            recipeTypeList=[].concat(recipeTypeNone , recipeTypeVeggi, recipeTypeVegan);
        }
        //console.log(recipeTypeList)
  
        //Compute the position on the pie
        const pie = d3.pie().value(function(d) { return d[1];})
        const data_ready = pie(Object.entries(recipeTypeList))
          
        //creating paths 
        const u = svg_pie.selectAll("path")        
            .data(data_ready)

        u
            .join('path')
            .transition()
            .duration(1000)
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', function(d){ 
                return(color(d.data[0])) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")            
            .style("opacity", 1)
           
        // mouseover effects
            svg_pie.selectAll("path")
                .on("mouseover", function(event,d){ 
                    mouseover_pie(event,d); 
                    d3.select(this)
                        .style("opacity", "0.6")  } )
                .on("mousemove", function(event){ 
                    mousemove_pie(event); } )
                .on("mouseleave", function(d) {
                    mouseout_pie ()
                    d3.select(this)
                        .style("opacity", "1")
                })  
    })   
}
update()
}
