const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const fs = require('fs');
const generateHtml = require('./util/generateHtml')
const team = [];

// prompts user for information on Manager first
function addManager() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the Manager's name?",
        type: "input",
      },
      {
        name: "id",
        message: "What is the id number?",
        type: "input",
      },
      {
        name: "email",
        message: "What is the email?",
        type: "input",
      },
      {
        name: "officeNumber",
        message: "What is their office number?",
        type: "number",
      },
    ])
    // logs answers into an array
    .then((answers) => {
      console.log(answers);
      const man = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      team.push(man);
   
      nextEmployee();
    });
}

// adds team memebers based on user answers 
function addTeamMember() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "list",
        choices: ["Add an Engineer", "Add an Intern"],
      },
    ])
    .then((answers) => {
      switch (answers.role) {
        case "Add an Engineer":
          console.log("add engineer!");
          addEngineer();
          break;

        case "Add an Intern":
          console.log("add intern!");
          addIntern();
          break;
      }
    });
}

// continue or stop adding team memebers
function nextEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Enter a new employee?",
        name: "next",
        choices: ["yes", "no"],
      },
    ])
    .then((ans) => {
      if (ans.next === "yes") {
        addTeamMember();
      } else {
        console.log(team);
        fs.writeFileSync('index.html', generateHtml(team), (err) =>
        err ? console.error(err) : console.log('team posted!'))
      }
    });
}

// adds engineer information
function addEngineer() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the employee's name?",
        type: "input",
      },
      {
        name: "id",
        message: "What is the id number?",
        type: "input",
      },
      {
        name: "email",
        message: "What is the email?",
        type: "input",
      },
      {
        name: "github",
        message: "What is their github username?",
        type: "input",
      },
    ])
    .then((answers) => {
      console.log(answers.name);
      const eng = new Engineer(answers.name, answers.id, answers.email, answers.github);
      team.push(eng)
      console.log(team);

      nextEmployee();
    });
}

// adds intern information
function addIntern() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the employee's name?",
        type: "input",
      },
      {
        name: "id",
        message: "What is the id number?",
        type: "input",
      },
      {
        name: "email",
        message: "What is the email?",
        type: "input",
      },
      {
        name: "school",
        message: "What school do they go to?",
        type: "input",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const int = new Intern(answers.name, answers.id, answers.email, answers.school);
      team.push(int)
      console.log(team);

      nextEmployee();
    });
}

addManager();


