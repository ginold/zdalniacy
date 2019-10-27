const router = require('express').Router()
let User = require('../models/user.model');

// route: /users/
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /users/218937
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
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
    User.findById(req.params.id)
        .then(user => {
            user = req.body
            user.save()
                .then(() => res.json('user updated'))
                .catch(err => res.status(400).json('err ' + err))
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /users/add
router.route('/add').post((req, res) => {
    const { title, description, company, time, location } = req.body
    const newUser = new User({ title, description, company, location, time })

    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('error ' + err))
})

module.exports = router