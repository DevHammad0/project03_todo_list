import inquirer from "inquirer";
const todos = [
    { text: 'HSC', done: true },
    { text: 'Assignment', done: false }
];
const choices = todos.map((todo, index) => {
    return {
        name: `${index + 1}. ${todo.text} (${todo.done ? 'done' : 'not done'})`,
        value: index
    };
});
inquirer
    .prompt([
    {
        type: 'list',
        name: 'taskToDelete',
        message: 'Which task do you want to delete?',
        choices
    }
])
    .then((answers) => {
    const { taskToDelete } = answers;
    todos.splice(taskToDelete, 1);
    console.log(`Task ${taskToDelete + 1} has been deleted.`);
    console.log(todos);
});
