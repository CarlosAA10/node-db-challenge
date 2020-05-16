const express = require('express'); 

const Tasks = require('./tasks-model'); 

const router = express.Router(); 

router.get('/', (req,res) => {
    Tasks.find()
    .then(tasks => {
        res.status(200).json(tasks); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "Sorry, could not retrieve tasks"})
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id; 

    Tasks.findById(id)
    .then(task => {
        if(task) {
            res.status(200).json({data: task})
        }
        else {
            res.status(404).json({ message: "Sorry, could not find project by that ID"})
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "Sorry, could not load Task(s)", specErr: err.message })
    })
})

router.post('/', (req,res) => {
    if(isValidTask(req.body)) {
        Tasks.add(req.body)
        .then(tasks => {
            res.status(201).json(tasks)
        })
        .catch(err => {
            res.status(500).json({ message: "failed to create new task", specErr: err.message })
        })
    }

    else {
        res.status(404).json({ message: "please add a task description and project id"})
    }
 
})



function isValidTask(task) {
    return Boolean(task.task_desc && task.project_id); 
}

module.exports = router; 