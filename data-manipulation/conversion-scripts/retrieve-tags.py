# author: Miguel Ordóñez

import pandas as pd
import ast
import csv

inputfile='../kaggle-data/RAW_recipes.csv'
outputfile='../derived-data/tags.csv'


df = pd.read_csv(inputfile , usecols=["tags"])
counts = {}

for _, series in df.iterrows():
    tagList = ast.literal_eval(series.tags)
    for tag in tagList:
        counts[tag] =  counts.get(tag, 0) + 1

print("There are {} tags.".format(len(counts)))


rows = []
for tag, count in counts.items():
    rows.append([tag, count])

header = ['tag', 'count']
sortedRows = rows.sort(reverse=True, key=lambda x:x[1])

with open(outputfile, "w") as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)
