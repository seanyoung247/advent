""" Loads and runs code solutions for Advent of Code 2022 """

import argparse
from datetime import date
from importlib import import_module

# Import solutions:
solutions = []
for i in range(1,25):
    try:
        file_name = f'day{i}'
        module = import_module(f'.{file_name}', package='days')
        solutions.append(module)
    except ModuleNotFoundError:
        break


def load_file(file):
    """ Loads input file and returns contents """
    with open(file, encoding="utf-8") as data_file:
        return data_file.read()


def solve_day(day, data):
    """ Runs given challenge solution """
    print('\tPart one: ', day.solve_one(data))
    print('\tPart two: ', day.solve_two(data))


def create_challenge_files(day):
    """ Creates a  """
    if day > len(solutions):
        challenge_file = load_file('days/day_template.tmp')
        challenge_file = challenge_file.replace('{x}', f'{day}')

        with (open(f'days/day{day}.py', 'w', encoding='utf-8') as py_file,
            open(f'data/day{day}.txt', 'w', encoding='utf-8'),
            open(f'tests/day{day}.txt', 'w',encoding='utf-8')):
            py_file.write(challenge_file)

        return
    print('Challenge files already exists')


def main(args):
    """ Runs all requested solutions """
    if args.add:
        create_challenge_files(args.day)
        return

    if not args.all and args.day > len(solutions):
        print("No challenge files for requested day!")
        return

    folder = 'tests' if args.test else 'data'
    days = range(1,len(solutions)+1) if args.all else [args.day]
    for day in days:
        print(f'Day {day}:')
        solve_day(solutions[day-1], load_file(f'{folder}/day{day}.txt'))


if __name__ == '__main__':
    # If it's currently december the default day should be the current one.
    # Otherwise default day = 1
    default_day = date.today().day if date.today().month == 12 else 1

    parser = argparse.ArgumentParser(description='Runs code solutions for Advent of Code 2022')
    parser.add_argument(
        '-d', '--day', nargs='?',
        type=int, choices=range(1,26), metavar='[1-25]',
        const=default_day, default=default_day,
        help='Defines which day to solve.'
    )
    parser.add_argument(
        '-a', '--all', action='store_true', help='Runs all solutions in sequence'
    )
    parser.add_argument(
        '-t', '--test', action='store_true', help='Uses test data instead of real data'
    )
    parser.add_argument(
        '--add', action='store_true', help='Creates files for today\'s challenge.'
    )

    main(parser.parse_args())
