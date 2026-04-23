const Task = require('../models/Task');

const taskComparator = require('../utils/priorityComparator');
const PLACEHOLDER_USER_ID = '666666666666666666666666';
 

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body; 
        if (!title || !priority || !dueDate) {
            return res.status(400).json({ 
                message: 'Title, Priority, and Due Date are required fields.' 
            });
        }
        
        const newTask = new Task({ 
            title, 
            description: description || 'No description provided.',
            priority, 
            dueDate, 
            user: PLACEHOLDER_USER_ID 
        });

        await newTask.save();
        
        res.status(201).json(newTask);
            
    } catch (error) {
    console.error("Task Creation Failed. The terminal error is:", error);
        res.status(500).json({ 
            message: 'Error creating task in the database.', 
            error: error.message 
        });
    }
};
exports.getTasks = async (req, res) => {
    try {
        
        const tasks = await Task.find({ 
    isCompleted: false, 
    user: PLACEHOLDER_USER_ID 
}).lean();
        const startTime = process.hrtime(); 

        const sortedTasks = tasks.sort(taskComparator); 
        
        
        const elapsed = process.hrtime(startTime);
        console.log(`Custom Comparator Sort Time for ${tasks.length} tasks: ${elapsed[0] * 1000 + elapsed[1] / 1000000}ms`); 
        
        res.status(200).json(sortedTasks);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

