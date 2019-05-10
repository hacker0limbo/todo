<template>
    <div>
        <ul v-if="todos.length">
            <!-- 父组件可以监听子组件的事件, 比如这里的 remove 事件, complete 事件 -->
            <todo-list-item
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                @remove="removeTodo"
                @complete="completeTodo"
            />
        </ul>
        <p v-else>
            Nothing left in the list. Add a new todo in the input above.
        </p>
        <todo-list-input
            v-model="newTodoText"
            placeholder="New todo"
            @keydown.enter="addTodo"
            @add="addTodo"
        />
    </div>
</template>

<script>
// import BaseInputText from "./TodoListInput.vue";
// import TodoListItem from "./TodoListItem.vue";

let nextTodoId = 1;

module.exports = {
    components: {
        "todo-list-input": httpVueLoader("/components/TodoListInput.vue"),
        "todo-list-item": httpVueLoader("/components/TodoListItem.vue")
    },

    data() {
        return {
            newTodoText: "",
            todos: [
                {
                    id: nextTodoId++,
                    text: "Learn Vue",
                    done: false
                },
                {
                    id: nextTodoId++,
                    text: "Learn about single-file components",
                    done: true
                },
                {
                    id: nextTodoId++,
                    text: "Fall in love",
                    done: false
                }
            ]
        };
    },
    methods: {
        addTodo() {
            const trimmedText = this.newTodoText.trim();
            if (trimmedText) {
                this.todos.push({
                    id: nextTodoId++,
                    text: trimmedText,
                    done: false
                });
                this.newTodoText = "";
            }
        },
        removeTodo(idToRemove) {
            this.todos = this.todos.filter(todo => {
                return todo.id !== idToRemove;
            });
        },
        completeTodo(todo) {
            todo.done = !todo.done;
        }
    }
};
</script>
