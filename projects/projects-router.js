const express = require('express'); 

const Projects = require('./projects-model')

const router = express.Router(); 

router.get('/', (req,res) => {
    Projects.find()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "sorry could not retrieve projects" , specErr: err.message }); 
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id; 
    Projects.findById(id)
    .then(project => {
        if(project) {
            res.status(200).json({data: project}); 
        }
        else{
            res.status(404).json({ message: "Sorry, could not find project by that Id"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Sorry, could not load project(s)", specErr: err.message })
    })
})

router.get('/:id/tasks', (req,res) => {
    const id = req.params.id; 

    Projects.findTasks(id)
    .then(tasks => {
        if(tasks.length > 0) {
            res.status(200).json({ data: tasks })
        }
        else {
            res.status(404).json({ message: "Sorry, could not find tasks under that project id"})
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "sorry, could not load tasks at this time", specErr: err.message })
    })
})

router.post('/', (req,res) => {
    if(isValidPost(req.body)) {
        Projects.add(req.body)
        .then(projects => {
            res.status(201).json(projects); 
        })
        .catch(err => {
            res.status(500).json({message: "failed to create new project", specErr: err.message })
        })
    }
    else {
        res.status(404).json({ message: "please add a project name"}); 
    }
})

router.post('/:id/project_resources', (req,res) => {

    const id = req.params.id; 
    let body = req.body; 
    body.project_id = Number(id); 
 
     console.log('the body', body); 



     Projects.addResource(body)
     .then(resource => {
        res.status(201).json({ data: resource })
     })
     .catch(err => {
         console.log(err); 
         res.status(500).json({ message: err.message})
     })

})


function isValidPost(post) {
    return Boolean(post.project_name)
}


module.exports = router; 