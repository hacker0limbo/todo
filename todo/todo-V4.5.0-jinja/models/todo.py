from models import Model
import time


class Todo(Model):
    def __init__(self, form):
        super().__init__()
        self.id = form.get('id', None)
        self.title = form.get('title', '')
        self.completed = form.get('completed', False)
        self.created_time = form.get('created_time', None)
        self.updated_time = form.get('updated_time', None)
        if form.get('created_time', None) is None:
            self.created_time = int(time.time())
            self.updated_time = self.created_time

    def ct(self):
        """
        得到格式化后的创建时间
        """
        f = '%H:%M:%S'
        value = time.localtime(self.created_time)
        dt = time.strftime(f, value)
        return dt

    def ut(self):
        f = '%H:%M:%S'
        value = time.localtime(self.updated_time)
        dt = time.strftime(f, value)
        return dt

    @classmethod
    def update(cls, id, title):
        """
        更新一个 todo
        """
        todos = cls.all()
        for t in todos:
            if t.id == id:
                t.title = title
                t.updated_time = int(time.time())
                break
        cls.save(todos)

    @classmethod
    def complete(cls, id, is_completed):
        """
        将一个 todo 标记为 completed(True) 或 uncompleted(False)
        用法为: Todo.complete(1, True)
        """
        todos = cls.all()
        for t in todos:
            if t.id == id:
                t.completed = is_completed
                break
        cls.save(todos)

    @classmethod
    def add(cls, todo):
        """
        增加一个 todo
        """
        todos = cls.all()
        todo.id = len(todos) + 1
        # 新加的 id 需要重设 id
        todos.append(todo)
        cls.save(todos)


