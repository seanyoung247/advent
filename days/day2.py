
def format_data(data):
    return [ [ col for col in line.split(' ') ] for line in data.split('\n') ]


def get_val(row,col):
    return ord(row[col]) - (65 + (23 * col))


def solve_one(data):
    combinations = [[1,2,0],[0,1,2],[2,0,1]]
    return sum([ 
        (combinations[get_val(line,0)][get_val(line,1)] * 3) + get_val(line, 1) + 1 
        for line in format_data(data) 
    ])


def solve_two(data):
    combinations = [[3,1,2],[1,2,3],[2,3,1]]
    return sum([
        (get_val(line,1) * 3) + combinations[get_val(line,0)][get_val(line,1)]
        for line in format_data(data) 
    ])
    