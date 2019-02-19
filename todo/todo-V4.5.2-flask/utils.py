import random
import time


def random_str():
    """
    生成一个随机的字符串
    """
    seed = 'abcdefjsad89234hdsfkljasdkjghigaksldf89weru'
    s = ''
    for i in range(16):
        random_index = random.randint(0, len(seed) - 2)
        s += seed[random_index]
    return s


def current_time(ct):
    format = '%H:%M:%S'
    value = time.localtime(ct)
    dt = time.strftime(format, value)
    return dt