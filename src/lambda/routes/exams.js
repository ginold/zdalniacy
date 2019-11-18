const router = require('express').Router()
let Exam = require('../models/exam.model');
const Job = require('../models/job.model')
const Lesson = require('../models/lesson.model')

// route: /exams/
router.route('/').get((req, res) => {
    Exam.find()
        .then(exams => res.json(exams))
        .catch(err => res.status(400).json('error: ' + err))
})
// route: /exams/task/id
router.route('/task/:id').get((req, res) => {
    Exam.findOne({ taskId: req.params.id })
        .then(exams => res.json(exams))
        .catch(err => res.status(400).json('error: ' + err))
})
// route: /exams/task/id
router.route('/lesson/:id').get((req, res) => {
    Exam.findOne({ lessonId: req.params.id })
        .then(exams => res.json(exams))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /exams/218937
router.route('/:id').get((req, res) => {
    Exam.findById(req.params.id)
        .populate({
            path: 'saved.jobs',
            model: Job,
            populate: {
                path: 'lessonsNeeded',
                model: Lesson
            }
        })
        .populate({ path: 'accomplished.lessons', model: Lesson })
        .then(exam => res.json(exam))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Exam.findByIdAndDelete(req.params.id)
        .then(() => res.json('exam deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post((req, res) => {
    const updatedExam = { ...req.body }
    Exam.findOneAndUpdate({ _id: req.params.id }, updatedExam)
        .then(result => {
            res.status(200).json('exam updated! ' + result)
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /exams/add
router.route('/add').post((req, res) => {
    const newExam = new Exam({ ...req.body })

    newExam.save()
        .then(() => res.json('exam added'))
        .catch(err => {
            console.log(err)
            res.status(400).json('error ' + err)
        })
})
module.exports = router