""" Solves challenge for day 12 of AoC 2022 """

import time
from pathfinding.core.grid import Grid
from pathfinding.finder.a_star import AStarFinder
from pathfinding.core.diagonal_movement import DiagonalMovement

class AoCGrid (Grid):
    def neighbors(self, node, diagonal_movement=DiagonalMovement.never):
        """ 
        Alters neighbors to only return nodes that can be reached 
        from the current one
        """
        return [
            n for n in super().neighbors(node, diagonal_movement) 
            if n.weight <= (node.weight + 1)
        ]


class AoCFinder (AStarFinder):
    def find_path(self, start, end, grid):
        """ 
        Alters find_path to take a list of start nodes and find the 
        shortest path for all starts in a single pass 
        """
        for node in start:
            node.opened = True
            node.g = 0
            node.f = 0
        open_list = start
        
        while len(open_list) > 0:
            path = self.check_neighbors(start[0], end, grid, open_list)
            if path:
                return path
        return []


def format_data(data, part_two=False):
    """ pre-formats data string"""
    rows = data.split('\n')
    goals = {'S':[],'E':(0,0)}
    lows = []
    matrix = [[None] * len(rows[0]) for _ in range(len(rows))]
    for y in range(len(rows)):
        for x in range(len(rows[y])):
            if rows[y][x] == 'S':
                goals['S'].append((x,y))
                matrix[y][x] = 1
            elif rows[y][x] == 'E':
                goals['E'] = (x,y)
                matrix[y][x] = 26
            else:
                matrix[y][x] = ord(rows[y][x]) - 96
            if part_two and rows[y][x] == 'a':
                goals['S'].append((x,y))
            
    return goals, matrix


def solve(start, end, matrix):
    """ Prepares a grid and paths from start to end based on matrix """
    grid = AoCGrid(matrix=matrix)
    start = [grid.node(node[0],node[1]) for node in start]
    end = grid.node(end[0],end[1])
    finder = AoCFinder()
    path = finder.find_path(start, end, grid)
    return len(path) - 1

def solve_one(data):
    """ Solves part one of day 12 """
    goals, matrix = format_data(data)
    return solve(goals['S'], goals['E'], matrix)


def solve_two(data):
    """ Solves part two of day 12 """
    goals, matrix = format_data(data, True)
    return solve(goals['S'], goals['E'], matrix)
