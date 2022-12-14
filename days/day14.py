""" Solves challenge for day 14 of AoC 2022 """
from .libs.coords import Coords

# Generate coord runs
# Add them as a set of uniques.
# Each cycle move sand down. Check set. 
# If coord exists try left, try right, or append sand to set.

def format_data(data):
    """ pre-formats data string"""
    coords = set()
    for line in data.split('\n'):
        coords = line.split(' -> ')
        for start,end in zip(coords,coords[1:]):
            

            

def solve_one(data):
    """ Solves part one of day 14 """
    format_data(data)


def solve_two(data):
    """ Solves part two of day 14 """
