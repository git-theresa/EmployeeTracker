DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employee_DB;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  salary  NOT NULL,
  department id INTEGER NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE  employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER
  PRIMARY KEY (id)
);



INSERT INTO department (name)
VALUES ("accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 75,000.00, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Philip", "Malone", 1, null);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Janice", "Ian", 2, 1);

