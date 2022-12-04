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
        (pair[0][0] in pair[1] and pair[0][-1] in pair[1]) or
        (pair[1][0] in pair[0] and pair[1][-1] in pair[0])
    )


def solve(data, test):
    """ Generator function returns 1 if pair conforms to test otherwise 0 """
    for pair in data:
        yield(1 if test(pair) else 0)


def solve_one(data):
    """ Solves part one of day 4 """
    return sum(solve(format_data(data), subset_pair))


def solve_two(data):
    """ Solves part two of day 4 """
    return sum(solve(format_data(data),
        lambda pair: any(item in pair[0] for item in pair[1])))
