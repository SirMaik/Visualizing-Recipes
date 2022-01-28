{//console.log(jsonPath)
const top6Path= "static/data/top6_ingredients.json";

// set the dimensions and margins of the graph
const m = {top: 30, right: 30, bottom: 70, left: 60},
    w = 600 - m.left - m.right,
    h = 250 - m.top - m.bottom;

// append the svg object to the body of the page
const svg_top6 = d3.select("#top6")
  .append("svg")
    .attr("width", w + m.left + m.right+40)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", `translate(${m.left},${m.top})`);

// X axis with starting values
var x = d3.scaleBand()
    .range([ 0, w ])
    .domain(["1","2","3","4","5","6"])
   // .domain(data.map(d => d.ingredients))
    .padding(0.2);
    

var Xaxis= svg_top6.append("g")
    .attr("transform", `translate(0, ${h })`)
    .call(d3.axisBottom(x))
    
//titel x-Axis
 svg_top6.append("text")
            .attr("text-anchor", "end")
            .attr("x", 540)
            .attr("y", 170)
            .text("Ingredients");


 // Add Y axis with starting values
 var y = d3.scaleLinear()
    .range([ h , 0])
    .domain([ 0, 16000]);  
    
Yaxis= svg_top6.append("g")
    .call(d3.axisLeft(y)); 

// titel Y axis:
svg_top6.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -45)
            .attr("x", -20)
            .text("Number of counts")


function selectedData_bar(dataset){
    selected_country= getvalue_bar()
    var data_filter = dataset.filter( element => element.country ==selected_country)
    console.log(data_filter)

    return data_filter
}

function drawBar (){
    d3.json(top6Path).then(function(data){
        data= selectedData_bar(data)
        //console.log(data)

        var counts = data.map(d => d["ingredient_counts"])
        console.log(counts)

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
               
        //lable values for each bar      
        d3.selectAll("rect")
            
            .on("mouseover",function(d){
                data(data)
                d3.select(this)
                    .style("opacity", "0.6")
                    .append("title")
                        .text(d => ["Counts"+ d. ingredient_counts]
                        .join("\n")) ;

            })     
        
    })

}
drawBar();
}