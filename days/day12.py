""" Solves challenge for day 12 of AoC 2022 """

from pathfinding.core.grid import Grid
from pathfinding.finder.a_star import AStarFinder
from pathfinding.core.diagonal_movement import DiagonalMovement

class AoCGrid (Grid):
    def neighbors(self, node, diagonal_movement=DiagonalMovement.never):
        nodes = super().neighbors(node, diagonal_movement)
        ret = []
        for n in nodes:
            if n.weight <= node.weight + 1:
                ret.append(n)
        return ret


def format_data(data):
    """ pre-formats data string"""
    rows = data.split('\n')
    goals = {'S':(0,0),'E':(0,0)}
    lows = []
    matrix = [[None] * len(rows[0]) for _ in range(len(rows))]
    for y in range(len(rows)):
        for x in range(len(rows[y])):
            if rows[y][x] == 'S':
                goals['S'] = (x,y)
                matrix[y][x] = 1
            elif rows[y][x] == 'E':
                goals['E'] = (x,y)
                matrix[y][x] = 26
            else:
                matrix[y][x] = ord(rows[y][x]) - 96
            if rows[y][x] == 'a':
                lows.append((x,y))
            
    return lows, goals, matrix


def solve(start, end, matrix):
    grid = AoCGrid(matrix=matrix)
    start = grid.node(start[0],start[1])
    end = grid.node(end[0],end[1])
    finder = AStarFinder()
    path = finder.find_path(start, end, grid)[0]
    return len(path) - 1

def solve_one(data):
    """ Solves part one of day 12 """
    _, goals, matrix = format_data(data)
    return solve(goals['S'], goals['E'], matrix)


def solve_two(data):
    """ Solves part two of day 12 """
    lows, goals, matrix = format_data(data)
    
    return min(filter(lambda x: x > 0, [ solve(start, goals['E'],matrix) for start in lows ]))
