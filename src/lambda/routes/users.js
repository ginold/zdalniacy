const router = require('express').Router()
let User = require('../models/user.model');
const Job = require('../models/job.model')
const Lesson = require('../models/lesson.model')

// route: /users/
router.route('/').get((req, res) => {
    User.find()
        .populate({ path: 'jobsApplied', model: Job })
        .populate({ path: 'saved.lessons', model: Lesson })
        .populate({ path: 'saved.jobs', model: Job })
        .populate({ path: 'accomplished.lessons', model: Lesson })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /users/218937
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .populate({
            path: 'jobsApplied',
            model: Job,
            populate: {
                path: 'lessonsNeeded',
                model: Lesson
            }
        })
        .populate({ path: 'saved.lessons', model: Lesson })
        .populate({
            path: 'saved.jobs',
            model: Job,
            populate: {
                path: 'lessonsNeeded',
                model: Lesson
            }
        })
        .populate({ path: 'accomplished.lessons', model: Lesson })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('user deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post((req, res) => {
    const updatedUser = { ...req.body }
    User.findOneAndUpdate({ _id: req.params.id }, updatedUser)
        .then(result => {
            res.status(200).json('user updated! ' + result)
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /users/add
router.route('/add').post((req, res) => {
    const newUser = new User({ ...req.body })

    newUser.save()
        .then((user) => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('error ' + err)
        })
})
router.route('/login').post((req, res) => {
    const data = new User({ ...req.body })
    console.log(data)

    User.findOne({ email: data.email })
        .populate({
            path: 'jobsApplied',
            model: Job,
            populate: {
                path: 'lessonsNeeded',
                model: Lesson
            }
        })
        .populate({ path: 'saved.lessons', model: Lesson })
        .populate({
            path: 'saved.jobs',
            model: Job,
            populate: {
                path: 'lessonsNeeded',
                model: Lesson
            }
        })
        .populate({ path: 'saved.lessons', model: Lesson })
        .populate({ path: 'accomplished.lessons', model: Lesson })
        .then(user => {
            if (user.password === data.password) {
                res.status(200).json(user)
            } else {
                res.status(403).json('denied')
            }
        })
        .catch(err => res.status(400).json('error: ' + err))
})
module.exports = router