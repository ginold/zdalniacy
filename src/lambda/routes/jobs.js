const router = require('express').Router()
let Job = require('../models/job.model');
const Lesson = require('../models/lesson.model');

// route: /jobs/
router.route('/').get((req, res) => {
    Job.find()
        .populate({ path: 'lessonsNeeded', model: Lesson })
        .sort({ createdAt: 'desc' })
        .exec((err, docs) => {
            if (err) res.status(400).json(err)
            res.status(200).json(docs)
        });
})

// route: /jobs/218937
router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .populate({ path: 'lessonsNeeded', model: Lesson })
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
    const update = { ...req.body }
    Job.findOneAndUpdate({ _id: req.params.id }, update)
        .then(result => {
            res.status(200).json('job updated! ' + result)
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /jobs/add
router.route('/add').post((req, res) => {
    let lessonsNeeded = []
    const lessonPromises = req.body.lessonsNeeded.map(lessonId => {
        // const newCourse = new Lesson({ ...course })
        return new Promise((resolve) => {
            Lesson.findById(lessonId).then(lesson => {
                lessonsNeeded.push(lesson)
                resolve(lesson)
            })
        })
    });
    Promise.all(lessonPromises).then(() => {
        const newJob = new Job({ ...req.body, lessonsNeeded })
        newJob.save()
            .then(() => res.json('job added'))
            .catch(err => res.status(400).json('error ' + err))
        console.log('job added!')
        res.status(200).json('job added')

    }, (error) => { console.warn(error) })

})

module.exports = router