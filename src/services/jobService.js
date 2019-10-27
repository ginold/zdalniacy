import axios from '../axios'

export default {
    getAll: async () => {
        let res = await axios.get(`/jobs`);
        return res.data || [];
    }
}