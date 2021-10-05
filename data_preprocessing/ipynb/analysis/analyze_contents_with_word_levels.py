# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib as mpl
import warnings
warnings.filterwarnings('ignore')

plt.rcParams['font.family'] = 'AppleGothic'
# plt.rcParams['font.family'] = 'NanumGothic'

# %% [markdown]
# ## 파일 불러오기

# %%
import os
path = '../../script'

# 다큐멘터리(0), 드라마(1), 영화(2) 선택
category = 0
if category == 0:
    path = path + '/Documentary'
elif category == 1:
    path = path + '/Drama'
else:
    path = path + '/Movie'

_list = os.listdir(path)

file_list = []
for file in _list:
    if file.startswith('.'): continue
    file_list.append(file)

file_list = sorted(file_list)
# print(f'작품개수: {len(file_list)}')
# print([{i:_list[i]} for i in range(len(file_list))])
# for index, title in enumerate(file_list):
#     print(f'{index}: {title}')

# %% [markdown]
# ### 작품 선택하기

# %%
# 바로 위 코드에서 file_list를 참고하여 작품 선택
# title = file_list[20]

for title in file_list:
  file_name = 'unique_words_' + title + '.WEBRip.Netflix.en[cc]'
  print(f'{path}/{title}/{file_name}')


  # %%
  count_df = pd.read_csv(f'{path}/{title}/{file_name}.csv', index_col='word')
  # display(count_df.info(), count_df)

  # %% [markdown]
  # ## count 모두 1로 초기화

  # %%
  count_df['counts'] = 1
  count_df

  # %% [markdown]
  # ## 변형형을 원형으로 변환후 다시 세기

  # %%
  # 단어 리스트 불러오기
  pd.options.display.float_format = '{:.0f}'.format

  word_db_df = pd.read_csv("../../words/final_datasets/words_df_word_level.csv")
  word_db_df
  word_db_df.set_index('Word', inplace=True)

  #변형어 리스트 불러오기
  existing_lemmas = pd.read_csv('../../words/final_datasets/existing_lemmas_final.csv', index_col='Word')
  lemmas_dict = {}
  for index, row in existing_lemmas.iterrows():
    lemmas = row["Lemmas"].split(';')
    for lemma in lemmas:
      lemmas_dict[lemma] = str(index)

  def convertToHeadForm(word):
    word = str(word)
    head = lemmas_dict.get(word)
    # If a lemma word, change to head word in word list
    if head:
      return head
    if word in word_db_df.index:
      return word
    else:
      # Check if adverb
      if word.endswith('ly'):
        if word[:-2] in word_db_df.index:
          print(word[:-2])
          return word[:-2]
        if word.endswith('ily'):
          if (word[:-3] + 'y') in word_db_df.index:
            print(word[:-3] + 'y')
            return word[:-3] + 'y'
        if word.endswith('ally'):
          if (word[:-4]) in word_db_df.index:
            print(word[:-4])
            return word[:-4]
        if (word[:-2] + 'e') in word_db_df.index:
          print(word[:-2] + 'e')
          return word[:-2] + 'e'
      return word

  count_df.index = count_df.index.map(convertToHeadForm)
  count_df

  counts_df_headed = count_df.groupby(count_df.index).sum()
  counts_df_headed.sort_values('counts', ascending=False, inplace=True)

  counts_df_headed
  # counts_df_headed.to_csv('test-about-time.csv')


  # %%
  counts_df_headed['counts'] = 1
  counts_df_headed

  # %% [markdown]
  # ## Add columns to count df

  # %%
  counts_df_headed_joined = counts_df_headed.join(word_db_df)

  counts_df_headed_joined

  # %% [markdown]
  # # Group by categories
  # %% [markdown]
  # ## Oxford, Lexile

  # %%
  oxford = counts_df_headed_joined.groupby('oxford_level').size()
  # oxford.drop(oxford.columns.difference(['counts']), 1, inplace=True)
  oxford

  oxford_result = oxford.to_frame(name='counts')
  oxford_result = oxford_result.transpose()
  oxford_result.rename({'counts': 'oxford'}, inplace=True)
  # oxford_result.rename({'counts': 'oxford'}, inplace=True)
  oxford_result.columns = range(1, len(oxford_result.columns)+1)
  oxford_result.columns = [*oxford_result.columns[:-1], 'NN']

  oxford_result


  # %%
  oxford_ver = counts_df_headed_joined.groupby('oxford_version').size()
  # oxford.drop(oxford.columns.difference(['counts']), 1, inplace=True)
  oxford_ver = oxford_ver.to_frame(name='counts')
  oxford_ver = oxford_ver.transpose()
  oxford_ver.rename({'counts': 'oxford_ver'}, inplace=True)
  oxford_ver.drop(0, axis=1, inplace=True)
  oxford_ver


  # %%
  lexile = counts_df_headed_joined.groupby('lexile_grade').size()
  # oxford.drop(oxford.columns.difference(['counts']), 1, inplace=True)
  lexile
  lexile = lexile.to_frame(name='counts')
  lexile = lexile.transpose()
  lexile.rename({'counts': 'lexile_grade'}, inplace=True)
  lexile.drop(0, axis=1, inplace=True)

  lexile


  # %%
  lexile_cat = counts_df_headed_joined.groupby('lexile_category').size()
  # oxford.drop(oxford.columns.difference(['counts']), 1, inplace=True)
  lexile_cat = lexile_cat.to_frame(name='counts')
  lexile_cat = lexile_cat.transpose()
  lexile_cat.rename({'counts': 'lexile_cat'}, inplace=True)
  lexile_cat.drop('NN', axis=1, inplace=True)
  lexile_cat.rename(columns={'general': 1, 'math': 2, 'science': 3, 'social_studies': 4}, inplace=True)


  lexile_cat

  # %% [markdown]
  # ## awsl, toefl, tsl, bsl

  # %%
  awsl = counts_df_headed_joined.groupby('awsl').size()
  # oxford.drop(oxford.columns.difference(['counts']), 1, inplace=True)
  awsl
  awsl = awsl.to_frame(name='counts')
  awsl = awsl.transpose()
  awsl.rename({'counts': 'awsl'}, inplace=True)
  awsl.rename(columns={'N':'NN', 'Y':1}, inplace=True)
  # awsl.columns = [1,2]
  # awsl.drop(0, axis=1, inplace=True)

  awsl


  # %%
  toefl = counts_df_headed_joined.groupby('toefl').size()
  toefl
  toefl = toefl.to_frame(name='counts')
  toefl = toefl.transpose()
  toefl.rename({'counts': 'toefl'}, inplace=True)
  toefl.rename(columns={'N':'NN', 'Y':1}, inplace=True)
  # toefl.drop(0, axis=1, inplace=True)

  toefl


  # %%
  tsl = counts_df_headed_joined.groupby('tsl').size()
  tsl
  tsl = tsl.to_frame(name='counts')
  tsl = tsl.transpose()
  tsl.rename({'counts': 'tsl'}, inplace=True)
  tsl.rename(columns={'N':'NN', 'Y':1}, inplace=True)
  # tsl.drop(0, axis=1, inplace=True)

  tsl


  # %%
  bsl = counts_df_headed_joined.groupby('bsl').size()
  bsl
  bsl = bsl.to_frame(name='counts')
  bsl = bsl.transpose()
  bsl.rename({'counts': 'bsl'}, inplace=True)
  bsl.rename(columns={'N':'NN', 'Y':1}, inplace=True)
  # bsl.drop(0, axis=1, inplace=True)

  bsl

  # %% [markdown]
  # ## NGSL, NGSL-S

  # %%
  ngsl_freq = counts_df_headed_joined.groupby('ngsl_freq').size()
  ngsl_freq
  ngsl_freq = ngsl_freq.to_frame(name='counts')
  ngsl_freq = ngsl_freq.transpose()
  ngsl_freq.rename({'counts': 'ngsl_freq'}, inplace=True)
  ngsl_freq.columns = range(1, len(ngsl_freq.columns)+1)
  ngsl_freq.columns = [*ngsl_freq.columns[:-1], 'NN']
  # ngsl_freq.drop(0, axis=1, inplace=True)

  ngsl_freq


  # %%
  ngsl_sp_freq = counts_df_headed_joined.groupby('ngsl_sp_freq').size()
  ngsl_sp_freq
  ngsl_sp_freq = ngsl_sp_freq.to_frame(name='counts')
  ngsl_sp_freq = ngsl_sp_freq.transpose()
  ngsl_sp_freq.rename({'counts': 'ngsl_sp_freq'}, inplace=True)
  ngsl_sp_freq.columns = range(1, len(ngsl_sp_freq.columns)+1)
  ngsl_sp_freq.columns = [*ngsl_sp_freq.columns[:-1], 'NN']
  # ngsl_sp_freq.drop(0, axis=1, inplace=True)

  ngsl_sp_freq


  # %%
  naver_priority = counts_df_headed_joined.groupby('naver_priority').size()
  naver_priority
  naver_priority = naver_priority.to_frame(name='counts')
  naver_priority = naver_priority.transpose()
  naver_priority.rename({'counts': 'naver_priority'}, inplace=True)
  naver_priority.rename(columns={0: 3, 1: 2, 2: 1, 3:0}, inplace=True)
  # naver_priority.columns = range(1, 12)
  # naver_priority.drop(0, axis=1, inplace=True)

  naver_priority


  # %%
  word_level = counts_df_headed_joined.groupby('word_level').size()
  word_level
  word_level = word_level.to_frame(name='counts')
  word_level = word_level.transpose()
  word_level.rename({'counts': 'word_level'}, inplace=True)
  # word_level.rename(columns={0: 3, 1: 2, 2: 1, 3:0}, inplace=True)
  # word_level.columns = range(1, 12)
  # word_level.drop(0, axis=1, inplace=True)

  word_level

  # %% [markdown]
  # ## Plot stacked bar 

  # %%
  result = pd.concat([oxford_result, lexile, lexile_cat, awsl, toefl, tsl, bsl, ngsl_freq, ngsl_sp_freq, naver_priority, word_level])


  # %%
  # fig = plt.figure(figsize=(20,15), dpi=80)
  # plt.rcParams["figure.figsize"]=(5, 7)
  # result.plot.bar(stacked=True)
  # plt.title('Levels')
  # plt.legend(bbox_to_anchor=(1.1, 1))


  # %%
  fig, axes = plt.subplots(1, 3, figsize=(30, 8), facecolor='white')
  fig.suptitle(title, fontsize=40)
  result = counts_df_headed_joined['oxford_level'].value_counts().sort_index()
  axes[0].pie(result, labels=result.index, autopct = "%1.0f%%")
  axes[0].set_title('Oxford Level')   

  result = counts_df_headed_joined['ngsl_freq'].value_counts().sort_index()
  axes[1].pie(result, labels=result.index,  autopct = "%1.0f%%")
  axes[1].set_title('ngsl Freq')

  result = counts_df_headed_joined['word_level'].value_counts().sort_index()
  axes[2].pie(result, labels=result.index,  autopct = "%1.0f%%")
  axes[2].set_title('Word Level')

  # result = counts_df_headed_joined['ngsl_sp_freq'].value_counts().sort_index()
  # axes[3].pie(result, labels=result.index,  autopct = "%1.0f%%")
  # axes[3].set_title('ngsl sp Freq')

  chart_path = '../../chart/pie chart'

  if category == 0:
      chart_path = chart_path + '/Documentary'
  elif category == 1:
      chart_path = chart_path + '/Drama'
  else:
      chart_path = chart_path + '/Movie'

  plt.savefig(f'{chart_path}/{title}.png')
  print(f'chart save success: {title}')

  # plt.show()


# %%



# %%



