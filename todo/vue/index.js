import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App: httpVueLoader('App.vue')
    }
})