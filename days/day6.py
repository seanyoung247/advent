""" Solves challenge for day 6 of AoC 2022 """

def solve(data, step):
    """
    Finds first group of characters of step length in data that have no repeated
    characters and returns the index in data of the last character in the group
    """
    for i in range(len(data) - step):
        last = i + step
        if len(set(data[i:last])) == len(data[i:last]):
            return last
    return None


def solve_one(data):
    """ Solves part one of day 6 """
    return solve(data, 4)


def solve_two(data):
    """ Solves part two of day 6 """
    return solve(data, 14)
