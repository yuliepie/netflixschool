import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import pymysql
import os
import sys
from dotenv import load_dotenv
from Scripts import db_connector


conn = db_connector.connect_to_db()
cursor = conn.cursor()

select_query = """
    select * 
    from netflix_contents 
    where content_level between %s and %s
"""

contents_df = pd.DataFrame()
# content_level 2 ~ 9
for i in range(2, 9):
    cursor.execute(
        select_query,
        [i, i+1]
    )
    df = pd.DataFrame(cursor.fetchall())
    if len(df) < 4:
        contents_df = pd.concat([contents_df, df])
    else:
        contents_df = pd.concat([contents_df, df.sample(4)])
    # print(len(contents_df))

contents_df.rename(columns={
    1: 'type', 2: 'netflix_id', 3: 'title', 4: 'title_kr', 5: 'title_en',
    6: 'genre', 7: 'age_rating', 8: 'director', 9: 'release_year', 10: 'running_time',
    11: 'story', 12: 'subs_path', 13: 'img_path', 14: 'word_difficulty_level', 15: 'words_per_second',
    16: 'content_level'
}, inplace=True)
contents_df.reset_index(drop=True, inplace=True)
contents_df.set_index('title_en', inplace=True)

print(contents_df)


plt.figure(figsize=(10, 10))
sns.scatterplot(data=contents_df, x='word_difficulty_level', y='words_per_second', color='r')
plt.title('Netflix Contents English Difficulty Distribution', size=20, pad=20)

for i in range(contents_df.shape[0]):
    plt.text(contents_df.word_difficulty_level[i], y=contents_df.words_per_second[i], s=contents_df.index[i], alpha=0.7)

plt.axhline(y=1.5, color='k', linewidth=1, linestyle='-')
plt.text(x=7.5, y=3, s='WPS', weight='bold')
plt.axvline(x=8, color='k', linewidth=1, linestyle='-')
plt.text(x=15, y=1.5, s='word level', weight='bold')

plt.axis('off')

plt.show()

# Scatter Plot (Image by author)