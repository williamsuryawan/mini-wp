# mini-wp

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/

#### Information for Login in Front End (Optional)
email= william1@gmail.com
<br>
password= 1234


### Route
Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login | POST | loginVia ('google' OR 'website') | loginVia website: <br> email: String(**Required**), <br> password: String(**Required**) | Error: <br> Wrong username/password (fail login via website) <br> Success: <br> get a signin token <br> automatic signup if the user haven't signup (via google) | Login miniWP
/users/register| POST | register via website | name:String(**Required**) <br> email:String(**Required**) <br> password:String(**Required**) <br> | Error: <br> Wrong email format <br> name, email, password (**Required**) <br> Success: <br> register new user | Register new user to miniWP 
/upload | POST | Content-Type: application/form-data | image:File(**Required**) | Error: <br> size is too large <br> Max Size 5 MB <br> Success: <br> upload photo success | upload photo to Google Cloud Storage
/articles/myarticle | GET | login token (**Required**) | | Error: <br> Internal Server Error <br> Success: <br> articles success listed | Get all articles of a logged user
/articles/register | POST | login token (**Required**) | title:String (**Required**) <br> status:COMPLETE/INCOMPLETE (**Required**)  <br> text:String (**Required**) <br> picture:File (**Required**) | Error: <br> Internal server error <br> Success: <br> Create new articles | Create an article
/articles/edit/:id | PUT | login token (**Required**) <br> req.params.id(**Required**) | title:String (**Required**) <br> status:COMPLETE/INCOMPLETE (**Required**)  <br> text:String (**Required**) <br> picture:File (**Required**) | Error: <br> Internal server error <br> Success: <br> Update articles | Edit the existing article
/articles/delete/:id | DELETE | login token (**Required**) <br> req.params.id(**Required**) | | Error: <br> Internal server error <br> Success: <br> Delete articles | Delete the article


### Usage
command |
------- |
$ npm install |
$ npn start |
$ live-server --host=localhost |

