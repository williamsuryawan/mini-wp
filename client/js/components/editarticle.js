Vue.component('edit-article', {
    props: ['content'],
    created() {
        console.log('edit form shown');
    },
    template: `
    <div>
        <form v-on:submit.prevent="submitEditArticle()">
            <div class="form-group row">
                <label for="inputTitle" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="content.title" id="inputTitle">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputCategory" class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="content.status" id="inputCategory">
                </div>
            </div>
            <div>
                <wysiwyg v-model="content.text" />
            </div>
            <div class="form-group mx-auto" style="width: 50%">
                  <label for="exampleInputFile">Upload Your Article Photo Here</label>
                  <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" required/>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Edit</button>
                </div>
            </div>
        </form>
    </div>
    `,
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data () {
        return {
            content: {},
            editTitle: '',
            editStatus: '',
            text: '',
            editFile: ''
        }
    }, 
    methods: {
        submitEditArticle () {
            Swal.fire({
                title: 'Finish edit your article?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                    console.log("Data edit dikirim:", {editTitle: this.content.title, editStatus: this.content.status, editText: this.content.text, editFile: this.editFile})
                    this.$emit('submit-editarticle', {editTitle: this.content.title, editStatus: this.content.status, editText: this.content.text, editFile: this.editFile})
                    Swal.fire(
                    'Success!',
                    'Your file has been edited.',
                    'success'
                  )
                }
              })
            
            
        },
        handleFileUpload(event) {
            // this.file = event.file.files[0]
            console.log("masuk file upload", this.$refs.file)
            this.editFile = this.$refs.file.files[0];
        }
    } 
})