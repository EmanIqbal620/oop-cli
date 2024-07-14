#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<======================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===============>>>  ${chalk.bold.hex("#9999FF")(`Welcome To 'CodeWithEman' OOP CLI Project  <<<================>>>`)}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<======================================================\n`));

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const person = new Person();

const printSeparator = () => {
    console.log(chalk.yellow('<<<------------------------------>>>'));
};

const programStart = async (persons: Person) => {
    do {
        console.log(chalk.cyan("Welcome"));
        printSeparator();
        
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.blue("Whom would you like to interact with?"),
            choices: ["staff", "student", "exit"]
        });

        if (ans.select === "staff") {
            console.log(chalk.green("You approach the staff room. Please feel free to ask any question."));
        } else if (ans.select === "student") {
            const studentAns = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.blue("Enter the student's name you wish to engage with:")
            });
            const student = person.students.find(val => val.name === studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                person.addStudent(newStudent);
                console.log(chalk.green(`Hello, I am ${newStudent.name}. Nice to meet you!`));
                console.log(chalk.yellow("New student added"));
                printSeparator();
                console.log(chalk.magenta("Current student list:"));
                person.students.forEach(st => console.log(chalk.magenta(st.name)));
            } else {
                console.log(chalk.green(`Hello, I am ${student.name}. Nice to see you again!`));
                printSeparator();
                console.log(chalk.magenta("Existing student list:"));
                person.students.forEach(st => console.log(chalk.magenta(st.name)));
            }
        } else if (ans.select === "exit") {
            console.log(chalk.red("Exiting the program..."));
            process.exit();
        }

        printSeparator();

    } while (true);
};

programStart(person);
