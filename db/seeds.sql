INSERT INTO department (name)
VALUES (`Human Resources`), (`English`), (`Engineering`), (`Creative`), (`Media`);


INSERT INTO role (title, salary, department_id)
VALUES (`HR Manager`, `50000.00`, `1`), (`Head English Manager`, `50000.00`, `2`), (`Senior Engineer`, `60000.00`, `3`), (`Creative Writer`, `60000.00`, `4`), (`Media Manager`, `60000.00`, `5`);

-- same thing for employees below- when I write the role_id its the same info as the other tables thats referencing that department/employee. the manager_id I make up an ID number that has to follow the foundation of the id table. the number has to exist. 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (`Sophia`, `Smith`, `1`, `1`), (`George`, `Meadows`, `2`, `2`), (`Sally`, `Luna`, `3`, `3`), (`Andrew`, `Botti`, `4`, `4`),  (`Melody`, `Young`, `5`, `5`);

