
const taskComparator = (taskA, taskB) => {
   
    if (taskA.priority !== taskB.priority) {
        return taskA.priority - taskB.priority; 
    }
    const dateA = new Date(taskA.dueDate).getTime();
    const dateB = new Date(taskB.dueDate).getTime();
    return dateA - dateB; 
};

module.exports = taskComparator;