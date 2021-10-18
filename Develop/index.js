// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const fs = require('fs');
const generateHtml = require('./util/generateHtml')
const team = [];

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
    .then((answers) => {
      console.log(answers);
      const man = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      team.push(man);
   
      nextEmployee();
    });
}
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


