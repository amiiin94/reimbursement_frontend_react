import ApiClient from "../config/ApiClient";

export const ApprovalService = {
    //Approval process
    approvalProcess: async(data) => {
        try {
            const response = await ApiClient.post(`api/approval/process`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
            
        }
    }
}