import axios from '../axios'

export default {
    getAll: async () => {
        try {
            let res = await axios.get(`/courses`);
            return res.data || null
        } catch (err) {
            console.error(err)
        }
    },
    getCourseByType: async (type) => {
        try {
            let res = await axios.get('courses/type/' + type)
            return res.data || null
        } catch (err) {
            console.error(err)
        }
    }
}