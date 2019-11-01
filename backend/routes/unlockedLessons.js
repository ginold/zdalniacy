const router = require('express').Router()
let UnlockedLesson = require('../models/unlockedLessons.model').model;

// route: /unlockedLessons/
router.route('/').get((req, res) => {
    UnlockedLesson.find()
        .then(unlockedLessons => res.json(unlockedLessons))
        .catch(err => res.status(400).json('error: ' + err))
})

// route: /unlockedLessons/218937
router.route('/:userid').get((req, res) => {
    UnlockedLesson.findOne({ userId: req.params.userid })
        .then(unlockedLesson => res.json(unlockedLesson))
        .catch(err => res.status(400).json('error: ' + err))
})


// route: /unlockedLessons/218937
router.route('/type/:type').get((req, res) => {
    UnlockedLesson.findOne({ type: req.params.type })
        .then(unlockedLesson => res.json(unlockedLesson))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/:id').delete((req, res) => {
    UnlockedLesson.findByIdAndDelete(req.params.id)
        .then(() => res.json('unlockedLesson deleted'))
        .catch(err => res.status(400).json('error: ' + err))
})
// update
router.route('/update/:id').post(async (req, res) => {
    let oldUnlockedLesson = await UnlockedLesson.findById(req.params.id)
    let newUnlockedLesson = { ...oldUnlockedLesson._doc, ...req.body }

    UnlockedLesson.findOneAndUpdate({ _id: req.params.id }, newUnlockedLesson)
        .then(result => {
            res.status(200).json('unlockedLesson updated! ' + result)
        })
        .catch(err => res.status(400).json('error: ' + err))
})

// unlock a lesson
router.route('/unlock').post(async (req, res) => {
    let oldLessons = await UnlockedLesson.findOne({ userId: req.body.userId })
    if (oldLessons) {
        oldLessons._doc.lessons.push(req.body.lessonId)
        let newLessons = { ...oldLessons._doc }
        UnlockedLesson.findOneAndUpdate({ userId: req.body.userId }, newLessons)
            .then(result => {
                res.status(200).json('unlock lessons updated! ' + result)
            })
            .catch(err => res.status(400).json('error: ' + err))

    } else {
        const newUnlockedLesson = new UnlockedLesson({ userId: req.body.userId, lessons: [req.body.lessonId] })
        newUnlockedLesson.save().then(() => {
            res.status(200).json("unlocked lesson created")
        }).catch(err => res.status(400).json('error ' + err))
    }

})

module.exports = router