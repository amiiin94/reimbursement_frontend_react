import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ReimbursementService } from "../../../services/ReimbursementService";
import { jwtDecode } from "jwt-decode";

const Approval = () => {
  const [reimburse, setReimburse] = useState();

  useEffect(() => {
    const fetchReimbursement = async () => {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      try {
        if (!token) {
          console.error("Token not found");
          return;
        }

        const payload = jwtDecode(token);
        console.log(payload);

        const role = payload.role;
        let response;
        console.log(role);

        if (role === "finance_approver") {
          response = await ReimbursementService.viewReimbursementForFinance();
        } else {
          response = await ReimbursementService.viewReimbursementBySupervisorId(userId);
        }

        setReimburse(response.data.data);
      } catch (error) {
        console.error("Failed to fetch reimbursement:", error);
      }
    };

    fetchReimbursement();
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-xl font-bold">Approval</div>
      </div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body justify-items-center bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Code
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Requester
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium content-evenly text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reimburse?.map((item) => {
              if (item.status === "WAITING_SUPERVISOR" || item.status === "WAITING_FINANCE" || item.status ===  "PAID" || item.status === "APPROVED" || item.status === "REJECTED") {
                return (
                  <tr className="bg-neutral-primary border-b border-default">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {item.requestNumber}
                    </th>
                    <td className="px-6 py-4 text-center">{item.submitDate}</td>
                    <td className="px-6 py-4 text-center">{item.name}</td>
                    <td className="px-6 py-4 text-center">{item.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-gray-200 text-heading text-md font-medium px-1.5 py-0.5 rounded">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/approval/form/${item.id}`}
                        state={{ reimbursement: item }}
                        className="font-medium text-fg-brand hover:underline mr-4"
                      >
                        Process
                      </Link>
                      <Link
                        to={`/reimbursement/detail/${item.id}`}
                        state={{ reimbursement: item }}
                        className="font-medium text-fg-brand hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Approval;
