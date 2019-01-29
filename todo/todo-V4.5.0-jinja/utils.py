import time


def log(*args, **kwargs):
    """
    把所有的日志打印到一个文件中
    """
    f = '%H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(f, value)
    with open('log.txt', 'a', encoding='utf-8') as f:
        print(dt, *args, file=f, **kwargs)

