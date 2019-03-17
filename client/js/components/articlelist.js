Vue.component('article-byuser', {
    props: ['articlelist'],
    created() {
        console.log('article-list shown');
    },
    methods: {
        editPost(id){
          console.log("masuk ke emit edit post", id)
          this.$emit('show-editpage', id);
        },
        removePost(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    console.log("masuk ke emit remove post", id)
                    this.$emit('remove-post', id);
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
            
        }
    },
    template: `
    <ul>
    <li style="list-style-type:none">
        <div v-for="article in articlelist" v-bind:article="article">
        <div class="container col-12" style="background-color: rgb(209, 209, 209); color: black; padding:10px">    
            <div class="row">
                <div class="col-sm-7" style="padding:20px">
                    <a href="#">
                    <h5>{{article.title}}</h5></a>
                    <h6>Created at: {{article.createdAt}}</h6>
                </div>
                <div class="col-sm-2">
                    <img v-bind:src="article.link" width="130" height="100">
                </div>
                <div class="col-sm-3" style="padding:30px">
                    <a href="#" class="btn btn-primary" id="edit_button" v-on:click="editPost(article._id)">Edit</a>
                    <a href="#" class="btn btn-primary" id="delete_button" v-on:click="removePost(article._id)">Delete</a>
                </div>   
            </div>
        </div>

        </div>
    </li>
    </ul>
    `
})