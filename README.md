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
- Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it?
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

> #### Dataset
> In the course of this project, we analyzed thousands of ingredients, recipes and other recipe related terms. We started with a dataset obtained from [Kaggle](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions) with a collection of the raw recipe data (RAW_recipes.csv, ingr_map.pkl, RAW_interactions.csv). We retrieved cuisine data by retaining all country recipe tags from all possible tags. Then, each group of country cuisines was tagged with a regional tag (e.g. European, Asian or South-American). Only the recipes with an associated cuisine were kept. To simplify ingredients, we went through all 8000 listed ingredients in the ingredients mapping and summarized them further. We also extracted the "vegan" and "vegetarian" tags from recipes to gauge the proportion of these recipes in each cuisine. For the "Average Recipe Bubble Chart", the data was further summarized, while removing recipes with unreasonably long cooking times (keeping e.g. fermented foods but discarding recipes where the time specification did not match the steps).
> 
> The scripts in /data-manipulation/ conversion-scripts/ are based on the dataset we created in file [retrieve_recipe_ratings](data-manipulation/conversion-scripts/retrieve_recipe_ratings.ipynb) you can download it [here](https://drive.google.com/file/d/1Qa7Jfmt_gxJLuPqOChYDYg0AdFigHhOO/view)
> 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```
$ cd ../lorem
$ npm install
$ npm start
```

### Prerequisites
- d3.js - version 7.
<!-- add more -->
- Tech 2 - version 2.0
- Tech 3 - version 3.0



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
>- You can find the source of the basic bubble chart [here](https://www.d3-graph-gallery.com/graph/bubble_color.html).
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
> create Website: [base-file](templates/base.html), [style-sheet](static/basestylesheet.css)\
> create bar chart: [JS-file for bar chart](static/bar_chart.js), the data for this chart is derived in [Code for deriving top10 ingredient list for each Country](data-manipulation/conversion-scripts/retrieve_data_cusines_top6ingredients.ipynb)
> 
> <img width="60%" alt="screenshot_bar_chart" src="https://user-images.githubusercontent.com/96427238/151653421-ebed4662-2031-4a07-9dd5-2f40f7cba9ab.png">
> 
> Findings:
> 
> create pie chart: [JS-file for pie chart](static/pie_chart.js), the data for this chart is derived in [Code for deriving numbers of recipes /vegan/ veggi/ average calories/ percentage values](data-manipulation/conversion-scripts/retrieve_data_cusines_top6ingredients.ipynb)
> <img width="60%" alt="screenshot_pie_chart" src="https://user-images.githubusercontent.com/96427238/151653426-19628cad-0b82-48b2-852d-81b8538e5afb.png">
> 
> Findings:
> 

## Project Status
Project is: _in progress_ 

## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to...
