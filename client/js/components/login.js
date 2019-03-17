Vue.component('login-page', ({
    props: ['currentPage'],
    template: `
    <div class="container-fluid">
        <h3>Please login using your detail</h3>

        <form v-on:submit.prevent="loginUser">
            <div class="form-group row">
                <label for="loginEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="email"
                        placeholder="Your Email for Login Here">
                </div>
            </div>
            <div class="form-group row">
                <label for="loginPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" v-model="password"
                        placeholder="Your Password for Login Here">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-5">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>

            </div>
        </form>
    </div>
    `,

    data () {
        return {
            email: '',
            password: ''
        }
    },
    mounted () {
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          }
    },
    methods: {
        loginUser: function() {
            console.log("masuk login")
            let loginUser = {
                email: this.email,
                password: this.password,
                loginVia: 'website'
            }
            console.log(loginUser)
            
            axios
                .post(`${baseURL}/users/login`, loginUser)
                .then(response => {
                    console.log("Berhasil login:", response)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('id', response.data.id)
                    this.$emit('success-login')
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Login is success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
                .catch(error =>{
                    console.log("Terjadi error login:", error)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'login is not success, your email/password might be wrong',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        },
        onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            axios
                .post(`${baseURL}/users/login`, {
                    id_token: id_token,
                    loginVia: 'google'})
                .then(response => {
                    console.log("Berhasil login via google:", response)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('id', response.data.id)
                    this.$emit('success-login')
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Login via login is success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
                .catch(error =>{
                    console.log("Terjadi error login:", error)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'login via Google is not success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
    }
}))