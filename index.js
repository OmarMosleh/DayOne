program.parse(process.argv);
const fs = require('fs');
const { program } = require('commander');

// Load the existing tasks from JSON
const stringifiedTasks = fs.readFileSync('./myJSON.json');
const tasks = JSON.parse(stringifiedTasks);
const UpdatedTask = (tasks) => {fs.writeFileSync('./myJSON.json', JSON.stringify(tasks, null, 2));};


// my functions 
const addNewTask = (options)=>{
  const {name, status}= options;
  tasks.push({
    id: Date.now(),
    name,
    status,
  });
  UpdatedTask(tasks);
}

const deleteTask = (id)=>{
  const filteredTasks = tasks.filter((task)=> task.id !== +id);
  UpdatedTask(filteredTasks)
}
// Define CLI commands
program
  .command('add')
  .description('Add a new task to the list')
  .option('-n, --name <string>', 'task name')
  .option('-s, --status <string>', 'task status')
  .action((options) => {
    addNewTask(options)
  });

program
  .command('list')
  .description('List all tasks')
  .action(() => {
      console.log(tasks);
    });
  

program
  .command('remove <index>')
  .description('Remove a task from the list')
  .argument('<number>','id of task')
  .action((id) => {
    deleteTask(id)
  });



