<template>
    <div>
        <input type="text" :value="value" v-on="listeners" />
        <button @click="$emit('add')">Add</button>
    </div>
</template>

<script>
module.exports = {
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    computed: {
        listeners() {
            return {
                // 将原生事件绑定到组件
                // Pass all component listeners directly to input
                ...this.$listeners,
                // Override input listener to work with v-model
                input: event => this.$emit("input", event.target.value)
            };
        }
    }
};
</script>

<style scoped>
input {
    width: 80%;
    padding: 8px 10px;
    border: 1px solid blue;
}
</style>


