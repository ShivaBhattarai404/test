class User{
    constructor(email, password, id){
        this.email = email;
        this.password = password;
    }
    login(){
        console.log("User logged in with "+this.email);
    }
}