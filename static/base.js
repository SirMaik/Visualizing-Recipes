/*
    @author clarissa2
*/

//Table Content
//load dataset
const csvURL= "https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/world_map/data/countries.csv";

 d3.csv(csvURL).then(function (data) {
   //set columnames
    var columns = ['country','code','tag','number_of_recipes']

    //create table
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

    //fill table 
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

  //search functions

  function recipeSearch(){
    var cuisine = document.getElementById("cuisineInput").value;
    var ingredient = document.getElementById("ingredientInput").value;
    var recipeTitle = document.getElementById("recipetitleInput").value;

    document.getElementById("userSearch").style.display = "block"

    //print filter options into html
    document.getElementById("usercuisine").innerHTML += cuisine;
    document.getElementById("useringredient").innerHTML += ingredient;
    document.getElementById("userrecipetitle").innerHTML += recipeTitle;
  }
  
  // Overlay effect table
  function on() {
    document.getElementById("tableOverlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("tableOverlay").style.display = "none";
  }