import pandas as pd
import spacy
import re

from content_functions import *


def spacyValidateSentence(script, nlp):
    doc = nlp(script)
    valid_sents = []
    for sent in doc.sents:
        # If at least one sentence is proper, return the valid sentence
        # ==> Skip rows that have proper nouns.
        # ==> at least one - AUX or VERB
        # ==> If first word noun - at least two - PRON or NOUN
        # ==> If first word is verb, there must be two verbs
        # ==> If verb comes before noun, order must be verb-noun-verb, not verb-noun-noun

        all_pos = [token.pos_ for token in doc]

        verb_in_sent = "AUX" in all_pos or "VERB" in all_pos
        verb_count = all_pos.count("AUX") + all_pos.count("VERB")
        first_word_is_verb = all_pos[0] == "AUX" or all_pos[0] == "VERB"
        is_noun = lambda x: x == "NOUN" or x == "PRON"
        two_nouns_in_sent = (all_pos.count("PRON") + all_pos.count("NOUN")) >= 2

        if "PROPN" in all_pos:
            continue
        if is_noun(all_pos[0]) and not two_nouns_in_sent:
            continue
        if not verb_in_sent:
            continue
        if first_word_is_verb and verb_count < 2:
            continue
        # check verb noun order
        verb_nouns = list(filter(lambda pos: pos == "VERB" or is_noun(pos), all_pos))
        if len(verb_nouns) == 0:
            continue
        if verb_nouns[0] == "VERB":
            first_noun_pos = next(
                (i for i, pos in enumerate(verb_nouns) if is_noun(pos)), -1
            )
            noun_count = verb_nouns.count("PRON") + verb_nouns.count("NOUN")
            # print(sent, "here1")
            if first_noun_pos != -1 and noun_count >= 2:
                if is_noun(verb_nouns[first_noun_pos + 1]):
                    continue
        valid_sents.append(str(sent))
    return valid_sents


def get_sentences_df(script, compound_dict, unique_word_levels_df, nlp):
    # Drop:
    # - duplicates
    # - short sentences.
    # - sentences starting with lower case letter
    script_csv = script.drop_duplicates(subset="script")
    script_csv = script_csv[
        ~script_csv["script"].apply(lambda x: len(x.split(" ")) < 3)
    ]
    script_csv = script_csv[~script_csv["script"].apply(lambda x: str(x).islower())]

    valid_scripts = []
    valid_starts = []
    valid_words = []
    valid_levels = []

    for index, row in script_csv.iterrows():
        # if sentence contains swearwords, pass
        lowered = str(row["script"]).lower()
        if "shit" in lowered or "fuck" in lowered:
            continue
        # check if all sentences have proper structure with Spacy.
        valid_sentences = spacyValidateSentence(row["script"], nlp)
        for sent in valid_sentences:
            # further sentence validation
            if (
                len(sent.split()) > 1
                and sent[0].isupper()
                and sent[-1] in [".", "?", "!"]
                and not any(char.isdigit() for char in sent)
            ):
                valid_starts.append(row.start)
                valid_scripts.append(sent)
                # ======== sentence to unique words=======
                sent_refined = removeStopWordsSpacy(sent, nlp)
                sent_refined = re.sub("[^a-zA-Z ]", "", sent_refined)
                sent_refined = sent_refined.lower()
                if len(sent_refined) == 0:
                    valid_levels.append(-1)
                    valid_words.append("")
                    continue
                sent_refined = hyphenateCompounds(sent, compound_dict)
                sent_word_list = sent_refined.split()
                df_sent_words = pd.DataFrame(sent_word_list)
                df_sent_words.rename(columns={0: "word"}, inplace=True)
                df_sent_words = (
                    df_sent_words.groupby("word").size().reset_index(name="counts")
                )
                df_sent_words = df_sent_words.join(
                    unique_word_levels_df[["word_level"]]
                )
                df_sent_words.sort_values("word_level", ascending=False)
                # Get top word and level
                valid_levels.append(df_sent_words.iloc[0]["word_level"])
                valid_words.append(df_sent_words.index[0])

    # df contaning valid sentences
    columns = {
        "start": valid_starts,
        "script": valid_scripts,
        "word": valid_words,
        "level": valid_levels,
    }
    valid_scripts_df = pd.DataFrame(columns)
    valid_scripts_df.drop_duplicates(subset="script", inplace=True)

    return valid_scripts_df
