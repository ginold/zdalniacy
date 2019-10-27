import axios from '../axios'

export default {
    getAll: async () => {
        let res = await axios.get(`/courses`);
        return res.data || [];
    },
    getCourseByType: async (type) => {
        let res = await axios.get('courses/type/' + type)
        return res.data || null;
    }
}