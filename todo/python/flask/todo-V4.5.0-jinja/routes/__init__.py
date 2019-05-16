from jinja2 import Environment, FileSystemLoader
from pathlib import Path

template_path = f'{Path(__file__).parent.parent}/views'
loader = FileSystemLoader(template_path)
env = Environment(loader=loader)


def template(path, **kwargs):
    """
    接受一个路径和一系列参数
    读取模板并渲染返回
    """
    t = env.get_template(path)
    return t.render(**kwargs)


def response_with_headers(headers: dict, code=200):
    """
    拼接返回响应的 headers, 参数如下是一个 dict, 如下:
    {
        Content-Type: text/html
        Set-Cookie: user=gua
    }
    返回响应的字符串形式
    """
    header = f'HTTP/1.1 {code} OK\r\n'
    header += ''.join([f'{k}: {v}\r\n' for k, v in headers.items()])
    return header


def redirect(url):
    """
    浏览器在收到 302 响应的时候
    会自动在 HTTP header 里面找 Location 字段并获取一个 url
    然后自动请求新的 url
    """
    headers = {
        'Location': url,
    }
    # 增加 Location 字段并生成 HTTP 响应返回
    # 注意, 没有 HTTP body 部分
    r = response_with_headers(headers, 302) + '\r\n'
    return r.encode('utf-8')


def http_response(headers, body):
    header = response_with_headers(headers)
    response = header + '\r\n' + body
    return response.encode('utf-8')


def error(request, code=404):
    """
    根据 code 返回不同的错误响应
    目前只有 404
    """
    # 之前上课我说过不要用数字来作为字典的 key
    # 但是在 HTTP 协议中 code 都是数字似乎更方便所以打破了这个原则
    e = {
        404: b'HTTP/1.1 404 NOT FOUND\r\n\r\n<h1>NOT FOUND</h1>',
    }
    return e.get(code, b'')

