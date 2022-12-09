""" Solves challenge for day 9 of AoC 2022 """

import math

def format_data(data):
    """ pre-formats data string"""
    return [tuple(line.split()) for line in data.split('\n')]


update_pos = {
    'U': lambda p: (p[0],p[1]-1),
    'D': lambda p: (p[0],p[1]+1),
    'L': lambda p: (p[0]-1,p[1]),
    'R': lambda p: (p[0]+1,p[1]),
}


def distance(p1, p2):
    x = (p1[0] - p2[0]) ** 2
    y = (p1[1] - p2[1]) ** 2
    return x+y


def update_tail(tail_pos, head_pos, move):
    adjacent = [
        update_pos['U'](head_pos),
        update_pos['D'](head_pos),
        update_pos['L'](head_pos),
        update_pos['R'](head_pos),
    ]
    diagonals = [
        head_pos,
        (head_pos[0]-1,head_pos[1]-1),
        (head_pos[0]+1,head_pos[1]-1),
        (head_pos[0]-1,head_pos[1]+1),
        (head_pos[0]+1,head_pos[1]+1),
    ]
    
    if (tail_pos in adjacent) or (tail_pos in diagonals):
        return tail_pos

    test = min(adjacent, key=lambda x: distance(x, tail_pos))
    return test


def solve_one(data):
    """ Solves part one of day 9 """
    moves = format_data(data)
    visited = set()
    head_pos = (0,0)
    tail_pos = (0,0)
    visited.add(tail_pos)
    for move in moves:
        for _ in range(int(move[1])):
            head_pos = update_pos[move[0]](head_pos)
            tail_pos = update_tail(tail_pos,head_pos,move[0])
            visited.add(tail_pos)
            
    return len(visited)



def solve_two(data):
    """ Solves part two of day 9 """
