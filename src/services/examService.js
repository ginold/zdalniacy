import axios from '../axios'

export default {
    getExamByTaskId: async (id) => {
        try {
            return await axios.get(`/exams/task/${id}`)
        } catch (err) {
            console.error(err)
        }
    },
    getExamByLessonId: async (id) => {
        try {
            const lessons = await axios.get(`/exams/lesson/${id}`)
            return lessons.data || null
        } catch (err) {
            console.error(err)
        }
    }
}