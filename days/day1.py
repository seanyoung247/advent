
def get_elves(elf):
    for i in elf:
        yield int(i)

def format_data(data):
    return [ sum(get_elves(elf.split('\n'))) for elf in data.split('\n\n')]


def solve_one(data):
    return max(format_data(data))


def solve_two(data):
    return sum( sorted( format_data(data), reverse=True )[:3] )
