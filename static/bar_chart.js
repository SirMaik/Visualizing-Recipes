//console.log(jsonPath)
const top6Path= "static/data/top6_ingredients.json";

// set the dimensions and margins of the graph
const m = {top: 30, right: 30, bottom: 70, left: 60},
    w = 600 - m.left - m.right,
    h = 250 - m.top - m.bottom;

// append the svg object to the body of the page
const svg_top6 = d3.select("#top6")
  .append("svg")
    .attr("width", w + m.left + m.right)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", `translate(${m.left},${m.top})`);

function selectedData_bar(dataset){
    selected_country= getvalue_bar()
    var data_filter = dataset.filter( element => element.country ==selected_country)
    console.log(data_filter)

    return data_filter
}

function drawBar (){
    d3.json(top6Path).then(function(data){
        data= selectedData_bar(data)

        //const minvalue = d3.min(map.values(), d => d["ingredient_counts"]);
       // const maxvalue = d3.max(map.values(), d => d["ingredient_counts"]);
       
        // X axis
        const x = d3.scaleBand()
            .range([ 0, w ])
            .domain(data.map(d => d.ingredients))
            .padding(0.2);
            

        svg_top6.append("g")
            .attr("transform", `translate(0, ${h })`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end")
                .style("textsize","20px");
                
        // Add Y axis
        const y = d3.scaleLinear()
            .domain([ 0, 16000]) //replace with min and max value 
            .range([ h , 0]);
        svg_top6.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg_top6.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                //.transition()
                //.duration(1000)
                .attr("x", d => x(d.ingredients))
                .attr("y", d => y(d.ingredient_counts))
                .attr("width", x.bandwidth())
                .attr("height", d => h  - y(d.ingredient_counts))
                .attr("fill", "#14c967")
               
                .on("mouseover",function(){d3.select(this)
                    .style("opacity", "0.6");
                    
                })
                .on("mouseout",function(){d3.select(this)
                    .style("opacity", "1");
                })

        //TO DO!!
        .call(rect => rect.append("title")
            .text(d => ["Counts"+ d.country ]
            .join("\n")));
        
    })

}
drawBar ();
