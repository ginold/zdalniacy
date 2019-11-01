import axios from '../axios'

export default {
    getLessonById: async (id) => {
        try {
            return await axios.get(`/lessons/${id}`)
        } catch (err) {
            console.error(err)
        }
    },
    getAll: async () => {
        try {
            const lessons = await axios.get(`/lessons`)
            return lessons.data || null
        } catch (err) {
            console.error(err)
        }
    }
}