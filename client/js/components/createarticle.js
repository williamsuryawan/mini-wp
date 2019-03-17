Vue.component('create-article', {
    template: `
    <div>
        <form v-on:submit.prevent="submitNewArticle()">
            <div class="form-group row">
                <label for="inputTitle" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="newTitle" id="inputTitle" placeholder="Title Here">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputCategory" class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="newStatus" id="inputCategory"
                        placeholder="Category Here">
                </div>
            </div>
            <div>
                <wysiwyg v-model="text" />
            </div>
            <div class="form-group mx-auto" style="width: 50%">
                  <label for="exampleInputFile">Upload Your Article Photo Here</label>
                  <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" required/>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Post</button>
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
            newTitle: '',
            newStatus: '',
            text: '',
            newFile: ''
        }
    }, 
    methods: {
        submitNewArticle () {
            this.$emit('submit-newarticle', {newTitle: this.newTitle, newStatus: this.newStatus, newText: this.text, newFile: this.newFile})
        },
        handleFileUpload(event) {
            // this.file = event.file.files[0]
            console.log("masuk file upload", this.$refs.file)
            this.newFile = this.$refs.file.files[0];
        }
    } 
})