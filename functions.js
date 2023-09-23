import { todos, nextAction, questions } from "./index.js";
import inquirer from "inquirer";
import chalk from "chalk";
export const addTodo = async (text, done = false) => {
    const todo = { text, done };
    todos.push(todo);
    console.log(chalk.grey(`\nYou have added "${text}" to your tasks.\n`));
    await nextAction();
};
export const listTodos = async () => {
    if (todos.length === 0) {
        console.log('\nNo tasks found. Please add a task first.\n');
    }
    todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task.text}    ${task.done ? chalk.green('[ ✔ ]') : chalk.redBright('[pending]')} `);
    });
    // counting how many tasks are done and how many are left
    const done = todos.filter((todo) => todo.done).length;
    const left = todos.length - done;
    console.log(chalk.grey(`\nYou have ${done} completed and ${left} pending tasks.\n`));
    await nextAction();
};
export const updateDoneStatus = async () => {
    const { index } = await inquirer.prompt([questions[4]]);
    todos[index].done = !todos[index].done;
    console.log(chalk.grey(`\nTask ${index + 1} has been marked as ${todos[index].done ? 'done' : 'pending'}.\n`));
    await nextAction();
};
export const deleteTodo = async (index) => {
    // splice the todos array at the given index
    const deleted = todos.splice(index, 1)[0];
    console.log(chalk.grey(`\nYou have deleted "${deleted.text}" from your tasks.\n`));
    await nextAction();
};
export const quit = () => {
    console.log(chalk.bgRed.bold('\nThank you for using Todo List App. Goodbye!\n'));
    // exit the process
    process.exit(0);
};
