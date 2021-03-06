{   /*
        author: Clarissa
    */
//store file path
const top6Path= "static/data/top6_ingredients.json";

// set the dimensions+ margin
const m = {top: 30, right: 30, bottom: 70, left: 60},
    w = 600 - m.left - m.right,
    h = 250 - m.top - m.bottom;

const div = d3.select("#top6")

// append the svg to div
const svg_top6 = d3.select("#top6")
  .append("svg")
    .attr("width", w + m.left + m.right+40)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", `translate(${m.left},${m.top})`);

// add a Tooltip
let pietooltip = div
    .append("div")
    .attr("id", "barTooltip")
    .style("background-color", "rgba(255,255,255, 0.7)")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("visibility", "hidden");       
//mouse over function
function mouseover_bar(event, d) {
    pietooltip
        .style("visibility", "visible")
        .style("left", (event.clientX+5) + "px")
        .style("top", (event.clientY+5) + "px")
        .html(extractText_bar(d));
}
//mouse move function
function mousemove_bar(event) {
    var tooltipHeight = document.getElementById('barTooltip').clientHeight;    
    //console.log(event)
    pietooltip
        .style("left", (event.pageX+15) + "px")
        .style("top", (event.pageY+15) + "px")
}
//mouse out function
function mouseout_bar() {
    pietooltip.style("visibility", "hidden");
}

// function extracts text into data
function extractText_bar(d) {
    text = d.ingredient_counts;
    return text;
}

// x-axis with starting values
var x = d3.scaleBand()
    .range([ 0, w ])
    .domain(["1","2","3","4","5","6"])
   // .domain(data.map(d => d.ingredients))
    .padding(0.2);
    
//append x-axis to svg
var Xaxis= svg_top6.append("g")
    .attr("transform", `translate(0, ${h })`)
    .call(d3.axisBottom(x))
    
//titel x-Axis
 svg_top6.append("text")
            .attr("text-anchor", "end")
            .attr("x", 540)
            .attr("y", 170)
            .text("Ingredients");


 // add y-axis with starting values
 var y = d3.scaleLinear()
    .range([ h , 0])
    .domain([ 0, 16000]);
    
//append y-axis 
Yaxis= svg_top6.append("g")
    .call(d3.axisLeft(y)); 

// titel y-axis:
svg_top6.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("x", -20)
        .text("Number of counts")

// function to filter dataset for selected option
function selectedData_bar(dataset){
    selected_country= getvalue_bar()
    var data_filter = dataset.filter( element => element.country ==selected_country)
    //console.log(data_filter)
    return data_filter
}

//function to update axis and draw bars 
function drawBar (){
    d3.json(top6Path).then(function(data){
        data= selectedData_bar(data)
        //console.log(data)

        var counts = data.map(d => d["ingredient_counts"])
        //console.log(counts)

        //store min and max value
        var minvalue = d3.min(counts);
        var maxvalue = d3.max(counts);

       // Source: https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html, https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html
       //update x-axis
        x
            .domain(data.map(d => d.ingredients))
      

        Xaxis
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end")
                .style("textsize","20px");
        
        //update y-axis
        y   
            .domain([0,maxvalue])
        Yaxis   
            .call(d3.axisLeft(y)); 
        
        // create Bars
        const u = svg_top6.selectAll("rect")
            .data(data)
        u   
            .enter()
            .append("rect")
            .merge(u)
            .transition()
            .duration(1000)
                .attr("x", d => x(d.ingredients))
                .attr("y", d => y(d.ingredient_counts))
                .attr("width", x.bandwidth())
                .attr("height", d => h  - y(d.ingredient_counts))
                .attr("fill", "#14c967")
                .attr("id","barchart")    
               
        //display values on hover      
        svg_top6.selectAll("rect")
            .on("mouseover", function(event,d){ 
                mouseover_bar(event,d); 
                d3.select(this)
                    .style("opacity", "0.6")  } )
            .on("mousemove", function(event){ 
                mousemove_bar(event); } )
            .on("mouseleave", function(d) {
                mouseout_bar ()
                d3.select(this)
                    .style("opacity", "1")
            })  
        
    })

}
drawBar();
}