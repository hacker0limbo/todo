<template>
    <div :class="{ done: todo.done }">
        <!-- 父级组件监听该方法, 这里的 complete, remove
        子组件通过 emit 触发这些事件, 并且向父组件抛出参数, 这里的 todo, todo.id -->
        <input
            type="checkbox"
            @change="$emit('complete', todo)"
            :checked="todo.done"
        />
        {{ todo.text }}
        <button
            @click="$emit('remove', todo.id)"
            class="btn btn-outline-primary btn-sm"
        >
            X
        </button>
    </div>
</template>

<script>
module.exports = {
    // props 里面传进来的 todo
    props: {
        todo: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
div {
    border: 1px solid lightblue;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
}
.done {
    text-decoration: line-through;
    color: grey;
}

button {
    float: right;
    margin-top: -4px;
}
</style>
