import { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router';
import { ApprovalService } from '../../../services/ApprovalService';

const ApprovalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reimbursement = location.state?.reimbursement;

    const [action, setAction] = useState('APPROVED');
    const [note, setNote] = useState('');

    const handleSubmit = async () => {

        const approverId = localStorage.getItem("id");

        const payload = {
            requestId: Number(id),
            approverId: Number(approverId),
            approvalLevel: 2,
            action: action,
            note: note
        };

        try {
            const response = await ApprovalService.approvalProcess(payload);
            console.log("Approval created:", response.data);
            navigate('/approval');
        } catch (error) {
            console.error("Approval error:", error);
        }
    };

    return (
        <div className="mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Reimbursement Approval</h2>
            
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
                        onChange={(e) => setAction(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                        <option value="APPROVED">APPROVED</option>
                        <option value="REVISION">REVISION</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">
                        Note:
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        rows="4"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Note for require revision..."
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
                        type="submit"
                  
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer disabled:opacity-50"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApprovalForm;