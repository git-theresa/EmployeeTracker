USE employee_DB;

INSERT INTO department (name)
VALUES ("accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 75,000.00, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Philip", "Malone", 1, null);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Janice", "Ian", 2, 1);
