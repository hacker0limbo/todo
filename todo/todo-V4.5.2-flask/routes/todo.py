from flask import (
    render_template,
    request,
    flash,
    url_for,
    Blueprint,
)

todo = Blueprint('todo', __name__)

