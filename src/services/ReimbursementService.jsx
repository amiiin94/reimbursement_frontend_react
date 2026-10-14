import ApiClient from "../config/ApiClient";

export const ReimbursementService = {
    // login
    login: async(data) => {
        try {
            const response = await ApiClient.post(`api/user/login`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
        }
    },

    // View reimbursement
     viewReimbursement: async(id) => {
        try {
            const response = await ApiClient.get(`api/reimbursement/user/${id}`)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    // create reimbursement
    createReimbursement: async(data) => {
        try {
            const response = await ApiClient.post(`api/reimbursement/insert`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    // update Reimbursement
     updateReimbursement: async(data) => {
        try {
            const response = await ApiClient.put(`api/reimbursement/update`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    //Approval process
    approvalProcess: async(data) => {
        try {
            const response = await ApiClient.post(`api/approval/process`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    //Approval view
    viewApproval: async() => {
        try {
            const response = await ApiClient.get(`api/approval`)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    //view reimbursement by supervisor Id
    viewReimbursementBySupervisorId: async (id) => {
        try {
            const response = await ApiClient.get(`api/reimbursement/supervisor/${id}`)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    }
}