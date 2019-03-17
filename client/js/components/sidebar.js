Vue.component('sidebar-section', ({
    props: ['isLogin'],

    created() {
        console.log('sidebar created');
    },
    methods: {
        logoutUser: function () {
            localStorage.removeItem('token');
            localStorage.removeItem('id')
            console.log('User signed out.');
            this.$parent.isLogin = false
        },
        getArticle() {
            let tokentogetarticle = localStorage.getItem('token')
            axios
                .get(`http://localhost:3000/articles/myarticle`, {headers: {token: tokentogetarticle}})
                .then(response => {
                    console.log("Berhasil get my article:", response.data)
                    this.$parent.currentPage = "articlebyuser"
                    this.$parent.articleList = response.data.data
                })
                .catch(error =>{
                    console.log("Terjadi error edit article:", error)

                })
        },
    },
    template: `    
    <div>
    {{isLogin}}   
    <div class="sidebar-heading-upper"> <b> User Register and Login: </b> </div>
        <div class="list-group list-group-flush" style="max-height: 200px; overflow-y: auto">
            <a href="#" class="list-group-item list-group-item-action bg-light" v-if="!$parent.isLogin" v-on:click.prevent="$emit('change-page', 'register')">Register</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" v-if="!$parent.isLogin" v-on:click.prevent="$emit('change-page', 'login')">Login</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" v-if="$parent.isLogin" v-on:click.prevent="logoutUser()">Logout</a>
        </div>
        <div class="sidebar-heading-lower" v-if="$parent.isLogin"> <b> Mini-WP Menu: </b> </div>
        <div class="list-group list-group-flush" style="max-height: 300px; overflow-y: auto" v-if="$parent.isLogin">
            <a href="#" class="list-group-item list-group-item-action bg-light" v-on:click.prevent="$emit('change-page', 'homepage')">Homepage</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" v-on:click.prevent="getArticle()">Show My Article</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Coming Soon</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Coming Soon</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Coming Soon</a>
        </div>
    </div>
    `
}))