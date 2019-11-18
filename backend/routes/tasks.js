const router = require('express').Router()
let Task = require('../models/task.model');

// route: /tasks/
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /tasks/218937
router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('error: ' + err))
})
router.route('/type/:type').get((req, res) => {
    Task.findOne({ type: req.params.type })
        .then(task => res.json(task))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('task deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task = req.body
            task.save()
                .then(() => res.json('task updated'))
                .catch(err => res.status(400).json('err ' + err))
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /tasks/add
router.route('/add').post((req, res) => {
    const { title, description, imgUrl, buttonText, points } = req.body
    const newTask = new Task({ title, description, imgUrl, buttonText, points })

    newTask.save()
        .then(() => res.json('task added'))
        .catch(err => res.status(400).json('error ' + err))
})

module.exports = router