import argparse
from datetime import date 
from importlib import import_module

# Import solutions:
solutions = []
for i in range(1,25):
    try:
        file = f'day{i}'
        module = import_module(f'.{file}', package='days')
        solutions.append(module)
    except:
        break


def load_data(file):
    f = open(file)
    data = f.read()
    f.close()
    return data


def solve_day(day, data):
    print('\tPart one: ', day.solve_one(data))
    print('\tPart two: ', day.solve_two(data))


def main(args):
    folder = 'tests' if args.test else 'data'
    
    days = range(1,25) if args.all else [args.day]
    
    for day in days:
        data_file = f'{folder}/day{day}.txt'
        try:
            solution = solutions[day-1]
        except:
            break

        print(f'Day {day}:')
        solve_day(solution, load_data(data_file))
        

if __name__ == '__main__':
    # If it's currently december the default day should be the current one. Otherwise default to day 1
    default_day = date.today().day if date.today().month == 12 else 1

    parser = argparse.ArgumentParser(description='Runs code solutions for Advent of Code 2022')
    parser.add_argument(
        '-d', '--day', nargs='?', 
        type=int, choices=range(1,26), metavar='[1-25]',
        const=default_day, default=default_day,
        help='Defines which day to solve.'
    )
    parser.add_argument('-a', '--all', action='store_true', help='Runs all solutions in sequence')
    parser.add_argument('-t', '--test', action='store_true', help='Uses test data instead of real data')

    args = parser.parse_args()

    main(args)