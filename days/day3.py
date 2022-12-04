
def format_data(data):
    return data.split('\n')


def get_priority(ch): 
    return ord(ch) - (38 + (58 * ((ord(ch) & 32) >> 5)))


def solve_one(data):
    return sum([
        sum([
            get_priority(item)
            for item in set(bag[:len(bag)//2])
            if item in bag[len(bag)//2:]
        ]) for bag in format_data(data)
    ])


def solve_two(data):
    bags = format_data(data)
    return sum([
        sum([
            get_priority(item)
            for item in set(bags[i])
            if item in bags[i+1] and item in bags[i+2]
        ]) for i in range(0, len(bags), 3)
    ])
