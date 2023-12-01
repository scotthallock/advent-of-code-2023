DIGITS = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
}


def get_calibration_value_2(str):
    first_digit = second_digit = ""

    # Iterate from start until we find a digit
    found = False
    i = 0
    while not found and i < len(str):
        for key, value in DIGITS.items():
            if str[i:].startswith(key):
                found = True
                first_digit = value
        i += 1

    # Iterate from the end until we find a digit
    found = False
    i = len(str) - 1
    while not found and i >= 0:
        for key, value in DIGITS.items():
            if str[: i + 1].endswith(key):
                found = True
                second_digit = value
        i -= 1

    return int(f"{first_digit}{second_digit}")


def sum_calibration_values_2(filename):
    calibration_values = open(filename, "r").read().split("\n")

    result = 0
    for v in calibration_values:
        result += get_calibration_value_2(v)

    return result


# Solve puzzle - 55652
print(
    sum_calibration_values_2("day_1/day_1_file.txt"),
)
