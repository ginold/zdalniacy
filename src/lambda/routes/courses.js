const router = require('express').Router()
let Course = require('../models/course.model');
let Lesson = require('../models/lesson.model');

// route: /courses/
router.route('/').get((req, res) => {
    Course.find()
        .populate({ path: 'lessons', model: Lesson })
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /courses/218937
router.route('/:id').get((req, res) => {
    Course.findById(req.params.id)
        .populate({ path: 'lessons', model: Lesson })
        .then(course => res.json(course))
        .catch(err => res.status(400).json('error: ' + err))
})


// route: /courses/218937
router.route('/type/:type').get((req, res) => {
    Course.findOne({ type: req.params.type })
        .populate({ path: 'lessons', model: Lesson })
        .then(course => res.json(course))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(() => res.json('course deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post(async (req, res) => {

    Course.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        .then(result => {
            res.status(200).json('course updated! ' + result)
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /courses/add
router.route('/add').post((req, res) => {
    if (req.body instanceof Array) {
        const coursePromises = req.body.map(course => {
            const newCourse = new Course({ ...course })

            return new Promise((resolve, reject) => {
                newCourse.save((error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })
        });
        Promise.all(coursePromises).then((results) => {
            console.log('multiple courses added!')
            res.status(200).json('multiple courses added')
        }, (error) => { console.warn(error) })

    } else {
        const newCourse = new Course({ ...req.body })
        newCourse.save()
            .then(() => res.json('course added'))
            .catch(err => res.status(400).json('error ' + err))
    }
})

module.exports = router