const inquirer = require("inquirer")
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
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
    db.query('SELECT id, name FROM employee_Tracker_db.department;', (err, rows) => {
        // (err = means if there is an error its the first argument, rows = the name of the data returned)
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(rows);
        const addRoleQs = [{
            type: 'input',
            name: 'rolename',
            message: 'What is the role title?',
        }, {
            type: 'input',
            name: 'rolesalary',
            message: 'What is the role salary?',
        },
        {
            type: 'list',
            name: 'roledepartment',
            message: 'What is the department?',
            choices: rows
        }];

        inquirer.prompt(addRoleQs)
            .then(data => {
                console.table(data)
                console.table(rows)
                if (data.rolename) {
                    console.log(data.rolename, data.rolesalary, data.roledepartment)

                    // code below meaning - rows means returning data of the departments then in that department data - we are trying to find the index in the single (s)department that the user gave us + 1 - and the +1 means whatever is next. 
                    const departmentId = rows.findIndex(sDepartment => {
                        console.log(sDepartment.name, data.roledepartment)
                        return sDepartment.name == data.roledepartment
                    }) + 1;
                    console.log(departmentId)
                    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
                    const params = [data.rolename, data.rolesalary, departmentId]

                    db.query(sql, params, (err, rows) => {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        console.log('');
                        console.log('the role has been added')
                        init()
                    });
                }
            });
    });

}

function addEmployee() {
    db.query('SELECT id, title FROM employee_Tracker_db.role;', (err, roleRows) => {
        // (err = means if there is an error its the first argument, rows = the name of the data returned)
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(roleRows);
const roleNames = roleRows.map(
    individualRole => {
    return individualRole.title
    }
)
console.log("SUCCESS: ", roleNames)
        db.query('SELECT id, first_name, last_name FROM employee_Tracker_db.employee;', (err, employeeRows) => {
            const managerNames = employeeRows.map(
                managerRole => {
                return managerRole.first_name +' '+ managerRole.last_name
                }
            )
            console.log(managerNames)
            // NOTE: code below meaning (err = means if there is an error its the first argument, rows = the name of the data returned)
            if (err) {
                console.log(err)
                return;
            }
            console.log('');
            console.table(employeeRows);

            const addEmployeeQs = [{
                type: 'input',
                name: 'firstname',
                message: 'What is the employees first name?',
            }, {
                type: 'input',
                name: 'lastname',
                message: 'What is the employees last name?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employees role?',
                choices: roleNames
            },
            {
                type: 'list',
                name: 'employeemanager',
                message: 'Who is the employees manager?',
                choices: managerNames
            }

            ];

            inquirer.prompt(addEmployeeQs)
                .then(data => {
                    console.table(data)
                    console.table(roleRows)
                    console.table(employeeRows)
                    const roleId = roleRows.findIndex(singleRole => {
                        console.log(singleRole, data.role)
                        return singleRole.title == data.role
                    }) + 1;
                    const managerId = employeeRows.findIndex(singleEmployee => {
                        console.log(singleEmployee, data.employeemanager)
                        return singleEmployee.first_name + " " + singleEmployee.last_name == data.employeemanager
                    }) + 1;

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                    const params = [data.firstname, data.lastname, roleId, managerId]

                    db.query(sql, params, (err, rows) => {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        console.log('');
                        console.log('the employee has been added')
                        init()
                    });
                    

                    
                    // stopped here last time.
            
                })

        })
    })
}

function addDepartment() {

    const addDepartmentQs = [{
        type: 'input',
        name: 'departmentname',
        message: 'What is the department name?'
    },
    ];
    inquirer.prompt(addDepartmentQs)
        .then(data => {
            if (data.departmentname) {
                console.log(data.departmentname)
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

// TODO: 1.) read all the roles available, 2.) do an inquirer to display which role will be updated
// 3.) User will select the role title and find the role ID from that role title 4.) ask the user what is the role title, role salary and department name. 5.) then we have to update the role table for that role id
function updateEmployeeRole() {
    const sql = 'select id, title from role;';

    db.query(sql, (err, roleRows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('');
        console.table(roleRows);
        const roleNames = roleRows.map(
            individualRole => {
            return individualRole.title
            });

            const updateEmployeeRoleQs = [{
                type: 'list',
                name: 'roletitle',
                message: 'Which employee role are you updating?',
                choices: roleNames
            }]
            inquirer.prompt(updateEmployeeRoleQs)
            .then(data => {
                const updateroleId = roleRows.findIndex(singleRole => {
                    return singleRole.title == data.roletitle
                }) + 1;

                db.query('SELECT id, name FROM employee_Tracker_db.department;', (err, rows) => {
                    // (err = means if there is an error its the first argument, rows = the name of the data returned)
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log('');
                    console.table(rows);
                    const addupdateRoleQs = [{
                        type: 'input',
                        name: 'rolename',
                        message: 'What is the new role title?',
                    }, {
                        type: 'input',
                        name: 'rolesalary',
                        message: 'What is the new role salary?',
                    },
                    {
                        type: 'list',
                        name: 'roledepartment',
                        message: 'What is the department?',
                        choices: rows
                    }];
            
                    inquirer.prompt(addupdateRoleQs)
                        .then(data => {
                          
                            if (data.rolename) {
                             
                                const departmentId = rows.findIndex(sDepartment => {                                   
                                    return sDepartment.name == data.roledepartment
                                }) + 1;
                                
                                const sql = `update employee_Tracker_db.role
                                SET title = ?, salary = ?, department_id = ? where id= ?;`;
                                const params = [data.rolename, data.rolesalary, departmentId, updateroleId]
            
                                db.query(sql, params, (err, rows) => {
                                    if (err) {
                                        console.log(err)
                                        return;
                                    }
                                    console.log('');
                                    console.log('the role has been updated')
                                    init()
                                });
                            }
                        });
                });
            


            });   
    });
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

// var arr = [
//     {
//         favorite: "taco",
//     notFavorite: "mushrooms"
//     },
//     {
//         favorite: "pizza",
//     notFavorite: "soggy bread"
//     },
//     {
//         favorite: "lasagna",
//     notFavorite: "dry noodles"
//     },
// ]

// const phillip = arr.map(tacocat => {
//     return tacocat.favorite
// })
// console.log(arr)
// console.log(phillip)