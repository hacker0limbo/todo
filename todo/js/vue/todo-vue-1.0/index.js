new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App: httpVueLoader('App.vue')
    }
})