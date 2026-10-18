import { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router';
import { ApprovalService } from '../../../services/ApprovalService';
import { jwtDecode } from 'jwt-decode';

const ApprovalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reimbursement = location.state?.reimbursement;

    const [action, setAction] = useState(reimbursement?.status === 'APPROVED' ? 'PAID' : 'APPROVED');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getApprovalLevel = () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const payload = jwtDecode(token);
                if (payload.role === "employee") {
                    return 1;
                } else if (payload.role === "finance_approver") {
                    return 2;
                };
            }
        } catch (e) {
            console.error("Error decoding token for approvalLevel:", e);
        }
        return 1;
    };

    const approvalLevel = getApprovalLevel();

    const handleSubmit = async () => {
        setError('');

        if ((action === 'REVISION' || action === 'REJECTED') && !note.trim()) {
            setError('Note is required when rejecting or requesting revision.');
            return;
        }

        const approverId = localStorage.getItem("id");

        const payload = {
            requestId: Number(id),
            approverId: Number(approverId),
            approvalLevel: approvalLevel,
            action: action,
            note: note
        };

        try {
            setIsLoading(true);
            const response = await ApprovalService.approvalProcess(payload);
            console.log("Approval created:", response.data);
            navigate('/approval');
        } catch (error) {
            console.error("Approval error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reimbursement Approval</h2>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    approvalLevel === 1 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                }`}>
                    {approvalLevel === 1 ? 'Level 1: Supervisor' : 'Level 2: Finance'}
                </span>
            </div>

            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}
            
            <div className="space-y-6">
                <div>
                    <label htmlFor="request_number" className="block mb-2 text-sm font-medium text-gray-900">
                        Reimbursement Number:
                    </label>
                    <input
                        type="text"
                        id="request_number"
                        name="request_number"
                        defaultValue={reimbursement?.requestNumber || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="RMB/2026/0001"
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="requester" className="block mb-2 text-sm font-medium text-gray-900">
                        Requester:
                    </label>
                    <input
                        type="text"
                        id="requester"
                        name="requester"
                        defaultValue={reimbursement?.name || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Budi"
                        disabled
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                        Action:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                        {approvalLevel === 2 && reimbursement?.status === 'APPROVED' ? (
                            <option value="PAID">PAID</option>
                        ) : (
                            <>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REVISION">REVISION</option>
                                <option value="REJECTED">REJECTED</option>
                                {approvalLevel === 2 && <option value="PAID">PAID</option>}
                            </>
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">
                        Note {(action === 'REVISION' || action === 'REJECTED') && <span className="text-red-500">*</span>}:
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        rows="4"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder={
                            action === 'REVISION' 
                                ? "Specify required revisions (required)..." 
                                : action === 'REJECTED' 
                                    ? "Reason for rejection (required)..." 
                                    : "Optional approval note..."
                        }
                    />
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-gray-100 gap-3">
                    <Link
                        to="/approval"
                        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
                    >
                        Kembali
                    </Link>
                    <button
                        type="button"
                        disabled={isLoading}
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer disabled:opacity-50"
                        onClick={handleSubmit}
                    >
                        {isLoading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApprovalForm;