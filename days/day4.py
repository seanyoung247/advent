
def format_data(data):
    return [ [ list(range(int(p.split('-')[0]),int(p.split('-')[1])+1)) for p in pair.split(',')] for pair in data.split('\n') ]

subset = lambda a,b: a[0] in b and a[-1] in b

def solve_one(data):
    data = format_data(data)
    count = 0
    for pair in data:
        if subset(pair[0], pair[1]) or subset(pair[1], pair[0]):
            count += 1

    return count


def solve_two(data):
    data = format_data(data)
    count = 0

    for pair in data:
        if any(item in pair[0] for item in pair[1]):
            count += 1

    return count