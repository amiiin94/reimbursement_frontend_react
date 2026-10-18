import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import { ReimbursementService } from "../../../services/ReimbursementService";
import { ApprovalService } from "../../../services/ApprovalService";
import ItemForm from "./ItemForm";
import { jwtDecode } from "jwt-decode";

const ReimbursementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [reimbursement, setReimbursement] = useState(location.state?.reimbursement || null);
  const [items, setItems] = useState([]);
  const [approvalHistory, setApprovalHistory] = useState([]);
  const [description, setDescription] = useState("");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get current user role
  const token = localStorage.getItem("token");
  let userRole = "";
  let currentUserId = localStorage.getItem("id");
  try {
    if (token) {
      const decoded = jwtDecode(token);
      userRole = decoded.role || "";
    }
  } catch (e) {
    console.error("Token decode error:", e);
  }

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // 1. Fetch reimbursement details by ID
      const res = await ReimbursementService.viewReimbursementById(id);
      const data = res.data?.data || res.data;
      let historyLoaded = false;

      if (data) {
        setReimbursement(data);
        setDescription(data.description || "");
        if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
        }
        if (data.approvalHistory && Array.isArray(data.approvalHistory)) {
          setApprovalHistory(data.approvalHistory);
          historyLoaded = true;
        }
      }

      // 2. Fallback fetch items if not embedded
      if (!data?.items) {
        try {
          const itemRes = await ReimbursementService.viewItemByReimbursementId(id);
          setItems(itemRes.data?.data || []);
        } catch (itemErr) {
          console.error("Error fetching items:", itemErr);
        }
      }

      // 3. Fallback fetch approval history if not embedded
      if (!historyLoaded) {
        try {
          const historyRes = await ApprovalService.getApprovalByRequestId(id);
          setApprovalHistory(historyRes.data?.data || []);
        } catch (histErr) {
          console.error("Error fetching approval history:", histErr);
        }
      }
    } catch (err) {
      console.error("Error loading reimbursement detail:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to load reimbursement detail");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const isEditable = reimbursement?.status === "DRAFT" || reimbursement?.status === "REVISION";

  const handleSaveItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (index) => {
    if (!isEditable) return;
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdate = async (targetStatus) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!description.trim()) {
      setErrorMessage("Description cannot be empty.");
      return;
    }

    if (targetStatus === "SUBMIT" && items.length === 0) {
      setErrorMessage("Please add at least one item before submitting.");
      return;
    }

    const payload = {
      reimbursementId: Number(id),
      description: description,
      status: targetStatus,
      items: items.map((item) => ({
        categoryId: item.categoryId || 1,
        description: item.description,
        amount: Number(item.amount),
        expenseDate: item.expenseDate || new Date().toISOString().split("T")[0],
        attachmentUrl: item.attachmentUrl || null,
      })),
    };

    try {
      setIsSubmitting(true);
      await ReimbursementService.updateReimbursement(payload);
      setSuccessMessage(
        targetStatus === "SUBMIT"
          ? "Reimbursement successfully submitted!"
          : "Draft successfully saved!"
      );
      await loadData();
    } catch (err) {
      console.error("Update error:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to update reimbursement");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleDisbursePayment = async () => {
    if (!window.confirm("Confirm payment disbursement for this request?")) return;
    try {
      setIsSubmitting(true);
      await ApprovalService.approvalProcess({
        requestId: Number(id),
        approverId: Number(currentUserId),
        approvalLevel: 2,
        action: "PAID",
        note: "Disbursement completed by Finance",
      });
      setSuccessMessage("Reimbursement marked as PAID!");
      await loadData();
    } catch (err) {
      console.error("Disburse error:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to disburse payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  
  const latestApprovalNote = approvalHistory.length > 0 
    ? approvalHistory[approvalHistory.length - 1] 
    : null;

  return (
    <div className="mx-auto my-6 p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reimbursement Detail</h2>
          <p className="text-sm text-gray-500">
            {reimbursement?.requestNumber || "Request Number"} &bull; {reimbursement?.employeeName ? `Requester: ${reimbursement.employeeName}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
              reimbursement?.status === "PAID"
                ? "bg-green-100 text-green-800"
                : reimbursement?.status === "APPROVED"
                ? "bg-blue-100 text-blue-800"
                : reimbursement?.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : reimbursement?.status === "REVISION"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : reimbursement?.status === "DRAFT"
                ? "bg-gray-100 text-gray-700"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {reimbursement?.status || "LOADING..."}
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
          <span className="font-medium">Error:</span> {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
          <span className="font-medium">Success:</span> {successMessage}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Request Number:
            </label>
            <input
              type="text"
              value={reimbursement?.requestNumber || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              disabled
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Submission Date:
            </label>
            <input
              type="text"
              value={reimbursement?.submitDate || "Not submitted yet"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description:
          </label>
          <input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditable}
            className={`text-sm rounded-lg block w-full p-2.5 border ${
              isEditable
                ? "bg-white border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
            placeholder="Reimbursement description..."
            required
          />
        </div>

        {/* Action to Add Item if editable */}
        {isEditable && (
          <div>
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
          </div>
        )}

        {/* Items Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Daftar Item ({items.length})
            </h3>
            <div className="text-sm font-semibold text-gray-900">
              Total: Rp {totalAmount.toLocaleString("id-ID")}
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-4 py-3">No</th>
                  <th scope="col" className="px-4 py-3">Description</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3">Expense Date</th>
                  <th scope="col" className="px-4 py-3">Attachment</th>
                  {isEditable && <th scope="col" className="px-4 py-3 text-right">Action</th>}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={isEditable ? 6 : 5} className="px-4 py-4 text-center text-gray-500">
                      Belum ada item reimbursement.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{idx + 1}</td>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Rp {Number(item.amount).toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{item.expenseDate || "-"}</td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                        {item.attachmentUrl || "-"}
                      </td>
                      {isEditable && (
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                          >
                            Hapus
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval History & Progress Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Approval History</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
              {approvalHistory.length} Record{approvalHistory.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Visual Approval Workflow Stepper */}
          <div className="mb-6 p-4 bg-gray-50/70 border border-gray-200 rounded-lg">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Workflow Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1: Requester Submission */}
              <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  reimbursement?.status === "DRAFT" 
                    ? "bg-gray-100 text-gray-600" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {reimbursement?.status === "DRAFT" ? "1" : "✓"}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 font-medium">Tahap 1: Pengajuan</div>
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {reimbursement?.employeeName || "Requester"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {reimbursement?.status === "DRAFT" ? "Draft" : reimbursement?.submitDate ? `Diajukan: ${reimbursement.submitDate}` : "Terkirim"}
                  </div>
                </div>
              </div>

              {/* Step 2: Supervisor Approval */}
              <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  reimbursement?.status === "WAITING_SUPERVISOR"
                    ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300 animate-pulse"
                    : reimbursement?.status === "REVISION"
                    ? "bg-yellow-100 text-yellow-800"
                    : reimbursement?.status === "REJECTED" && approvalHistory.some(a => a.approverLevel === 1 && a.status === "REJECTED")
                    ? "bg-red-100 text-red-700"
                    : ["WAITING_FINANCE", "APPROVED", "PAID"].includes(reimbursement?.status) || approvalHistory.some(a => a.approverLevel === 1 && a.status === "APPROVED")
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {["WAITING_FINANCE", "APPROVED", "PAID"].includes(reimbursement?.status) || approvalHistory.some(a => a.approverLevel === 1 && a.status === "APPROVED")
                    ? "✓"
                    : reimbursement?.status === "REVISION"
                    ? "!"
                    : reimbursement?.status === "REJECTED" && approvalHistory.some(a => a.approverLevel === 1 && a.status === "REJECTED")
                    ? "✕"
                    : "2"}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 font-medium">Tahap 2: Supervisor</div>
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {approvalHistory.find(a => a.approverLevel === 1)?.approverName || "Supervisor"}
                  </div>
                  <div className="text-xs font-medium">
                    {reimbursement?.status === "WAITING_SUPERVISOR" && (
                      <span className="text-blue-600 font-semibold">Menunggu Review</span>
                    )}
                    {approvalHistory.some(a => a.approverLevel === 1 && a.status === "APPROVED") && (
                      <span className="text-green-600">Disetujui</span>
                    )}
                    {reimbursement?.status === "REVISION" && (
                      <span className="text-yellow-700 font-semibold">Perlu Revisi</span>
                    )}
                    {reimbursement?.status === "REJECTED" && approvalHistory.some(a => a.approverLevel === 1 && a.status === "REJECTED") && (
                      <span className="text-red-600">Ditolak</span>
                    )}
                    {reimbursement?.status === "DRAFT" && (
                      <span className="text-gray-400">Belum diproses</span>
                    )}
                    {!["WAITING_SUPERVISOR", "REVISION", "DRAFT"].includes(reimbursement?.status) && !approvalHistory.some(a => a.approverLevel === 1) && (
                      <span className="text-gray-500">Selesai</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Finance Verification & Disbursement */}
              <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  reimbursement?.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : reimbursement?.status === "APPROVED"
                    ? "bg-blue-100 text-blue-700"
                    : reimbursement?.status === "WAITING_FINANCE"
                    ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300 animate-pulse"
                    : reimbursement?.status === "REJECTED" && approvalHistory.some(a => a.approverLevel === 2 && a.status === "REJECTED")
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {reimbursement?.status === "PAID" ? "✓" : reimbursement?.status === "APPROVED" ? "✓" : "3"}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 font-medium">Tahap 3: Finance</div>
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {approvalHistory.find(a => a.approverLevel === 2)?.approverName || "Finance"}
                  </div>
                  <div className="text-xs font-medium">
                    {reimbursement?.status === "PAID" ? (
                      <span className="text-green-700 font-semibold">Telah Dibayar (PAID)</span>
                    ) : reimbursement?.status === "APPROVED" ? (
                      <span className="text-blue-700 font-semibold">Disetujui (Siap Bayar)</span>
                    ) : reimbursement?.status === "WAITING_FINANCE" ? (
                      <span className="text-blue-600 font-semibold">Menunggu Verifikasi</span>
                    ) : reimbursement?.status === "REJECTED" && approvalHistory.some(a => a.approverLevel === 2 && a.status === "REJECTED") ? (
                      <span className="text-red-600">Ditolak Finance</span>
                    ) : (
                      <span className="text-gray-400">Menunggu Tahap 1</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-100">


          <div className="flex items-center gap-3">
            {/* Finance can disburse if status is APPROVED */}
            {userRole === "finance_approver" && reimbursement?.status === "APPROVED" && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDisbursePayment}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Mark as PAID"}
              </button>
            )}

            {/* Editable buttons for DRAFT & REVISION */}
            {isEditable && (
              <>
                {reimbursement?.status === "DRAFT" && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleUpdate("DRAFT")}
                    className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Draft"}
                  </button>
                )}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleUpdate("SUBMIT")}
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : reimbursement?.status === "REVISION" ? "Submit Revision" : "Submit"}
                </button>
              </>
            )}
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
};

export default ReimbursementDetail;
