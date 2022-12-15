const inquirer = require("inquirer")
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'testing',
        // TODO: Add MySQL password here
        password: 'abcd12345',
        database: 'employee_Tracker_db'
    },
    console.log(`Connected to the employee_Tracker_db database.`)
    );

  

// start with that, have one main prompt to select which option the user wishes to use, then call that function

const addorviewOptions = [{
    type: 'list',
    name: 'selection',
    message: 'What would you like to do?',
    choices: ['add a role', 'add an employee', `add a department`, `update an employee role`, `view all departments`, `view all roles`, `view all employees`]
},
];


function init() {
    inquirer.prompt(addorviewOptions)
        .then(data => {
            console.log(data)
            if (data.selection === 'add a role') {
                console.log('add a role') 
                addRole()
            } 
            if (data.selection === 'add an employee') {
                console.log('add an employee')
                addEmployee()
            }
            if (data.selection === 'add a department') {
                console.log('add an department')
                addDepartment()
            }
            if (data.selection === 'view all departments') {
                console.log('view all departments')
                viewDepartment()
            }
            if (data.selection === 'view all roles') {
                console.log('view all roles')
                viewRoles()
            }
            if (data.selection === 'view all employees') {
                console.log('view all employees')
                viewEmployees()
            }
            if (data.selection === 'update an employee role') {
                console.log('update an employee role')
                updateEmployeeRole()
            }
        })
}


const departmentchoiceQuestions = [{
    type: `list`,
    name: `selection`,
    message: `Choose Department`,
    choices: [`Human Resources`, `Media`, `Engineering`, `English`, `Creative`,]
}];

function addRole() {

    const addRoleQs= [{
        type: 'input',
        name: 'rolename',
        message: 'What is the role title?', 
    },{
        type: 'input',
        name: 'rolesalary',
        message: 'What is the role salary?', 
    },
    {
        type: 'list',
        name: 'roledepartment',
        message: 'What is the department?',
        choices: [`Human Resources`, `Media`, `Engineering`, `English`, `Creative`,]
    }];
    inquirer.prompt(addRoleQs)
        .then(data => {
            if (data.rolename){
                console.log (data.rolename,data.rolesalary, data.roledepartment)
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
                const params = [data.rolename]
            
                // db.query(sql, params, (err, rows) => {
                //     if (err) {
                //         console.log(err)
                //         return;
                //     }
                //     console.log('');
                //     console.log('the role has been added')
                //     init()
                // });
                init();
            }
        });

    // TO DO: Do the same code routine as I did in the add department function except different question and different information from the department table- , department name and id - get this information before you do the inquirer
    // init()
}

function addEmployee() {

    console.log('addEmployee')
    init()
}

function addDepartment() {

    const addDepartmentQs= [{
        type: 'input',
        name: 'departmentname',
        message: 'What is the department name?'
    },
    ];
    inquirer.prompt(addDepartmentQs)
        .then(data => {
            if (data.departmentname){
                console.log (data.departmentname)
                const sql = `INSERT INTO department (name) VALUES (?)`;
                const params = [data.departmentname]
            
                db.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log('');
                    console.log('the department has been added')
                    init()
                });
            }
        });
}

function viewDepartment() {
    const sql = 'SELECT id, name FROM employee_Tracker_db.department;';
    // db means its connecting to the database
    // the code below meaning: database is executing the query, in the parantheses (sql) the code is saying which query is gonna execute and its sql.
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(rows);
        init()
    });
  
}

function viewRoles() {
    const sql = 'select role.title, role.id, role.salary, department.name as department_name from role join department ON role.department_id=department.id;';
    // the join function in the mysql is used to connect with 2 tables in a single column in this case
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(rows);
        init()
    });
}

function viewEmployees() {

    const sql = 'select employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, ManagerT.first_name as managers_name from employee join role ON employee.role_id=role.id join department ON role.department_id=department.id left join employee ManagerT ON employee.manager_id=ManagerT.id;';
    
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(rows);
        init()
    });
}


function updateEmployeeRole() {

    console.log('updateEmployeeRole')
    init()
}
// init means that its running the function earlier

// **** WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role


// let Manager_1 = new Manager(data.Id, data.name, data.email, data.officenumber);
//             // we are using the class of Manager to make a Manager_1
//             // this is where our array is getting populated.
//             console.log(data)
//             console.log(Manager_1)
//             employeeStorage.push(Manager_1);
//             console.log("Employee Storage: ", employeeStorage);
//             questionchoices();
//         })
// }

// // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// // WHEN I choose to view all departments
// // THEN I am presented with a formatted table showing department names and department ids
// // WHEN I choose to view all roles

// const managerQuestions = [{
//     type: 'input',
//     name: 'name',
//     message: 'What is your name',
// },
// {
//     type: 'input',
//     message: 'What is your ID?',
//     name: 'Id',
// },
// {
//     type: 'input',
//     message: 'What is your email?',
//     name: 'email',
// },
// {
//     type: 'input',
//     message: 'What is your office number?',
//     name: 'officenumber',
// },
// ];

// const selectQuestions = [{
//     type: 'list',
//     name: 'selection',
//     message: 'Add an engineer or add an intern or exit',
//     choices: ['intern', 'engineer', `exit`]
// },

// ];

init()