""" Solves challenge for day 3 of AoC 2022 """
# pylint: disable=consider-using-generator

def format_data(data):
    """ pre-formats data string"""
    return data.split('\n')


def get_priority(item):
    """ Returns the priority of the given item """
    return ord(item) - (38 + (58 * ((ord(item) & 32) >> 5)))


def solve_one(data):
    """ Solves part one of day 3 """
    return sum([
        sum([
            get_priority(item)
            for item in set(bag[:len(bag)//2])
            if item in bag[len(bag)//2:]
        ]) for bag in format_data(data)
    ])


def solve_two(data):
    """ Solves part two of day 3 """
    bags = format_data(data)
    return sum([
        sum([
            get_priority(item)
            for item in set(bags[i])
            if item in bags[i+1] and item in bags[i+2]
        ]) for i in range(0, len(bags), 3)
    ])
