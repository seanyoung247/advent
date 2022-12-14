class Coord:
    """ Defines a single 2D coordinate """
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Coord(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Coord(self.x - other.x, self.y - other.y)

    def __hash__(self):
        return hash((self.x,self.y))

    def __eq__(self, other):
        if not isinstance(other, type(self)):
            return False
        return (self.x == other.x and self.y == other.y)

    def direction(self):
        """ Returns a normalised direction vector for this coord """
        return Coord(
            (self.x > 0) - (self.x < 0),
            (self.y > 0) - (self.y < 0)
        )