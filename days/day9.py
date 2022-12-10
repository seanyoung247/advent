""" Solves challenge for day 9 of AoC 2022 """

class Coord:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Coord(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Coord(self.x - other.x, self.y - other.y)

    def vector(self):
        return Coord(sign(self.x), sign(self.y))

    def value(self):
        return (self.x, self.y)


def format_data(data):
    """ pre-formats data string"""
    return [(line.split()[0],int(line.split()[1])) for line in data.split('\n')]


dirs = {"U": Coord(0,1), "R": Coord(1,0), "L": Coord(-1,0), "D": Coord(0,-1)}


def sign(num):
    return (num > 0) - (num < 0)


def solve(moves, rope):
    visited = set()
    for dir, distance in moves:
        for _ in range(distance):
            rope[0] = rope[0] + dirs[dir]
            for i in range(1,len(rope)):
                delta = rope[i-1] - rope[i]
                if abs(delta.x) == 2 or abs(delta.y) == 2:
                    rope[i] = rope[i] + delta.vector()
            visited.add(rope[-1].value())
    return len(visited)


def solve_one(data):
    """ Solves part one of day 9 """
    return solve(format_data(data), [Coord(0,0) for _ in range(2)])


def solve_two(data):
    """ Solves part two of day 9 """
    return solve(format_data(data), [Coord(0,0) for _ in range(10)])
