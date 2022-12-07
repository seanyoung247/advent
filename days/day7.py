""" Solves challenge for day 7 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    commands = [ line.split(' ') for line in data.split('\n')]
    stack = []
    directories = []
    # Go through each line of input
    for line in commands:
        if line[0] == '$':
            if line[1] == 'cd':
                if line[2] == '..':
                    directories.append(stack.pop(-1))
                else:
                    stack.append([line[2],0])
        elif line[0].isdigit():
            for directory in stack:
                directory[1] += int(line[0])
    directories.extend(stack)
    return directories


def dir_size(directories, criteria):
    """ Returns only the size of directories that match criteria """
    for directory in directories:
        if criteria(directory[1]):
            yield directory[1]


def solve_one(data):
    """ Solves part one of day 7 """
    max_size = 100000
    return sum(dir_size(format_data(data), lambda size: size <= max_size))


def solve_two(data):
    """ Solves part two of day 7 """
    required = 30000000
    return min(size[1] for size in format_data(data) if size[1] > required)
