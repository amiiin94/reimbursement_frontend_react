import { Link } from "react-router";

Approval = () => {
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-xl font-bold">Approval</div>
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
                Requester
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
            <tr className="bg-neutral-primary border-b border-default">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                RMB-001
              </th>
              <td className="px-6 py-4">1-1-2026</td>
              <td className="px-6 py-4">Budi</td>
              <td className="px-6 py-4">Perjalanan dinas</td>
              <td className="px-6 py-4">
                <span className="bg-gray-200 text-heading text-md font-medium px-1.5 py-0.5 rounded">
                  Draft
                </span>
              </td>
              <td className="px-6 py-4">
                <Link
                  to="/approval/form/RMB-001"
                  className="font-medium text-fg-brand hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
            <tr className="bg-neutral-primary border-b border-default">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                RMB-002
              </th>
              <td className="px-6 py-4">1-1-2026</td>
              <td className="px-6 py-4">Budi</td>
              <td className="px-6 py-4">menuju site</td>
              <td className="px-6 py-4 ">
                <span className="bg-yellow-200  text-heading text-md font-medium px-1.5 py-0.5 rounded">
                  Revision
                </span>
              </td>
              <td className="px-6 py-4">
                <Link
                  to="/approval/form/RMB-002"
                  className="font-medium text-fg-brand hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
            <tr className="bg-neutral-primary">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                RMB-003
              </th>
              <td className="px-6 py-4">1-1-2026</td>
              <td className="px-6 py-4">Budi</td>
              <td className="px-6 py-4">Acara 17 agustus</td>
              <td className="px-6 py-4">
                <span className="bg-red-500 text-white text-heading text-md font-medium px-1.5 py-0.5 rounded">
                  Rejected
                </span>
              </td>
              <td className="px-6 py-4">
                <Link
                  to="/approval/form/RMB-003"
                  className="font-medium text-fg-brand hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Approval;
