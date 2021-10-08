import pandas as pd
import numpy as np

'''
테스트용 코드
'''
# df_script = pd.read_csv('C:/workspace/elice_web_project2/data_preprocessing/script/Movie/About.Time/unique_words_About.Time.WEBRip.Netflix.en[cc].csv', index_col='word')
# df_word_level = pd.read_csv('C:/workspace/elice_web_project2/data_preprocessing/words/final_datasets/words_df_word_level.csv', index_col='Word')
# df_lemmas = pd.read_csv('C:/workspace/elice_web_project2/data_preprocessing/words/final_datasets/existing_lemmas_final.csv', index_col='Word')

def get_word_level_counts_for_content(title, df_script, df_word_level, df_lemmas):
    # df_script.set_index('word', inplace=True)
    # df_word_level.set_index('Word', inplace=True)
    # df_lemmas.set_index('Word', inplace=True)

    #변형어 리스트 불러오기
    lemmas_dict = {}
    for index, row in df_lemmas.iterrows():
        lemmas = row["Lemmas"].split(';')
        for lemma in lemmas:
            lemmas_dict[lemma] = str(index)

    def convertToHeadForm(word):
        word = str(word)
        head = lemmas_dict.get(word)
        # If a lemma word, change to head word in word list
        if head:
            return head
        if word in df_word_level.index:
            return word
        else:
            # Check if adverb
            if word.endswith('ly'):
                if word[:-2] in df_word_level.index:
                    print(word[:-2])
                    return word[:-2]
                if word.endswith('ily'):
                    if (word[:-3] + 'y') in df_word_level.index:
                        print(word[:-3] + 'y')
                        return word[:-3] + 'y'
                if word.endswith('ally'):
                    if (word[:-4]) in df_word_level.index:
                        print(word[:-4])
                        return word[:-4]
                if (word[:-2] + 'e') in df_word_level.index:
                    print(word[:-2] + 'e')
                    return word[:-2] + 'e'
            return word

    df_script.index = df_script.index.map(convertToHeadForm)
    df_script_headed = df_script.groupby(df_script.index).sum()
    df_script_headed.sort_values('counts', ascending=False, inplace=True)

    counts_df_headed_joined = df_script_headed.join(df_word_level[['word_level']])

    result = counts_df_headed_joined.groupby('word_level').sum('counts').transpose()
    result['title'] = title
    result = result.set_index('title')
    result = result.rename(columns={1: 'level_1', 2: 'level_2', 3: 'level_3', 4: 'level_4', 5: 'level_5', 6: 'level_6'})

    return result



'''
테스트용 코드
'''
# print(get_word_level_counts_for_content('About.Time', df_script, df_word_level, df_lemmas))