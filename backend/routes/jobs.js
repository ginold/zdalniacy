const router = require('express').Router()
let Job = require('../models/job.model');

// route: /jobs/
router.route('/').get((req, res) => {
    Job.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /jobs/218937
router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(() => res.json('job deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post((req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            job = req.body
            job.save()
                .then(() => res.json('job updated'))
                .catch(err => res.status(400).json('err ' + err))
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /jobs/add
router.route('/add').post((req, res) => {
    const { title, description, company, time, location } = req.body
    const newJob = new Job({ title, description, company, location, time })

    newJob.save()
        .then(() => res.json('job added'))
        .catch(err => res.status(400).json('error ' + err))
})

module.exports = router