# Visualizing-Recipes
Explore the data of the recipes from [Food.com](https://www.food.com/). This project sheds light on the many facets of diffrent cuisines and ingredients of the recipes.

## Table of Contents
* [General Info](#general-information)
* [Getting Started](#getting-started)
* [Contributors](#contributors)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)

## General Information

This project was conceived in the context of the course "Visualisation of Biological Data" taught by Prof. Michael Krone at the University of Tübingen. We explored information that could be obtained from a dataset containing information from the food and recipe website [food.com] (https://www.food.com/). We focused on the interplay of different cuisines and ingredients in the recipes contained in the dataset. 

Aggregate recipe data could reveal information about larger trends in culinary regions. Assessing the similarities and differences of regional cuisines yielded interesting insights.
<!--Mehrin, Miguel feel free to add something
- Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it?-->
> #### Dataset
> In the course of this project, we analyzed thousands of ingredients, recipes and other recipe related terms. We started with a dataset obtained from [Kaggle](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions) with a collection of the raw recipe data (RAW_recipes.csv, ingr_map.pkl, RAW_interactions.csv). We retrieved cuisine data by retaining all country recipe tags from all possible tags. Then, each group of country cuisines was tagged with a regional tag (e.g. European, Asian or South-American). Only the recipes with an associated cuisine were kept. To simplify ingredients, we went through all 8000 listed ingredients in the ingredients mapping and summarized them further. We also extracted the "vegan" and "vegetarian" tags from recipes to gauge the proportion of these recipes in each cuisine. For the "Average Recipe Bubble Chart", the data was further summarized, while removing recipes with unreasonably long cooking times (keeping e.g. fermented foods but discarding recipes where the time specification did not match the steps).
> 
> The scripts in /data-manipulation/ conversion-scripts/ are based on the dataset we created in file [retrieve_recipe_ratings](data-manipulation/conversion-scripts/retrieve_recipe_ratings.ipynb) you can download it [here](https://drive.google.com/file/d/1Qa7Jfmt_gxJLuPqOChYDYg0AdFigHhOO/view)
> 


### Prerequisites
- Python 3
- Google Chrome

## Getting Started
Windows:
- Execute run.cmd

Linux: 
- Execute `$ python3 flaskServer.py`  

After this you will be shown a block of code which says something like "Running on http://127.0.0.1:5000/".
Copy that link and paste it in Google Chrome.
## Contributors

> ### mdittschar
> #### Tasks:
> 
> <img width="60%" alt="screenshot_bubble_chart" src="https://user-images.githubusercontent.com/96427238/151653456-007dd0a3-613e-4b38-80e4-f40084edaa04.png">
> 
>**Data Wrangling:**
>- extracting country cuisines from all recipes by retaining all tags that corresponded to a cuisine
>- adding regional tags to each country cuisine
>- extracting vegetarian and vegan tags from the data
>- drop all recipes that did not contain cuisine tags (about half of all recipes) 
>- it was attempted to visualise all recipes in one graph, but the sheer number of recipes made this quite hard, resulting in slow loading times and no visible clustering or added information
>- average the data by cuisine, add averages for regional data as well, remove uncharacteristic outliers (recipes where cooking time did not reflect the steps in the recipe)
>- average cook time and number of ingredients was chosen for the axes. One feature that was also considered was average rating, but the analysis revealed that the average rating consistently ranged between 4 and 4.5, therefore not yielding interesting findings.
>
>**Visualisation:**
>- encode information in interactive bubble chart
>- You can find the source of the basic bubble chart [here](https://www.d3-graph-gallery.com/graph/bubble_color.html) .
>- add "insight" annotations to bubble chart
> 
>**Findings:**
>- The average recipe cooking time by country was longer than previously thought, with some countries averaging at 5 hours (!). The median cooking time was considerably shorter. This fact, combined with a close look at the data led to the conclusion that a low number of recipes per cuisine combined with extreme outliers that took several weeks per recipe (e.g. [letting foods ferment in a fridge for several weeks](https://www.food.com/recipe/keep-it-going-german-friendship-cake-26995)) led to bigger average numbers. 
> - When averaging out the recipe information by cuisine, clustering could be seen that spanned across countries and led to differences between overarching regions.

##

> ### SirMaik
> #### Tasks:
>
>  **Project creation:**
>
> - Created the github project and the initial layout.  
>
>  **Data Wrangling:**
>
>  - Retrieve a list with all the tags used in recipes and the number of times they appear in the recipes  
> Script: /data-manipulation/convertion-scripts/retrieve-tags.py  
> Output file: /data-manipulation/derived-data/tags.csv  
>  - Used the file with the recipes and the one with the categories of each recipe to derive a file which contains the number of relations between categories. Only one relation between two categories is counted for each recipe.   
> Script: /data-manipulation/convertion-scripts/category-relations.py  
> Output file: /data-manipulation/derived-data/category-relations.json  
>  - At some point we ended up with three files with data in common (/derived-data/countries.json, /derived-data/recipes_by_cuisine_mean_count_no_long_recipes.csv, /derived-data/cuisine_percentage_number_recipes.csv). I retrieved the information from all of these files and created a new JSON file with all the data. After the script was executed the data some of the data had to be cleaned manually.  
Script: /data-manipulation/convertion-scripts/merge-files.py  
Output file: /data-manipulation/derived-data/country-data.json  
>
>  **Visualisations:**
>
>  ***World map***
>
>  <img width="60%" alt="screenshot_world_map" src="https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/img/screenshot_world_map.png"> 
>
> - Created a choropleth map which shows the world map. Each country is assigned a colour depending on the total number of recipes it has. The coloring scale is logarithmic because the data seems to follow an exponential pattern. When you hover over a country you can see additional data about it. It is possible to zoom and drag the map.
> - You can find the corresponding script here: [world map](static/world_map.js).
> - This code is a fork of this [example](https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html).
>
>  ***Chord diagram***
>
>  <img width="60%" alt="screenshot_chord_diagram" src="https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/img/screenshot_chord_diagram.png">  
>
> - Created a chord diagram which shows the amount of relations between food categories. Two categories are related in a recipe if at least one ingredient of each one of them is present in the recipe. I chose the color gradient that best allows the user to distinguish between categories. You can hover over the categories or the arcs (relations) to see further information about them. 
> - You can find the corresponding script here: [world map](static/chord.js).
> - This code is a fork of this [example](https://observablehq.com/@d3/chord-diagram?collection=@d3/d3-chord).
>  
> **Findings:**
>  
>  **World map**
>  
> - The number of recipes per country seems to follow an exponential pattern. 
> - The USA has a lot more recipes than the rest of the countries, which makes sense because the page is hosted in the USA and is in english.
>  
>  **Chord diagram**
>  
> - The category "spices" has the most number of relations, followed by "dairy" and "vegetables".
> - The number of relations involving meat represent only the  10.2% of the total number of relations. One possible cause might be that meat recipes don't use many other ingredients or maybe there are not that many recipes that use meat as an ingredient. 

##

> ### MehrinAzan
> #### Tasks:
>   **Data Wrangling:**
> - Derive all ingredients from recipes using OpenRefine 
> - Manually create categories for all ingredients and manually place every ingredient in its corresponding category using OpenRefine (10,000+ ingredients in total)
> - Create a data structure containing counts for how often each ingredient is used in recipes of each cuisine and region 
>   and assigned them to their corresponding categories
> - Checked for plurals in ingredients while placing them in categories
> - Removed unnecessary data included in ingredient data (such as cooking tools etc.)
> - the script for deriving the category data is [here](data-manipulation/conversion-scripts/cuisine_categories.ipynb)


>**Visualisations:**\
>  ***Tree Map*** 
>  - Implemented tree map to make compatible with hierarchical .json data.
>  - Added zoom functionality according to hierarchy where each tile size represents the size of the counts
>  - Aggregated data with identical names 
>  - Added zoom out functionality
>  - Added fade within zoom where new tiles fade in onto old tiles, and fade out while zooming out
>  <img width="60%" alt="screenshot_treemap" src="https://raw.githubusercontent.com/SirMaik/Visualizing-Recipes/main/img/screenshot_treemap.png">  
>  - Implemented visualisation to project
>
> 
> **Findings**:
> - OpenRefine is not as practical as it was assumed to be and sorting data into categories was an extremely time-consuming task that stretched over weeks
> - Vegetables, dairy and spices tend to be used the most in different cuisines.
> - Almost every cuisine uses spice more than any other ingredient.
> - Cultural eating habits are evident, i.e. more oil used in Asian cuisines and hardly any alcohol used in Middle-Eastern cuisines.
> 

##

> ### clarissa2
> #### Tasks:
> 
> **Build Website**
> - create a Layout-Draft
> - search for a background image on [freepic](http://www.freepik.com) and optimize color 
> - build the [HTML-file](templates/base.html) and the corrosponding, [style-sheet](static/basestylesheet.css)
> 
>  **Data Wrangling:**
>  - generate value counts of all recipes, vegetarian recipes and vegan recipes for each country and calculate the percentages (needed for pie chart) 
>  - generate a general ingredient list over all recipes, and count them how often the occure in the list of recipies. (needed for bar chart)
>  - sort the ingredient list by counts
>  - remove ingredients which are not interesting eg.(salt, peper, water)
>  - adding the values for some ingredients together (eggs & egg, onion & onions, garlic cloves & garlic & garlic clove) 
>  - only keep the top 6 of the ingredients for each country
>  - the whole script for deriving the data is [here](data-manipulation/conversion-scripts/retrieve_data_cusines_top6ingredients.ipynb)
> 
>  **Visualisations:**\
>  ***Bar chart***
>  
>  <img width="60%" alt="screenshot_bar_chart" src="https://user-images.githubusercontent.com/96427238/151653421-ebed4662-2031-4a07-9dd5-2f40f7cba9ab.png">
>  
>  - encode information in interactive [bar chart](static/bar_chart.js)
>  - add select option to only display the Country/cuisine of interest
>  - it is based on [this code](https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html)
>  - and inspired by [this code](https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html)
>
>  ***Pie chart***
>  
>  <img width="60%" alt="screenshot_pie_chart" src="https://user-images.githubusercontent.com/96427238/151653426-19628cad-0b82-48b2-852d-81b8538e5afb.png">
>  
>  - encode information in interactive [JS-file for pie chart](static/pie_chart.js)
>  - add select option to only display the Country/cuisine of interest
>  - it is based on this two codes: [code 1](https://www.geeksforgeeks.org/d3-js-pie-function/) and [code 2](https://www.d3-graph-gallery.com/graph/pie_changeData.html)
>
>  **Findings:**
>  
>  ***Bar chart***
>  - onion is nearly in all countrys/cuisines in the top 6 of used ingredients
>  - garlic is also one of the most used ingredients 
>  
>  ***Pie chart***
>  - nearly half of all Indian recipes are vegetarian or vegan. 
>  - some Scandinavian countries (Norwegain and finnland) have a particularly high proportion of vegetarian recipes in comparison with other European cuisines.

## Project Status
Project is: _in progress_ 


