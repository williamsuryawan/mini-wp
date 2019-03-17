const baseURL = `http://localhost:3000`

function onSignIn(googleUser) {
    console.log("masuk sini google sign in")
    var profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("data yang dikirim: ", name, email, id_token)
      axios({
        method: 'post',
        url:`${baseURL}/users/login`,
        data: {
            id_token: id_token,
            name: name,
            email: email,
            loginVia: 'google'
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id)   
      }) 
      .catch((err) => {
        console.error(err)
      })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

let app = new Vue ({
    el: "#app",
    data: {
        isLogin: false,
        articleList :[],
        content: {},
        currentPage: 'homepage',
        
    },
    updated () {
        if(localStorage.getItem('token')){
            this.isLogin = true;

          } else {
            this.isLogin = false;

          }
    },

    methods: {
        changePage(input) {
            console.log("masuk ke changepage", input)
            this.currentPage = input
            console.log(this.currentPage)
        },
        successLogin () {
            this.isLogin = false;
            this.currentPage = 'homepage';
        },
        successRegister () {
            this.currentPage = 'homepage';
        },
        checkLoginUser () {
            if(localStorage.getItem('token')) {
                this.isLogin = true
            }
        },
        createArticle (input) {
            console.log("masuk ke create article", input)
            let formData = new FormData()
                formData.append('image', input.newFile)
                formData.append('title', input.newTitle)
                formData.append('status', input.newStatus)
                formData.append('text', input.newText)
            console.log("masuk ke axios create article", input)
            axios
                .post(`${baseURL}/articles/register`, formData,  {headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.token
                    }})
                .then(({data}) => {
                    console.log("Berhasil create:", data)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.currentPage = "articlebyuser"
                })
                .catch(error =>{
                    console.log("Terjadi error create:", error)

                })
        },
        fillContentforEdit(postId) {
            console.log("masuk ke fill content utk edit", postId)
            this.content = {}
            this.currentPage = 'edit'
            const editContent = this.articleList.filter(article => article._id === postId)[0]
            console.log("Hasil cari artikel untuk edit:", editContent)
            this.content.id = postId
            this.content.title = editContent.title
            this.content.text = editContent.text
            this.content.link = editContent.link
            console.log("Kirim ke form edit", this.content)
        },
        editArticle (input) {
            console.log("masuk ke edit article", input)
            let formData = new FormData()
                formData.append('image', input.editFile)
                formData.append('title', input.editTitle)
                formData.append('status', input.editStatus)
                formData.append('text', input.editText)
            console.log("masuk ke axios edit article", input, this.content.id)
            axios
                .put(`${baseURL}/articles/edit/${this.content.id}`, formData,  {headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.token
                    }})
                .then(({data}) => {
                    console.log("Berhasil edit:", data)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your article has been edited',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.currentPage = "articlebyuser"
                })
                .catch(error =>{
                    console.log("Terjadi error create:", error)

                })
        },
        deleteArticle (input) {
            console.log("masuk ke delete article", input)
            axios
                .delete(`${baseURL}/articles/delete/${input}`, {headers: {
                    token: localStorage.token
                }})
                .then(response => {
                    console.log("Berhasil delete:", response)
                    this.currentPage = "articlebyuser"
                })
                .catch(error =>{
                    console.log("Terjadi error delete article:", error)

                })
        }
    
    }
})