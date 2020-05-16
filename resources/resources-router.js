const express = require('express'); 

const Resources = require('./resources-model'); 

const router = express.Router(); 

router.get('/', (req,res) => {
    Resources.find()
    .then(resources => {
        res.status(200).json(resources); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "Sorry could not retrieve resources", specErr:err.message })
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id; 

    Resources.findById(id)
    .then(resource => {
        if(resource) {
            res.status(200).json({ data: resource}); 
        }
        else {
            res.status(404).json({ message: "Sorry, could not find resource under that ID"})
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ message: "sorry could not retrieve resources" , specErr: err.message }); 
    })
})

router.post('/', (req,res) => {

    if(isValidResrc(req.body)) {
        Resources.add(req.body)
        .then(resource => {
            res.status(201).json(resource); 
        })
        .catch(err => {
            res.status(500).json({ message: "failed to create new resource", specErr: err.message})
        })
    }
    else {
        res.status(404).json({message: "please add a resource name"})
    }
})

function isValidResrc(post) {
    return Boolean(post.resource_name)
}


module.exports = router; 