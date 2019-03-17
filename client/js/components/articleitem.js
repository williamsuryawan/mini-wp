Vue.component('article-item', {
    props: ['article'],
    data() {
      return {
        fbSharelink: `https://www.facebook.com/sharer/sharer.php?u=`,
               last: '&amp;src=sdkpreparse%2F&amp;src=sdkpreparse'
      }
    },
    methods: {
      getlink(){
        // console.log(this.fbSharelink + this.video.link + this.last)
        return this.fbSharelink + this.video.link + this.last
      },
      editPost(id){
        console.log("masuk ke emit edit post", id)
        this.$emit('show-editpage', id);
      },
      removePost(id){
        this.$emit('remove-post', id);
      }
    },
    created() {
      console.log('article-item created');
    },
  
    template: `
    <ul>
    <li style="list-style-type:none">
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
    </li>
    </ul>
    `,
  });
  