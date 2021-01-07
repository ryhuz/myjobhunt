import { axiosBase, axiosJobs } from '../../https_requests/requests'

export const checkToken = async (token) => {
    try {
        let check = await axiosBase.get('verify_token', {
            headers: {
                token: token,
            }
        })
        return { success: true, user: check.data.user, token }
    } catch (e) {
        if (e.response.data.invalid === 'expired' || e.response.data.invalid === 'invalid') {
            return { success: false }
        }
    }
}

export const getUserJobData = async () => {
    try {
        let jobDetails = await axiosJobs('retrieve_all');
        let sortedHunts = jobDetails.data.hunts.sort((a, b) => {
            if (a.hunStart > b.huntStart){
                return 1;
            }else{
                return -1;
            }
        })
        // let sortedJobs = jobDetails.data.jobs.sort((a, b) => {

        // })
        return { success: true, hunts: sortedHunts, jobs: jobDetails.data.jobs }
    } catch (e) {
        console.log(e)
        return { success: false }
    }
}

export const login = async (form) => {
    try {
        let loginAttempt = await axiosBase.post('/login', form)

        let token = loginAttempt.data.token
        localStorage.setItem('mjh_user_token', token);

        return { success: true, user: loginAttempt.data.user, token }
    } catch (e) {
        return {
            success: false,
            errorMsg: e.response.data.invalid === "username" ?
                "Username does not exist" : "Invalid password",
        }
    }
}

export const register = async (form) => {
    try {
        await axiosBase.post('register', form);

        return { success: true }
    } catch (e) {
        console.log(e.response)
        return { success: false }
    }
}