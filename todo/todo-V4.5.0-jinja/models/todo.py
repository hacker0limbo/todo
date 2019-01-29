from models import Model


class Todo(Model):
    def __init__(self, form):
        super().__init__()
        self.id = form.get('id', None)
        self.title = form.get('title', '')
        self.completed = form.get('completed', False)

    @classmethod
    def update(cls, id, title):
        todos = cls.all()
        for t in todos:
            if t.id == id:
                t.title = title
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


