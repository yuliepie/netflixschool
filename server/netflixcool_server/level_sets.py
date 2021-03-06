class LevelSet:
    def __init__(self, label, rank, level, word_levels):
        self.label = (label,)
        self.rank = (rank,)
        self.level = (level, )
        self.word_levels = word_levels


def get_level_sets():
    level_A = LevelSet("순수 한국인", "A", 1, [1, 2, 3, 4, 5, 6, 7, 8])
    level_B = LevelSet("영어 루키", "B", 2, [9, 10])
    level_C = LevelSet("영어 중수", "C", 3, [11])
    level_D = LevelSet("영어 고수", "D", 4, [12])
    level_E = LevelSet("영어 초고수", "E", 5, [13, 14])

    return [level_A, level_B, level_C, level_D, level_E]
