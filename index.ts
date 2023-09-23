import inquirer from "inquirer";
import { addTodo, listTodos,updateDoneStatus, deleteTodo, quit } from "./functions.js";
import showBanner from "node-banner";
import chalk from "chalk";
import gradient from "gradient-string";

export interface Todo {
    text: string;
    done: boolean;
}

export let todos: Todo[] = [];

export const questions = [
    {
        name: 'text',
        type: 'input',
        // message: chalk.black.bgRed.bold('What task do you want to add?'),
        message: gradient.teen('What task do you want to add?'),
    },
    {
        name: 'done',
        type: 'confirm',
        message: gradient.passion('Is this task done?'),
        default: false,
    },
    {
        name: 'action',
        type: 'list',
        message: gradient.atlas('What do you want to do next?'),
        choices: ['Add task', 'List all tasks','Update done status', 'Delete a task', 'Quit'],
    },
    {
        name: 'index',
        type: 'list',
        message: gradient.teen('Which task do you want to delete?'),
        choices: () => {
            if (todos.length === 0) {
                console.log('No tasks found. Please add a task first.');
                return [];
            }
            return todos.map((todo, index) => {
                return {
                    name: `${index + 1}. ${todo.text}    ${todo.done ? chalk.green('[ ✔ ]') : chalk.redBright('[pending]')}`,
                    value: index
                }
            });
        }
    },
    {
        name: 'index',
        type: 'list',
        message: gradient.teen('Which task do you want to Update?'),
        choices: () => {
            if (todos.length === 0) {
                console.log('No tasks found. Please add a task first.');
                return [];
            }
            return todos.map((todo, index) => {
                return {
                    name: `${index + 1}. ${todo.text}    ${todo.done ? chalk.green('[ ✔ ]') : chalk.redBright('[pending]')}`,
                    value: index
                }
            });
        }
    }
];

const addTaskFirst =async () => {
    const {text,done} = await inquirer.prompt([questions[0],questions[1]]);
    await addTodo(text,done);
}

export const nextAction = async () => {

    const { action } = await inquirer.prompt([questions[2]]);

    switch (action) {
        case 'Add task':
            const { text, done } = await inquirer.prompt([questions[0], questions[1],]);
            await addTodo(text, done);
            break;
        case 'List all tasks':
            await listTodos();
            break;
        case 'Update done status':
            if (todos.length === 0) {
                console.log('No tasks found. Please add a task first.');
                await nextAction(); // Show options again
            } else{
                await updateDoneStatus();
            }
            break;
        case 'Delete a task':
            if (todos.length === 0) {
                console.log('No tasks found. Please add a task first.');
                await nextAction(); // Show options again
            } else {
                const { index } = await inquirer.prompt([questions[3]]);
                await deleteTodo(index);
            }
            break;
        case 'Quit':
            quit();
            break;
        default:
            break;
    }
};


(async () => {
    await showBanner('Todo-List', 'This todo-list can add, list, update, delete and update your tasks.\n');
})();

const todoList =async () => {
    await addTaskFirst();
    nextAction();
}
 
setTimeout(() => {
    todoList();
}, 500);
