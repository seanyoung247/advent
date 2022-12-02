
def format_data(data):
    elves = data.split('\n\n')
    calories = [] 

    for elf in elves:
        bags = elf.split('\n')
        total = 0
        for bag in bags:
            total += int(bag)
        
        calories.append(total)
    
    return(calories)


def solve_one(data):
    return(max(format_data(data)))


def solve_two(data):
    calories = format_data(data)
    calories.sort(reverse=True)
    total = 0
    for i in range(3):
        total += calories[i]
    return total