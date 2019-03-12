const baseURL = "http://localhost:4000"
new Vue ({
    el: "#app",
    data: {
        users: [],
        newEmail: '',
        newPassword : '',
        loginEmail: '',
        loginPassword: '',
        isLogin: false,
        currentPage: 'homepage',
    },
    mounted () {
        $('#summernote').summernote({
            placeholder: 'Put your article here',
            tabsize: 2,
            height: 100
        });
    },
    methods: {
        registerClick: function() {
            this.currentPage = 'registerPage'
        },
        loginClick:function () {
            this.currentPage = 'loginPage'
        },
        registerNewUser: function() {
            console.log('masuk')
            let newUser = {
                email: this.newEmail,
                password: this.newPassword
            }
            console.log(newUser)
            
            axios
                .post(`${baseURL}/users/register`, newUser)
                .then(response => {
                    console.log("Berhasil register:", response)
                    this.currentPage='RegisterSuccessPage'
                })
                .catch(error =>{
                    console.log("Terjadi error register:", error)
                })
        },
        loginUser: function() {
            console.log("masuk login")
            let loginUser = {
                email: this.loginEmail,
                password: this.loginPassword,
                loginVia: 'website'
            }
            console.log(loginUser)

            axios
                .post(`${baseURL}/users/login`, loginUser)
                .then(response => {
                    console.log("Berhasil login:", response)
                    localStorage.setItem('token', response.data.token)
                    this.loginEmail =''
                    this.loginPassword =''
                    this.isLogin = true
                    this.currentPage='homepage'
                })
                .catch(error =>{
                    console.log("Terjadi error login:", error)
                })
        },
        logoutUser: function () {
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     localStorage.removeItem('token');
            //     console.log('User signed out.');
            //     isLogin(false)
            // });
            localStorage.removeItem('token');
            console.log('User signed out.');
            this.isLogin = false
        }
    }
})