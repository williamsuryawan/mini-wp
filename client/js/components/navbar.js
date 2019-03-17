Vue.component('navbar-section', ({
    props: ['isLogin'],
    template: `
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div class="container col-sm-12" style="background-color:#7ae2f9; color: black">
            <div class="col-2">
                <img src="https://s.w.org/style/images/about/WordPress-logotype-standard.png" height="70">
            </div>
            <div class="col-7" style="padding:20px">
                <center>Welcome</center>
            </div>
            <div class="col-1" style="padding:20px" v-if="$parent.isLogin">
                <button class="btn btn-primary" id="create_button" v-on:click.prevent="$emit('change-page', 'create')">Create</button>
            </div>
            <div class="col-2" style="padding:13px">
                <div class="dropdown">
                    <a class="btn dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        My Account
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">My Profile</a>
                        <a class="dropdown-item" href="#">My Blogs</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Log Out</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `
}))