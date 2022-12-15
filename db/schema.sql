DROP DATABASE IF EXISTS employee_Tracker_db;

CREATE DATABASE employee_Tracker_db;

USE employee_Tracker_db;

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

-- varchar (30)- the number means its the length of the characters including special characters and spaces, etc.  

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    CONSTRAINT departmentfk FOREIGN KEY (department_id) REFERENCES department(id) 
);

-- up on the line above- the name of the CONSTRAINT is the departmentfk - which means department foreign key. 
-- CONSTRAINT - confirming that a matching department exists for this ID. Also its a limitation cuz you cannot add information if the same information is not in the other table. 

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT,
    CONSTRAINT role_idfk FOREIGN KEY 
    (role_id) REFERENCES role(id),
    CONSTRAINT manager_idfk FOREIGN KEY 
    (manager_id) REFERENCES employee(id) 
);