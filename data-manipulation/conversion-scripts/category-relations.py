import pandas as pd
import ast 
import json

categoriesPath = '../derived-data/ingredient-categories.csv'
recipesPath = '../kaggle-data/RAW_recipes.csv'
outputfile='../derived-data/category-relations.json'

df1 = pd.read_csv(categoriesPath)
df2 = pd.read_csv(recipesPath)

categories = set()
ingredients = set()
cat_of_ingr = {}

for _,s1 in df1.iterrows():
    ingredient = s1.raw_ingr
    category = s1.ingredient_category

    if not category in categories:
        categories.add(category)


    ingredients.add(ingredient)
    cat_of_ingr[ingredient] = category

cat_ids = {}
i=1
for category in categories:
    cat_ids[category] = i
    i += 1

def getRelation(cat1, cat2):
    id1 = cat_ids[cat1]
    id2 = cat_ids[cat2]

    if id1 < id2:
        return (cat1, cat2)

    return (cat2, cat1)

relation_count = {}
n_categories = len(categories)
cat_list = list(categories)

for i in range(n_categories):
    cat1 = cat_list[i]

    for j in range(i,n_categories):
        cat2 = cat_list[j]
        relation = getRelation(cat1, cat2)

        relation_count[relation] = 0

n_relations = 0
for _,s2 in df2.iterrows():
    recipe_rels = set()
    recipe_ingr = ast.literal_eval(s2.ingredients)
    keys = cat_of_ingr.keys()

    # Some ingredients are not categorized
    recipe_ingr = [ingr for ingr in recipe_ingr if ingr in ingredients]

    n_ingredients = len(recipe_ingr)

    for i in range(n_ingredients - 1):
        ingr1 = recipe_ingr[i]
        cat1 = cat_of_ingr[ingr1]

        for j in range(i+1,n_ingredients):
            ingr2 = recipe_ingr[j]
            cat2 = cat_of_ingr[ingr2]

            relation = getRelation(cat1, cat2)

            if not relation in recipe_rels:
                recipe_rels.add(relation)
                n_relations += 1

    for relation in recipe_rels:
        count = relation_count[relation] + 1
        relation_count[relation] = count


rows = []
for i in range(n_categories):
    cat1 = cat_list[i]
    row = []

    for j in range(n_categories):
        cat2 = cat_list[j]
        relation = getRelation(cat1, cat2)
        count = relation_count[relation]
        row.append(count)

    rows.append(row)

data = {'categories': cat_list, 'n_relations': n_relations, 'relations': rows}

with open(outputfile, 'w') as f:
    json.dump(data, f)