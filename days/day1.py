
def format_data(data):
    elves = data.split('\n\n')
    calories = [ sum([int(i) for i in elf.split('\n')]) for elf in elves]
    return(calories)


def solve_one(data):
    return max(format_data(data))


def solve_two(data):
    calories = format_data(data)
    calories.sort(reverse=True)
    return sum( calories[:3] )
