
def format_data(data):
    return [ sum([int(i) for i in elf.split('\n')]) for elf in data.split('\n\n')]


def solve_one(data):
    return max(format_data(data))


def solve_two(data):
    return sum( sorted( format_data(data), reverse=True )[:3] )
