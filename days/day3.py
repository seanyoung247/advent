
def format_data(data):
    return data.split('\n')
    

get_priority = lambda ch : ord(ch) - (38 + (58 * ((ord(ch) & 32) >> 5))) 


def solve_one(data):
    bags = format_data(data)
    total = 0
    for bag in bags:
        # Split bag into it's compartments and remove duplicate characters.
        bag = [ set(bag[:len(bag)//2]), set(bag[len(bag)//2:]) ]
        # For each item in first bag compartment
        for item in bag[0]:
            # Find if it appears in the second compartment
            if item in bag[1]:
                total += get_priority(item)
    return total


def solve_two(data):
    bags = format_data(data)
    total = 0
    for i in range(0, len(bags), 3):
        bag = set(bags[i])
        for item in bag:
            if item in bags[i+1] and item in bags[i+2]:
                total += get_priority(item)
    return total