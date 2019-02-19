import time
from models import db
from utils import current_time


class Todo(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    completed = db.Column(db.Boolean)
    ct = db.Column(db.Integer)
    ut = db.Column(db.Integer)

    def __init__(self, form):
        self.title = form.get('title', '')
        self.completed = False
        self.ct = int(time.time())
        self.ut = self.ct

    @classmethod
    def add(cls, todo):
        db.session.add(todo)
        db.session.commit()

    @classmethod
    def delete(cls, id):
        todo = cls.query.get(id)
        todo.completed = True
        db.session.commit()

    @classmethod
    def update(cls, id, title):
        todo = cls.query.get(id)
        todo.title = title
        db.session.commit()

    def format_time(self):
        return current_time(self.ct)