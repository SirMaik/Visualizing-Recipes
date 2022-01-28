/*
    @author clarissa2
*/

// select value funktion
function getvalue_bar() {
  
var select = document.getElementById('data_bar');
  var option = select.options[select.selectedIndex];
  var x= option.value
  //console.log("you selected a new value for the bar chart")
  console.log(x)
 
  return x;
}

getvalue_bar();

// Pie value selection function 
function getvalue_pie() {
  
  var select = document.getElementById('data_pie');
    var option = select.options[select.selectedIndex];
    var x= option.value
    //console.log("you selected a new value for the pie chart")
    console.log(x)
   
    return x;
  }
  
  getvalue_pie();
