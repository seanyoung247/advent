""" Solves challenge for day 4 of AoC 2022 """

def get_range(pair):
    """
    Expands given start and stop string list into an
    integer range.
    """
    return list(range(int(pair[0]), int(pair[1]) + 1))


def format_data(data):
    """ pre-formats data string"""
    return  [
        [ get_range(p.split('-')) for p in pair.split(',')]
        for pair in data.split('\n') if pair
    ]


def subset_pair(pair):
    """ Returns whether one pair item is fully enclosed by the other """
    return (
        (pair[0][0] >= pair[1][0] and pair[0][-1] <= pair[1][-1]) or
        (pair[1][0] >= pair[0][0] and pair[1][-1] <= pair[0][-1])
    )


def solve(data, test):
    """ Generator function returns 1 for every pair conforming to test """
    for pair in data:
        if test(pair):
            yield 1


def solve_one(data):
    """ Solves part one of day 4 """
    return sum(solve(format_data(data), subset_pair))


def solve_two(data):
    """ Solves part two of day 4 """
    return sum(solve(format_data(data),
        lambda pair: any(item in pair[0] for item in pair[1])
    ))
