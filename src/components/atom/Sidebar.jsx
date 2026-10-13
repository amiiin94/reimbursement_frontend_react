import { NavLink, Outlet } from 'react-router';

const Sidebar = () => {
  const navBarStyle = ({ isActive }) => {

    return (
      `flex items-center px-2 py-1.5 rounded-base transition-colors group ${
                    isActive
                      ? 'font-bold bg-neutral-tertiary text-fg-brand'
                      : 'text-body hover:bg-neutral-tertiary hover:text-fg-brand hover:font-bold'
                  }`
    )
  }

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
          <div className="text-2xl font-bold mb-4 px-2">
            Reimbursement App
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className={navBarStyle}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Reimbursement</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/approval"
                className={navBarStyle}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Approval</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
         <Outlet />
      </div>
    </>
  );
}

export default Sidebar;