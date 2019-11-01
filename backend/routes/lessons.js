const router = require('express').Router()
let Lesson = require('../models/lesson.model').model;

// route: /lessons/
router.route('/').get((req, res) => {
    Lesson.find()
        .then(lessons => res.json(lessons))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /lessons/218937
router.route('/:id').get((req, res) => {
    console.log(req.params)
    Lesson.findById(req.params.id)
        .then(lesson => res.json(lesson))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/courseType/:type').get((req, res) => {
    Lesson.find({ courseType: req.params.type })
        .then(lesson => res.json(lesson))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Lesson.findByIdAndDelete(req.params.id)
        .then(() => res.json('lesson deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post((req, res) => {
    Lesson.findById(req.params.id)
        .then(lesson => {
            lesson = req.body
            lesson.save()
                .then(() => res.json('lesson updated'))
                .catch(err => res.status(400).json('err ' + err))
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /lessons/add
router.route('/add').post((req, res) => {
    if (req.body instanceof Array) {
        const lessonPromises = req.body.map(lesson => {
            const newLesson = new Lesson({ ...lesson })

            return new Promise((resolve, reject) => {
                newLesson.save((error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })
        });
        Promise.all(lessonPromises).then((results) => {
            res.status(200).json('multiple lessons added')
        }, (error) => { console.warn(error) })

    } else {
        const newLesson = new Lesson({ ...req.body })
        newLesson.save()
            .then(() => res.json('lesson added: ' + newLesson))
            .catch(err => res.status(400).json('error ' + err))
    }
})

module.exports = router