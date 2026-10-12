import { Link } from 'react-router';

ApprovalForm = () => {

    return (
        <div className=" mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Reimbursement Approval</h2>
            
            <form className="space-y-6">
        
                <div>
                    <label htmlFor="request_number" className="block mb-2 text-sm font-medium text-gray-900">
                        Reimbursement Number:
                    </label>
                    <input
                        type="text"
                        id="request_number"
                        name="request_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="RMB/2026/0001"
                        required
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="request_number" className="block mb-2 text-sm font-medium text-gray-900">
                        Requester:
                    </label>
                    <input
                        type="text"
                        id="requester"
                        name="requester"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Budi"
                        required
                        disabled
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                        <option value="DRAFT">APPROVED</option>
                        <option value="SUBMIT">REVISION</option>
                        <option value="CANCEL">REJECTED</option>
                        <option value="CANCEL">PAID</option>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Note for require revision..."
                        required
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
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>

        
        </div>
    );
}

export default ApprovalForm;