""" Solves challenge for day 5 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    sections = data.split('\n\n')
    sections[0] = sections[0].split('\n')

    cols = int(sections[0][-1].strip()[-1])
    rows = len(sections[0]) - 1
    col_width = 4

    stacks = [
        [sections[0][r][c*col_width+1:c*col_width+2] for r in reversed(range(rows))
        if sections[0][r][c*col_width+1:c*col_width+2] != ' ']
        for c in range(cols)
    ]

    commands = [
        [ int(item) for item in cmd.split(' ') if item.isdigit() ]
        for cmd in sections[1].split('\n')
    ]
    return stacks, commands


def solve(stacks, commands, action):
    """ Performs all commands on stacks with action passed """
    for cmd in commands:
        stacks[cmd[2]-1].extend(action(stacks[cmd[1]-1][0 - cmd[0]:]))
        del stacks[cmd[1]-1][0 - cmd[0]:]
    return stacks


def solve_one(data):
    """ Solves part one of day 5 """
    return ''.join([stack[-1] for stack in solve(*format_data(data), reversed) if len(stack) > 0])


def solve_two(data):
    """ Solves part two of day 5 """
    return ''.join([stack[-1] for stack in solve(*format_data(data), lambda x:x) if len(stack) > 0])
