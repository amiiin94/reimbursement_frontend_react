import { useState } from 'react';

const ItemForm = ({ isOpen = true, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [attachment, setAttachment] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave({
                description,
                amount: parseFloat(amount) || 0,
                attachment: attachment ? attachment.name : null,
                file: attachment,
            });
        }
  
        setDescription('');
        setAmount('');
        setAttachment(null);
        if (onClose) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-lg shadow-xl border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">
                        Add Item
                    </h3>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    )}
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <label htmlFor="modal_description" className="block mb-2 text-sm font-medium text-gray-900">
                                Description:
                            </label>
                            <input
                                type="text"
                                id="modal_description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Contoh: Tiket Kereta / Biaya Makan Klien"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="modal_amount" className="block mb-2 text-sm font-medium text-gray-900">
                                Amount (Rp):
                            </label>
                            <input
                                type="number"
                                id="modal_amount"
                                name="amount"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="0"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="modal_attachment" className="block mb-2 text-sm font-medium text-gray-900">
                                Attachment:
                            </label>
                            <input
                                type="file"
                                id="modal_attachment"
                                name="attachment"
                                onChange={(e) => setAttachment(e.target.files[0] || null)}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                          
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 p-4 md:p-5 border-t border-gray-200">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="py-2.5 px-5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-200 transition-colors"
                            >
                                Batal
                            </button>
                        )}
                        <button
                            type="submit"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ItemForm;
