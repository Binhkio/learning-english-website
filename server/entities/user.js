class User {
    constructor(param) {
        this.name = param.name;
        this.email = param.email;
        this.password = param.password;
        this.role = param.role;
        this.status = param.status;
    }
}

module.exports = User;
