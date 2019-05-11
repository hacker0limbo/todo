<template>
    <div>
        <div>
            <todo-list-input
                v-model="newTodoText"
                placeholder="New todo"
                @keydown.enter="addTodo"
                @add="addTodo"
            />
        </div>
        <!-- 父组件可以监听子组件的事件, 比如这里的 remove 事件, complete 事件 -->
        <div v-if="todos.length">
            <todo-list-item
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                @remove="removeTodo"
                @complete="completeTodo"
            />
        </div>
        <p v-else>No todo in Todo List, please add new todo</p>
    </div>
</template>

<script>
// import BaseInputText from "./TodoListInput.vue";
// import TodoListItem from "./TodoListItem.vue";

module.exports = {
    components: {
        "todo-list-input": httpVueLoader("components/TodoListInput.vue"),
        "todo-list-item": httpVueLoader("components/TodoListItem.vue")
    },

    data() {
        return {
            newTodoText: "",
            todos: this.loadTodos()
        };
    },

    watch: {
        todos: {
            handler(newTodos, oldTodos) {
                // update id
                newTodos.forEach((todo, index) => {
                    todo.id = index;
                });
                todos = JSON.stringify(newTodos);
                window.localStorage.setItem("todos", todos);
            },
            // 使用 deep 进行深度监听
            deep: true
        }
    },

    methods: {
        addTodo() {
            const trimmedText = this.newTodoText.trim();
            if (trimmedText) {
                this.todos.push({
                    id: Number(this.todos.length),
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
        },
        loadTodos() {
            if (window.localStorage.getItem("todos") === null) {
                return [];
            }
            return JSON.parse(window.localStorage.getItem("todos"));
        }
    }
};
</script>
