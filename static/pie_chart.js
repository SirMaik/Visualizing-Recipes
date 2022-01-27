
//var defaultvalue=  document.getElementById('data').value
//console.log(defaultvalue)
//console.log(jsonPath)
const piePath= "static/data/country-data.json";

const w_pie = 200,
h_pie = 200,
m_pie = 10;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(w_pie, h_pie) / 2 - m_pie;

const color = d3.scaleOrdinal()
.domain(["percentage_non_type", "percentage_vegan_n_recipes", "percentage_veggi_n_recipes"])
.range(d3.schemeDark2);

function selectedData_pie(dataset){
    selected_country= getvalue_pie()
    var data_filter = dataset.filter( element => element.country ==selected_country)
    console.log(data_filter)

    return data_filter
}

const svg_pie = d3.select("#myPieChart")
        .append("svg")
        .attr("width", w_pie)
        .attr("height", h_pie)
        .append("g")
        .attr("transform", `translate(${w_pie/2}, ${h_pie/2})`);

// A function that create / update the plot
function update() {
    d3.json(piePath).then(function(data){
        //console.log(data)
        data= selectedData_pie(data)

        t= data.percentage_non_type
        console.log(t)

        // Compute the position of each group on the pie: TO DO!!!!!
        const pie = d3.pie()
            .value(function(d) {return d[1]; })
        const data_ready = pie(Object.entries(data))
        
        console.log(data_ready)


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
        .attr('fill', function(d){ return(color(d.data[0])) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")            
        .style("opacity", 1)
    })
}
update()

