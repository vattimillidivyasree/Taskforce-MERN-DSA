

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        default: '666666666666666666666666'
    },
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String 
    },
    
    priority: { 
        type: Number, 
        default: 3, 
        min: 1, 
        max: 5  
    }, 
    
    dueDate: { 
        type: Date, 
        required: true 
    }, 
    isCompleted: { 
        type: Boolean, 
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);