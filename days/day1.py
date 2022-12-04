""" Solves challenge for day 1 of AoC 2022 """

def format_data(data):
    """ pre-formats data string"""
    return [ sum(map(int,elf.split('\n'))) for elf in data.split('\n\n')]


def solve_one(data):
    """ Solves part one of day 1 """
    return max(format_data(data))


def solve_two(data):
    """ Solves part two of day 1 """
    return sum( sorted( format_data(data), reverse=True )[:3] )
