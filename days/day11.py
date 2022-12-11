""" Solves challenge for day 11 of AoC 2022 """

import math

class Monkey:
    def __init__(self, data):
        lines = data.split('\n')
        self.id = int(lines[0][:-1].split()[1])
        self.items = list(map(int, lines[1].split(':')[1].split(',')))
        self.operation = lines[2].split('=')[-1]
        self.test = int(lines[3].split()[-1])
        self.conditions = [
            int(lines[5].split()[-1]),  # False
            int(lines[4].split()[-1])   # True
        ]
        self.inspections = 0

    def catch_item(self, item):
        self.items.append(item)
    
    def inspect_items(self, monkeys, normalise):
        self.inspections += len(self.items)
        while (len(self.items) > 0):
            old = self.items.pop(0)
            new = normalise(eval(self.operation))
            monkeys[self.conditions[(new % self.test == 0)]].catch_item(new)
        


def format_data(data):
    """ pre-formats data string"""
    monkeys_data = data.split('\n\n')
    monkeys = []
    for monkey_data in monkeys_data:
        monkeys.append(Monkey(monkey_data))
    return monkeys


def rounds(monkeys, count, normalise):
    while count > 0:
        count -= 1
        for monkey in monkeys:
            monkey.inspect_items(monkeys, normalise)
    return monkeys


def solve_one(data):
    """ Solves part one of day 11 """
    monkeys = sorted(rounds(format_data(data), 20, lambda x: x // 3), 
        key=lambda monkey: monkey.inspections, reverse=True)

    return monkeys[0].inspections * monkeys[1].inspections


def solve_two(data):
    """ Solves part two of day 11 """
    monkeys = format_data(data)
    product = math.prod([monkey.test for monkey in monkeys])
    monkeys = sorted(rounds(format_data(data), 10000, lambda x: x % product), 
        key=lambda monkey: monkey.inspections, reverse=True)

    return monkeys[0].inspections * monkeys[1].inspections
