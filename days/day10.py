""" Solves challenge for day 10 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    return [
        (line.split(' ')[0], int(line.split(' ')[1]) )
        if len(line.split(' ')) == 2 else (line, 0) for line in data.split('\n')
    ]


opcodes = {
    'addx': lambda x,v,c: (x+v,c+2),
    'noop': lambda x,_,c: (x,c+1),
}


def solve(ops):
    """ Runs through all provided operations and simulates machine state """
    state = {'X':1,'C':1}
    next_state = {'X':1,'C':1}
    signal = 0
    screen = [[' ']*40 for _ in range(6)]

    while len(ops):
        if state['C'] >= next_state['C']:
            state['X'] = next_state['X']
            opcode,val = ops.pop(0)
            next_state['X'], next_state['C'] = opcodes[opcode](state['X'],val,state['C'])

        signal += state['X'] * state['C'] if (state['C'] - 20) % 40 == 0 else 0

        pixel, line = ((state['C']-1) % 40, int((state['C']-1) / 40))
        screen[line][pixel] = '█' if pixel in range(state['X']-1,state['X']+2) else ' '
        state['C'] += 1

    return signal, '\n' + '\n'.join([f"\t\t{''.join(line)}" for line in screen])


def solve_one(data):
    """ Solves part one of day 10 """
    return solve(format_data(data))[0]


def solve_two(data):
    """ Solves part two of day 10 """
    return solve(format_data(data))[1]
