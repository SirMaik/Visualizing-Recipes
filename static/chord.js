// Chord diagram
// https://observablehq.com/@d3/chord-diagram?collection=@d3/d3-chord

{
    const jsonPath= "static/data/category-relations.json";

    const height = 800
    const width = 800

    const outerRadius = Math.min(width, height) * 0.5 - 60
    const innerRadius = outerRadius - 10

    const formatValue = d3.format(".1~%")

    d3.json(jsonPath).then(function(data) {
        categories = data["categories"]
        n_relations = data["n_relations"]
        relations = data["relations"]


        colors = d3.quantize(d3.interpolateCubehelixDefault, categories.length)
        percentageStep = d3.tickStep(0, d3.sum(relations.flat()), 100)


        function ticks({startAngle, endAngle, value}) {
            const k = (endAngle - startAngle) / value;
            return d3.range(0, value, percentageStep).map(value => {
            return {value, angle: value * k + startAngle};
            });
        }


        chord = d3.chord()
            .padAngle(10 / innerRadius)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending)

        arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        ribbon = d3.ribbon()
            .radius(innerRadius - 1)
            .padAngle(1 / innerRadius)

        color = d3.scaleOrdinal(categories, colors)


        const svg = d3
            .select("#block1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        const chords = chord(relations);

        const category = svg.append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("class", "category")
            .selectAll("g")
            .data(chords.groups)
            .join("g");

        
        // Display arcs
        category.append("path")
            .attr("fill", d => color(categories[d.index]))
            .attr("d", arc);

        category.append("title")
            .text(d => `${categories[d.index]}:  
    Total number of relations: ${d.value}
    Percentage of relations: ${formatValue(d.value / n_relations)}`);


        //Display all labels
        const labels = category.append("g")
            .selectAll("g")
            .data(ticks)
            .join("g")
            .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

        labels.append("line")
            .attr("stroke", "currentColor")
            .attr("x2", 5);

        labels.append("text")
            .attr("x", 8)
            .attr("dy", "0.35em")
            .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => formatValue(d.value / n_relations));


        // Display category names
        category.select("text")
            .attr("font-weight", "bold")
            .text(function(d) {
                return this.getAttribute("text-anchor") === "end"
                    ? `↑ ${categories[d.index]}`
                    : `${categories[d.index]} ↓`;
            });
        
        // Display chords
        svg.append("g")
            .attr("fill-opacity", 0.8)
            .selectAll("path")
            .data(chords)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("fill", d => color(categories[d.source.index]))
            .attr("d", ribbon)
            .append("title")
            .text(d => `${categories[d.target.index]} ⇄ ${categories[d.source.index]}
    Number of relations: ${d.target.value}`);
    })

}