
def format_data(data):
    return [ [ col for col in line.split(' ') ] for line in data.split('\n') ]


get_choice = lambda row,col: ord(row[col]) - (65 + (23 * col))


def solve_one(data):
    combinations = [
        [1,2,0],
        [0,1,2],
        [2,0,1] 
    ]

    data = format_data(data)
    total = 0
    for line in data:
        outcome = combinations[get_choice(line,0)][get_choice(line,1)]
        total += (outcome * 3) + get_choice(line, 1) + 1
    
    return total


def solve_two(data):
    combinations = [
        [3,1,2],
        [1,2,3],
        [2,3,1]
    ]

    data = format_data(data)
    total = 0
    for line in data:
        outcome = get_choice(line,1)
        player2 = combinations[get_choice(line,0)][outcome]
        total += (outcome * 3) + player2
    
    return total