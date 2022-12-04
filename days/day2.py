""" Solves challenge for day 2 of AoC 2022 """
# pylint: disable=consider-using-generator

def format_data(data):
    """ pre-formats data string"""
    return [ line.split(' ') for line in data.split('\n') ]


def get_val(row,col):
    """ Returns the value of the option at row and column """
    return ord(row[col]) - (65 + (23 * col))


def solve_one(data):
    """ Solves part one of day 2 """
    combinations = [[1,2,0],[0,1,2],[2,0,1]]
    return sum([
        (combinations[get_val(line,0)][get_val(line,1)] * 3) + get_val(line, 1) + 1
        for line in format_data(data)
    ])


def solve_two(data):
    """ Solves part two of day 2 """
    combinations = [[3,1,2],[1,2,3],[2,3,1]]
    return sum([
        (get_val(line,1) * 3) + combinations[get_val(line,0)][get_val(line,1)]
        for line in format_data(data)
    ])
    