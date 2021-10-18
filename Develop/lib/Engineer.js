// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// github—GitHub username
// getGithub()
// getRole()—overridden to return 'Engineer'
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name,id,email,github){
    super(name,id,email);
    this.github = github;
    }
    getGithub(){
        return (this.github)
    }
    getRole(){
        return 'Engineer'
    }
}

// getGithub=
module.exports = Engineer;