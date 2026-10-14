import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ReimbursementService } from "../../../services/ReimbursementService";

const Index = () => {
  const [reimburse, setReimburse] = useState();

  useEffect(() => {
    const fetchReimbursement = async () => {
      const userId = localStorage.getItem("id")
      try {
      const response = await ReimbursementService.viewReimbursement(userId);

      setReimburse(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }

    fetchReimbursement()
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-xl font-bold">Reimbursement</div>
        <Link
          to="/reimbursement/request"
          className="text-white bg-primary hover:bg-primary-100 box-border border rounded border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none inline-flex items-center"
        >
          Request Reimbursement
        </Link>
      </div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Code
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-medium content-evenly">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reimburse?.map((item, idx) => {
              return (
                <tr key={idx} className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {item.requestNumber}
                  </th>
                  <td className="px-6 py-4">{item.submitDate}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 text-heading text-md font-medium px-1.5 py-0.5 rounded">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to="/reimbursement/request"
                      className="font-medium text-fg-brand hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/reimbursement/detail/${item.code}`}
                      className="font-medium text-fg-brand hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
