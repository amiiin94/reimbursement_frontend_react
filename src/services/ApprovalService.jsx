import ApiClient from "../config/ApiClient";

export const ApprovalService = {
    //Approval process
    approvalProcess: async(data) => {
        try {
            const response = await ApiClient.post(`api/approval/process`, data);
            return response;
        } catch (error) {
            throw error.response ? error.response.data: error;
        }
    },

    // Get approval history by reimbursement request ID
    getApprovalByRequestId: async(requestId) => {
        try {
            const response = await ApiClient.get(`api/approval/request/${requestId}`);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}