import pandas as pd
import ast
import csv
import json

# Miguel's file
inputfile1 = '../derived-data/countries.json'
# Marina's file
inputfile2 = '../derived-data/recipes_by_cuisine_mean_count_no_long_recipes.csv'
# Clarissa's file
inputfile3 = '../derived-data/cuisine_percentage_number_recipes.csv'
# Output file
outputfile = '../derived-data/country-data.json'

df1 = pd.read_json(inputfile1)
df2 = pd.read_csv(inputfile2)
df3 = pd.read_csv(inputfile3)

countries = []

for _,s1 in df1.iterrows():
    # Extract Miguel's data
    country = s1.to_dict()

    if country['country'] == 'USA':
        tag = 'american'
    else:
        tag = country['tags_with_number_of_recipes'][0]['tag']

    del country['tags_with_number_of_recipes']
    country['main_tag'] = tag
    country['tags'] = [tag]

    d1 = df2.loc[df2['country'] == tag]
    d2 = df3.loc[df3['country'] == tag]

    if (d1.empty or d2.empty):
        continue

    s2 = d1.iloc[0]
    s3 = d2.iloc[0]


    # Extract Clarissa's data
    n_recipes = s3['n_recipes']

    country['n_recipes'] = int(n_recipes)
    country['veggi_n_recipes'] = int(s3['veggi_n_recipes'])
    country['vegan_n_recipes'] = int(s3['vegan_n_recipes'])
    country['average_calories'] = s3['average_calories']

    percentage_veggi = country['veggi_n_recipes'] / n_recipes * 100
    percentage_vegan = country['vegan_n_recipes'] / n_recipes * 100
    percentage_non_type = 100 - percentage_veggi - percentage_vegan

    country['percentage_vegan_n_recipes'] = "{:.2f}".format(percentage_vegan)
    country['percentage_veggi_n_recipes'] = "{:.2f}".format(percentage_veggi)
    country['percentage_non_type'] = "{:.2f}".format(percentage_non_type)


    # Extract Marina's data
    country['minutes'] = s2['minutes']
    country['n_steps'] = s2['n_steps']
    country['n_ingredients'] = s2['n_ingredients']
    country['rating'] = s2['rating']
    country['region'] = s2['region']

    countries.append(country)

# Manage special cases:

# Add Iran

s2 = df2.loc[df2['country'] == 'iranian-persian'].iloc[0]
s3 = df3.loc[df3['country'] == 'iranian-persian'].iloc[0]

iran = {}
iran['country'] = 'Iran'
iran['code'] = 'IRN'
tag = s2['country']
iran['main_tag'] = tag
iran['tags'] = [tag]
n_recipes = s3['n_recipes']
iran['n_recipes'] = int(n_recipes)
iran['veggi_n_recipes'] = int(s3['veggi_n_recipes'])
iran['vegan_n_recipes'] = int(s3['vegan_n_recipes'])
iran['average_calories'] = s3['average_calories']
percentage_veggi = iran['veggi_n_recipes'] / n_recipes * 100
percentage_vegan = iran['vegan_n_recipes'] / n_recipes * 100
percentage_non_type = 100 - percentage_veggi - percentage_vegan
iran['percentage_vegan_n_recipes'] = "{:.2f}".format(percentage_vegan)
iran['percentage_veggi_n_recipes'] = "{:.2f}".format(percentage_veggi)
iran['percentage_non_type'] = "{:.2f}".format(percentage_non_type)
iran['minutes'] = s2['minutes']
iran['n_steps'] = s2['n_steps']
iran['n_ingredients'] = s2['n_ingredients']
iran['rating'] = s2['rating']
iran['region'] = s2['region']
countries.insert(29, iran)


# Fix UK

s2_wales = df2.loc[df2['country'] == 'welsh'].iloc[0]
s3_wales = df3.loc[df3['country'] == 'welsh'].iloc[0]
s2_scot = df2.loc[df2['country'] == 'scottish'].iloc[0]
s3_scot = df3.loc[df3['country'] == 'scottish'].iloc[0]

england = next(country for country in countries if country['main_tag'] == 'english')
england['tags'].extend([s2_wales['country'], s2_scot['country']])

n_england = england['n_recipes']
n_wales = int(s3_scot['n_recipes'])
n_scot = int(s3_wales['n_recipes'])

n_recipes = n_england + n_wales + n_scot
england['n_recipes'] = n_recipes
england['veggi_n_recipes'] = england['veggi_n_recipes'] + int(s3_scot['veggi_n_recipes']) + int(s3_wales['veggi_n_recipes'])
england['vegan_n_recipes'] = england['vegan_n_recipes'] + int(s3_scot['vegan_n_recipes']) + int(s3_wales['vegan_n_recipes'])

percentage_veggi = england['veggi_n_recipes'] / n_recipes * 100
percentage_vegan = england['vegan_n_recipes'] / n_recipes * 100
percentage_non_type = 100 - percentage_veggi - percentage_vegan
england['percentage_vegan_n_recipes'] = "{:.2f}".format(percentage_vegan)
england['perce\ntage_veggi_n_recipes'] = "{:.2f}".format(percentage_veggi)
england['percentage_non_type'] = "{:.2f}".format(percentage_non_type)

def weightedAverage(values, total):

    sum = 0
    for v in values:
        sum += v[0] * v[1]

    average = sum / total

    return average

england['average_calories'] = weightedAverage([[n_england, england['average_calories']],
                                              [n_wales, s3_wales['average_calories']],
                                              [n_scot, s3_scot['average_calories']]], n_recipes)

england['minutes'] = weightedAverage([[n_england, england['minutes']],
                                              [n_wales, s2_wales['minutes']],
                                              [n_scot, s2_scot['minutes']]], n_recipes)

england['n_steps'] = weightedAverage([[n_england, england['n_steps']],
                                              [n_wales, s2_wales['n_steps']],
                                              [n_scot, s2_scot['n_steps']]], n_recipes)

england['rating'] = weightedAverage([[n_england, england['rating']],
                                              [n_wales, s2_wales['rating']],
                                              [n_scot, s2_scot['rating']]], n_recipes)

# Fix tags
us = next(country for country in countries if country['main_tag'] == 'american')
us['tags']= ['southern-united-states', 'south-west-pacific', 'southwestern-united-states', 'midwestern', 'northeastern-united-states',
                            'cajun', 'pacific-northwest', 'creole', 'californian',  'hawaiian', 'native-american', 'pennsylvania-dutch']

canada = next(country for country in countries if country['main_tag'] == 'canadian')
canada['tags'] = ['ontario', 'british-columbian', 'quebec']


with open(outputfile, 'w') as f:
    json.dump(countries, f)
