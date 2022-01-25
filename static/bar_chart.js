//console.log(jsonPath)
const top6Path= "static/data/top6_ingredients.json";

/*function printData(dataset){
    if (country in dataset == getvalue()){
        for (country of dataset){
            console.log(dataset)
        }
    }
}

function getvalue() {
    var select = document.getElementById('data');
    
    var option = select.options[select.selectedIndex];
    console.log(option.value)
    
}*/

getvalue();

d3.json(top6Path).then(function(dataset){
    console.log(dataset)
})