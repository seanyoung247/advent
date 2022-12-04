
def get_range(pair):
    return list(range(int(pair[0]), int(pair[1]) + 1))


def format_data(data):
    return  [
        [ get_range(p.split('-')) for p in pair.split(',')]
        for pair in data.split('\n') if pair
    ]


def subset_pair(pair):
    return (
        (pair[0][0] in pair[1] and pair[0][-1] in pair[1]) or
        (pair[1][0] in pair[0] and pair[1][-1] in pair[0])
    )


def solve(data, test):
    for pair in data:
        yield(1 if test(pair) else 0)


def solve_one(data):
    return sum(solve(format_data(data), subset_pair ))


def solve_two(data):
    return sum(solve(format_data(data),
        lambda pair: any(item in pair[0] for item in pair[1])))
