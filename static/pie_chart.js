const piePath= "static/data/country-data.json";

const w_pie = 200,
h_pie = 200,
m_pie = 10;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(w_pie, h_pie) / 2 - m_pie;

const color = d3.scaleOrdinal()
    .domain(["0", "1", "2"])
    .range([ "#20a486", "#5ec962", "#c8e020"]);


//function for getting only selected data
function selectedData_pie(dataset){

const worlddata =[
        {
            main_tag : "world"
        },
        {
            percentage_non_type: "75.69"
        },
        {
            percentage_veggi_n_recipes: "15.75"
        },
        {
            percentage_vegan_n_recipes: "8.53"
        }
        
     ]; 


    selected_country= getvalue_pie()
   // console.log("Got new value")
   
     if( selected_country== "world"){
        var data_filter= worlddata
        console.log(data_filter)
        return data_filter
     }
     else{
        var data_filter = dataset.filter( element => element.main_tag ==selected_country)
        console.log(data_filter)
        return data_filter 
    }
   
   

    
}

const svg_pie = d3.select("#myPieChart")
        .append("svg")
        .attr("width", w_pie)
        .attr("height", h_pie)
        .append("g")
        .attr("transform", `translate(${w_pie/2}, ${h_pie/2})`)
      
// A function that create / update the plot
function update() {
    d3.json(piePath).then(function(data){
        //console.log(data)
        //call function
        data= selectedData_pie(data)

        //get the data 
        const recipeTypeNone = data.map(({percentage_non_type:nontype}) =>nontype );
        const recipeTypeVeggi= data.map(({percentage_veggi_n_recipes:veggi, }) =>veggi );
        const recipeTypeVegan= data.map(({percentage_vegan_n_recipes:vegan}) =>vegan );
        //compute it to a list
        const recipeTypeList= [].concat(recipeTypeNone , recipeTypeVeggi, recipeTypeVegan);
            
        //console.log(recipeTypeList);
  
        //Compute the position of each group on the pie
        const pie = d3.pie().value(function(d) { return d[1];})
        const data_ready = pie(Object.entries(recipeTypeList))

        //console.log(data_ready)

    // map to data
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

    
    
    svg_pie.selectAll("path")
        .on("mouseover",function(){d3.select(this)
        .style("opacity", "0.6");
        
      })
        .on("mouseout",function(){d3.select(this)
        .style("opacity", "1");
    })

    /*add content TO DO!!! Not working 
    var content= d3.select("g").selectAll("text").data(data_ready);

    content
        .enter()
        .append("text")
        .each(function(d){
            d3.select(this)
            .attr("x", center[0])
            .attr("y", center[1])
            .text(d.data[1])
            .style("font-size", 14)
            .style("fill", "#fff")
            
        })*/  
        

    })   
}
update()

