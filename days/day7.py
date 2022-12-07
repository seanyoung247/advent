""" Solves challenge for day 7 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    commands = [ line.split(' ') for line in data.split('\n')]
    stack = []
    directories = {}
    for line in commands:
        if line[0].isdigit():
            for directory in stack:
                directory[1] += int(line[0])
        elif line[1] == 'cd' and line[2] == '..':
            # directories.append(stack.pop(-1))
            directories.update(dict(zip(i := iter(stack.pop(-1)),i)))
        elif line[1] == 'cd':
            stack.append([line[2],0])

    directories.update({item[0]: item[1] for item in stack})
    # print(directories)
    # directories.extend(stack)
    return directories


def solve(directories, criteria):
    """ Returns only the size of directories that match criteria """
    for directory in directories.values():
        print(directory)
        if criteria(directory):
            print(directory)
            yield directory


def solve_one(data):
    """ Solves part one of day 7 """
    max_size = 100000
    return sum(solve(format_data(data), lambda size: size <= max_size))


def solve_two(data):
    """ Solves part two of day 7 """
    directories = format_data(data)
    required = directories['/'] - 40000000
    return min(solve(directories, lambda size: size >= required))
