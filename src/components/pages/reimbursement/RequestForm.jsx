import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import ItemForm from './ItemForm';
import { ReimbursementService } from '../../../services/ReimbursementService';

const RequestForm = () => {
    const navigate = useNavigate();
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleSaveItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const employeeId = localStorage.getItem("id");
    const [description, setDescription] = useState('');

    const handleSubmit = async (status) => {

        const payload = {
            employeeId: Number(employeeId),
            description,
            status: status,
            items
        }
        console.log(payload)

        try {
            const response = await ReimbursementService.createReimbursement(payload);
            console.log("Reimbursement created:", response.data);

            navigate("/");
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className=" mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Reimbursement Request Form</h2>
            
            <div className="space-y-6">

                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                        description:
                    </label>
                    <input
                        id="description"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Reimbursement description..."
                        required
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                </div>
                <button
                        type="button"
                        onClick={() => setIsItemModalOpen(true)}
                        className="text-primary-600 inline-flex items-center gap-1.5 hover:text-white border border-primary-600 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Item
                 </button>

                {/* Daftar Item yang sudah ditambahkan */}
                {items.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Daftar Item ({items.length})
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

                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
                            onClick={() => handleSubmit("DRAFT")}
                        >
                            Draft
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer"
                            onClick={() => handleSubmit("SUBMIT")}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <ItemForm
                isOpen={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
                onSave={handleSaveItem}
            />
        </div>
    );
}

export default RequestForm;