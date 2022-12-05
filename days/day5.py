""" Solves challenge for day 5 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    sections = data.split('\n\n')
    sections[0] = sections[0].split('\n')

    cols = int(sections[0][-1].strip()[-1])
    rows = len(sections[0]) - 1

    stacks = [
        [sections[0][r][c*4+1:c*4+2] for r in reversed(range(rows))
        if sections[0][r][c*4+1:c*4+2] != ' ']
        for c in range(cols)
    ]

    commands = [
        [ int(item) for item in cmd.split(' ') if item.isdigit() ]
        for cmd in sections[1].split('\n')
    ]
    return stacks, commands


def solve_one(data):
    """ Solves part one of day 5 """
    stacks,commands = format_data(data)
    for cmd in commands:
        stacks[cmd[2]-1].extend(reversed(stacks[cmd[1]-1][0 - cmd[0]:]))
        del stacks[cmd[1]-1][0 - cmd[0]:]

    return ''.join([ stack[-1] for stack in stacks if len(stack) > 0])


def solve_two(data):
    """ Solves part two of day 5 """
    stacks,commands = format_data(data)
    for cmd in commands:
        stacks[cmd[2]-1].extend(stacks[cmd[1]-1][0 - cmd[0]:])
        del stacks[cmd[1]-1][0 - cmd[0]:]

    return ''.join([ stack[-1] for stack in stacks if len(stack) > 0])
