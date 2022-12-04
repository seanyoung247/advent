
def format_data(data):
    return  [ 
        [
            list(range(int(p.split('-')[0]), int(p.split('-')[1])+1)) 
            for p in pair.split(',')
        ]
        for pair in data.split('\n') if pair 
    ]

subset_pair = lambda p: (p[0][0] in p[1] and p[0][-1] in p[1]) or (p[1][0] in p[0] and p[1][-1] in p[0])

def solve_one(data):
    return sum([1 for pair in format_data(data) if subset_pair(pair)])


def solve_two(data):
    return sum([1 for pair in format_data(data) if any(item in pair[0] for item in pair[1]) ])