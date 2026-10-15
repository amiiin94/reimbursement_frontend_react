import ApiClient from "../config/ApiClient";

export const ReimbursementService = {
    

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
    },

    //view item by reimbursement id
    viewItemByReimbursementId: async (id) => {
        try {
            const response = await ApiClient.get(`api/reimbursement/item/${id}`)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    },

    //view reimbursement for finance
    viewReimbursementForFinance: async () => {
        try {
            const response = await ApiClient.get(`api/reimbursement/finance`)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    }
}