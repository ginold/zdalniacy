import axios from '../axios'

export default {
    getAll: async () => {
        try {
            let jobs = await axios.get(`/jobs`);
            return jobs.data || [];
        } catch (err) {
            console.error(err)
        }
    },

    getJobById: async (id) => {
        try {
            const job = await axios.get('/jobs/' + id)
            return job || null
        } catch (err) {
            console.error(err)
        }
    }
}