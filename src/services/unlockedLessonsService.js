import axios from '../axios'

export default {
    unlockLesson: async (userId, lessonId) => {
        try {
            let unlock = await axios.post('/unlockedlessons/unlock', { userId, lessonId })
            return unlock.data || null
        } catch (err) {
            console.error(err)
        }
    },
    getUnlockedLessonsByUserId: async (userId) => {
        try {
            let lessons = await axios.get('/unlockedlessons/' + userId)
            return lessons.data || []
        } catch (err) {
            console.log(err)
        }
    }
}