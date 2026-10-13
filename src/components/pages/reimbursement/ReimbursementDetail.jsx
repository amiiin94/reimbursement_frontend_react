import { Link } from 'react-router';

const ReimbursementDetail = () => {
    return (
        <>
            <div className=" mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Reimbursement Detail</h2>
            
            <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="request_number" className="block mb-2 text-sm font-medium text-gray-900">
                            Request Number:
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
                        <label htmlFor="submit_date" className="block mb-2 text-sm font-medium text-gray-900">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="submit_date"
                            name="submit_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                        Title:
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Reimbursement title..."
                        required
                    />
                </div>
                <button
                        type="button"
                        
                        className="text-primary-600 inline-flex items-center gap-1.5 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Item
                 </button>

                <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Daftar Item (2)
                            </h3>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">No</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">Amount</th>
                                        <th scope="col" className="px-4 py-3">Attachment</th>
                                        <th scope="col" className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">1</td>
                                            <td className="px-4 py-3">Perjalanan dinas</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                Rp 100000
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                                                { '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                
                                                    className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">2</td>
                                            <td className="px-4 py-3">17 agustus</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                Rp 500000
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                                                { '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                
                                                    className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/reimbursement"
                            className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
                        >
                            Kembali
                        </Link>
                        <button
                            type="button"
                            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
                        >
                            Draft
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default ReimbursementDetail