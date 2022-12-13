""" Solves challenge for day 13 of AoC 2022 """
from functools import total_ordering
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


@total_ordering
class Packet:
    """ Models a single packet """
    def __init__(self, packet):
        self.packet = packet

    def compare(self, other):
        """ compares the two packets """
        return compare(self.packet, other.packet)

    def __eq__(self, other):
        return self.compare(other) == 0

    def __lt__(self, other):
        return self.compare(other) < 0


def format_data(data):
    """ pre-formats data string"""
    return [Packet(json.loads(line)) for line in data.split('\n') if line]


def solve_one(data):
    """ Solves part one of day 13 """
    data = format_data(data)
    packets = enumerate(zip(data[::2],data[1::2]))
    return sum(
        idx + 1 for idx,(left,right) in packets
        if left < right
    )


def solve_two(data):
    """ Solves part two of day 13 """
    packets = format_data(data)
    return (
        (sum(packet < Packet([[2]]) for packet in packets) + 1) *
        (sum(packet < Packet([[6]]) for packet in packets) + 2)
    )
