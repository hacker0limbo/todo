<template>
    <div id="app">
        <h1>Todo List</h1>
        <todo-list />
    </div>
</template>

<script>
// import TodoList from "./components/TodoList.vue";

module.exports = {
    components: {
        "todo-list": httpVueLoader("components/TodoList.vue")
    }
};
</script>

<style>
#app {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.4;
}

h1 {
    text-align: center;
}
</style>




