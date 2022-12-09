""" Solves challenge for day 8 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    return [[int(char) for char in line] for line in data.split('\n')]


def scan_range(rng, smax, trees, visible):
    max_tree = smax
    for i in rng:
        if trees(i) > max_tree:
            max_tree = trees(i)
            visible(i)


def solve_row(row, visible):
    tree = lambda i:row[i]
    def set_visible(i):
        visible[i] = 1

    scan_range(range(len(row)), row[0], tree, set_visible)
    scan_range(range(len(row)-1, -1, -1), row[-1], tree, set_visible)


def solve_col(col, data, visible):
    tree = lambda i:data[i][col]
    def set_visible(i):
        visible[i][col] = 1
    
    scan_range(range(len(data)), data[0][col], tree, set_visible)
    scan_range(range(len(data)-1, -1, -1), data[-1][col], tree, set_visible)


def solve_one(data):
    """ Solves part one of day 8 """
    data = format_data(data)
    rows = len(data)
    cols = len(data[0])
    visible = [ 
        [
            1 if (item == 0 or line == 0 or 
                item == (cols-1) or line == (rows-1)) 
            else 0 for item in range(cols)
        ] 
        for line in range(rows)
    ]

    for i,row in enumerate(data):
        solve_row(row, visible[i])

    for col in range(cols):
        solve_col(col,data,visible)

    return sum([sum(line) for line in visible])


def scenic_score(row, col, data):
    tree = data[row][col]

    count = [0,0,0,0]
    for r in range(row-1, -1, -1):
        count[0] += 1
        if data[r][col] >= tree:
            break

    for r in range(row + 1, len(data)):
        count[1] += 1
        if data[r][col] >= tree:
            break

    for c in reversed(data[row][:col]):
        count[2] += 1
        if c >= tree:
            break

    for c in data[row][col + 1:]:
        count[3] += 1
        if c >= tree:
            break
    
    total = 1
    for x in count:
        total *= x
    return total


def solve_two(data):
    """ Solves part two of day 8 """
    data = format_data(data)
    rows = len(data)
    cols = len(data[0])
    max_tree = 0
    for r in range(1,rows-1):
        for c in range(1,cols-1):
            current_tree = scenic_score(r, c, data)
            max_tree = max(max_tree, current_tree)

    return max_tree
    