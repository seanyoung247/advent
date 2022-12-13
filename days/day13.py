""" Solves challenge for day 13 of AoC 2022 """
import json


def compare(left, right):
    """
    Recursively compares left and right. Returns 0 if equal,
    positive if left is greater, negative if right is greater
    """
    match left, right:
        case int(), int():
            return left - right
        case list(), list():
            for packet in zip(left, right):
                if ret := compare(*packet):
                    return ret
            return len(left) - len(right)
        case int(), list():
            return compare([left],right)
        case list(), int():
            return compare(left,[right])


class Packet:
    """ Models a single packet """
    def __init__(self, packet):
        self.packet = packet

    def comp(self, other):
        """ compares the two packets """
        return compare(self.packet, other.packet)

    def __eq__(self, other):
        return self.comp(other) == 0

    def __lt__(self, other):
        return self.comp(other) < 0

    def __gt__(self, other):
        return self.comp(other) > 0

    def __ge__(self, other):
        return self.comp(other) >= 0

    def __le__(self, other):
        return self.comp(other) <= 0


def format_data(data):
    """ pre-formats data string"""
    return [(
            Packet(json.loads(pair.split('\n')[0])),
            Packet(json.loads(pair.split('\n')[1]))
        )
        for pair in data.split('\n\n')
    ]


def solve_one(data):
    """ Solves part one of day 13 """
    packets = enumerate(format_data(data))
    return sum(
        idx + 1 for idx,(left,right) in packets 
        if left < right
    )


def solve_two(data):
    """ Solves part two of day 13 """
    dividers = (Packet([[2]]), Packet([[6]]))
    packets = [item for pair in format_data(data) for item in pair]
    return (
        (sum(i <= dividers[0] for i in packets) + 1) * 
        (sum(i <= dividers[1] for i in packets) + 2)
    )