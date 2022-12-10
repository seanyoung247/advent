""" Solves challenge for day 10 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    return [ (line.split(' ')[0], int(line.split(' ')[1]) ) if len(line.split(' ')) == 2 else (line, 0) for line in data.split('\n') ]


opcodes = {
    'addx': lambda x,v,c: (x+v,c+2),
    'noop': lambda x,v,c: (x,c+1),
}


def solve_one(data):
    """ Solves part one of day 10 """
    X = 1
    cycle = 1
    signal = []
    cycles = [20,60,100,140,180,220]
    
    for op,val in format_data(data):
        X, cycle = opcodes[op](X, val, cycle)
        if len(cycles) > 0 and (cycle >= cycles[0] or cycle == cycles[0]-1):
            signal.append(X*cycles[0])
            cycles.pop(0)
    return sum(signal)      


def solve_two(data):
    """ Solves part two of day 10 """
    ops = format_data(data)
    X = 1
    next_X = 1
    cycle = 1
    screen = [[' ']*40 for _ in range(6)]
    next_cycle = 1
    
    while len(ops):
        pixel, line = ((cycle-1) % 40, int((cycle-1) / 40))
        cycle += 1
        if cycle >= next_cycle:
            X = next_X
            op,val = ops.pop(0)
            next_X, next_cycle = opcodes[op](X,val,cycle)
        
        screen[line][pixel] = '█' if pixel in range(X-1,X+2) else ' '
    
    return '\n' + '\n'.join([f"\t\t{''.join(line)}" for line in screen])