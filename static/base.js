/*
    @author clarissa2
*/

//Table Content
//load dataset
const csvPath = "static/data/data_recipe_search.csv";
const ingredientsPath = "static/data/ingredients_list.csv";


Promise.all([d3.csv(csvPath),d3.csv(ingredientsPath)]).then(function (data) {
  // store country names in an array
  var c = [];
  var m = [];
 
  data[0].map(function(d){
    c.push(d.country)
    m.push(d.minutes)
  })
  let countries = [...new Set(c)];
  let minutes= [...new Set(m)];
  
  console.log(countries);
  console.log(minutes);

  var i = [];
  data[1].map(function(d){
    i.push(d.ingredient)
  })
  let ingredients = [...new Set (i)];
  console.log(ingredients)
    
  //set columnames
  var columns = ['name','id',	'minutes','ingredients','region','country','vegetarian_vegan','rating']

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
        .data(data[0])
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
    
    d3.selectAll('tr')
    .on("click", d =>{ 
      var id= d.target.__data__.value
      console.log(d.target.__data__.value)
      console.log(id)
      //d3.select()
      var loc = "https://www.food.com/"+id;
      console.log(loc)
      document.getElementById("myframe").src=loc;
      on()
    })

    

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