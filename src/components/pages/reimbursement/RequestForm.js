import { useState } from 'react';
import ItemForm from './ItemForm';

function RequestForm() {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleSaveItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const handleRemoveItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-2xl mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Reimbursement Request Form</h2>
            
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
                            Submit Date:
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
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Deskripsi pengajuan reimbursement..."
                        required
                    />
                </div>

                {/* Daftar Item yang sudah ditambahkan */}
                {items.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Daftar Item ({items.length})
                            </h3>
                            <span className="text-sm font-semibold text-primary-600">
                                Total: Rp {items.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('id-ID')}
                            </span>
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
                                    {items.map((item, idx) => (
                                        <tr key={idx} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{idx + 1}</td>
                                            <td className="px-4 py-3">{item.description}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                Rp {item.amount.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                                                {item.attachment || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(idx)}
                                                    className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => setIsItemModalOpen(true)}
                        className="text-primary-600 inline-flex items-center gap-1.5 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Item
                    </button>
                    <button
                        type="draft"
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
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
            </form>

            {/* Modal Dialog ItemForm */}
            <ItemForm
                isOpen={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
                onSave={handleSaveItem}
            />
        </div>
    );
}

export default RequestForm;