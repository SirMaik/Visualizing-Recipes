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

## Getting Started
<!--Miguel -->
These instructions will get you a copy of the project up and running on your local machine 

```
$ cd ../lorem
$ npm install
$ npm start
```

### Prerequisites
- d3.js - version 7.
<!-- Miguel: add more -->


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
> 
> 
> Findings:

##

> ### MehrinAzan
> #### Tasks:
> 
> 
> 
> Findings:

##

> ### clarissa2
> #### Tasks:
> 
> **Build Website**
> - create a Layout-Draft
> - search for a background image on [freepic](http://www.freepik.com) and optimize color 
> - build the [HTML-file](templates/base.html)and the corrosponding, [style-sheet](static/basestylesheet.css)
> 
>  **Data Wrangling:**
>  - generate value counts of all recipes, vegetarian recipes and vegan recipes for each country and calculate the percentages (needed for pie chart) 
>  - generate a general ingredient list over all recipes, and count them how often the occure in the list of recipies. (needed for bar chart)
>  - sort the ingredient list by counts
>  - remove ingredients which are not interesting eg.(salt, peper, water)
>  - adding the values for eggs and egg together (only did this for egg, but there are more ingredients, where we could do that) 
>  - only keep the top 6 of the ingredients for each country
>  - the whole script for deriving the data is [here](data-manipulation/conversion-scripts/retrieve_data_cusines_top6ingredients.ipynb)
> 
>  **Visualisations:**
> <img width="60%" alt="screenshot_bar_chart" src="https://user-images.githubusercontent.com/96427238/151653421-ebed4662-2031-4a07-9dd5-2f40f7cba9ab.png">
> 
>  ***Bar chart***
>  - encode information in interactive [bar chart](static/bar_chart.js)
>  - add select option to only display the Country/cuisine of interest
>  - it is based on [this code](https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html)
>  - and inspired by and [this code](https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html)
>  
>  <img width="60%" alt="screenshot_pie_chart" src="https://user-images.githubusercontent.com/96427238/151653426-19628cad-0b82-48b2-852d-81b8538e5afb.png">
>  
>  ***Pie chart***
>  - encode information in interactive [JS-file for pie chart](static/pie_chart.js)
>  - add select option to only display the Country/cuisine of interest
>  - it is based on this two codes: [code 1](https://www.geeksforgeeks.org/d3-js-pie-function/) and [code 2](https://www.d3-graph-gallery.com/graph/pie_changeData.html)
>
>  **Findings:**
>  ***Bar chart***
>  - 
>  ***Pie chart***
>  -

## Project Status
Project is: _in progress_ 

## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to...
