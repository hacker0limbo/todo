<template>
    <li :class="{ done: todo.done }">
        <!-- 父级组件监听该方法, 这里的 complete, remove
        子组件通过 emit 触发这些事件, 并且向父组件抛出参数, 这里的 todo, todo.id -->
        <input
            type="checkbox"
            @change="$emit('complete', todo)"
            :checked="todo.done"
        />
        {{ todo.text }}
        <button @click="$emit('remove', todo.id)">
            Remove
        </button>
    </li>
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
li {
    list-style-type: none;
}

.done {
    text-decoration: line-through;
    color: grey;
}
</style>
