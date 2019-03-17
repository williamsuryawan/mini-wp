
Vue.component('register-page', ({
    props: ['currentPage'],
    template: `
        <div class="container-fluid" v-if="currentPage='register'">
            <h3>Please register your detail</h3>
            <form v-on:submit.prevent="registerNewUser" >
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="name"
                            placeholder="Your Name Here">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="newEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" v-model="newEmail"
                            placeholder="Your New Email Here">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="newPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" v-model="newPassword"
                            placeholder="Your New Password Here">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>
                </div>
            </form>
        </div>
    `,

    data () {
        return {
            name: '',
            newEmail: '',
            newPassword: ''
        }
    },
    methods: {
        registerNewUser: function() {
            console.log('masuk register')
            let newUser = {
                name: this.name,
                email: this.newEmail,
                password: this.newPassword
            }
            console.log("new user for register", newUser)
            
            axios
                .post(`${baseURL}/users/register`, newUser)
                .then(response => {
                    console.log("Berhasil register:", response)
                    this.currentPage='RegisterSuccessPage'
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Register is success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error =>{
                    console.log("Terjadi error register:", error)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Register is not success, please try again.',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
    }
}))