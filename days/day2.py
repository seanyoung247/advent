""" Solves challenge for day 2 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    return [ line.split(' ') for line in data.split('\n') ]


def get_val(row,col):
    """ Returns the value of the option at row and column """
    return ord(row[col]) - (65 + (23 * col))


def solve(data, action):
    """ Iterates over data and performs action on each line """
    for line in data:
        yield action(line)


def solve_one(data):
    """ Solves part one of day 2 """
    matrix = [[1,2,0],[0,1,2],[2,0,1]]
    return sum(
        solve(format_data(data),
            lambda line: (matrix[get_val(line,0)][get_val(line,1)] * 3) + get_val(line, 1) + 1)
    )


def solve_two(data):
    """ Solves part two of day 2 """
    matrix = [[3,1,2],[1,2,3],[2,3,1]]
    return sum(
        solve(format_data(data),
            lambda line: (get_val(line,1) * 3) + matrix[get_val(line,0)][get_val(line,1)])
    )
    