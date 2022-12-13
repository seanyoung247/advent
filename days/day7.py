""" Solves challenge for day 7 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    commands = [ line.split(' ') for line in data.split('\n')]
    stack = []
    directories = []
    for line in commands:
        if line[0].isdigit():
            for directory in stack:
                directory[1] += int(line[0])
        elif line[1] == 'cd' and line[2] == '..':
            directories.append(stack.pop(-1))
        elif line[1] == 'cd':
            stack.append([line[2],0])

    directories.extend(stack)
    return directories


def solve_one(data):
    """ Solves part one of day 7 """
    max_size = 100000
    return sum(directory[1] for directory in format_data(data) if directory[1] <= max_size)


def solve_two(data):
    """ Solves part two of day 7 """
    directories = sorted(format_data(data), key=lambda x:x[1])
    required = directories[-1][1] - 40000000
    return min(directory[1] for directory in directories if directory[1] >= required)
