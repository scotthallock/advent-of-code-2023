import re


def get_calibration_value(str):
    """The first and last digit of the string form the calibration value"""

    # replace non-digit characters with empty string
    only_digits = re.sub(r"\D+", "", str)
    if len(only_digits) == 0:
        return 0

    return int(only_digits[0] + only_digits[-1])


def sum_calibration_values(filename):
    calibration_values = open(filename, "r").read().split("\n")

    result = 0
    for v in calibration_values:
        result += get_calibration_value(v)

    return result


# Solve puzzle - 56108
print(
    sum_calibration_values("day_1/day_1_file.txt"),
)
