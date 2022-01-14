/*
    @author clarissa2
*/
const csvURL= "https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/world_map/data/countries.csv";

 d3.csv(csvURL).then(function (data) {
    var columns = ['country','code','tag','number_of_recipes']
    console.log(data);

    var table = d3.select('div#searchTable').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody')

    thead.append('tr')
      .selectAll('th')
        .data(columns)
        .enter()
      .append('th')
        .text(function (d) { return d })

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
      .append('tr')

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] }
          })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })
  return table;
  })