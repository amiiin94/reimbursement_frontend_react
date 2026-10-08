function Index() {
    return (
        <>
            <div className="flex flex-row justify-between mb-4">
                <div className="text-xl font-bold">Reimbursement Requests</div>
            <button type="button" class="text-white bg-primary hover:bg-primary-100 box-border border rounded border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Request Reimbursement</button>
            </div>
            
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Reimbursement Number
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Submit Date
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Status
                            </th>
                        
                            <th scope="col" class="px-6 py-3 font-medium content-evenly">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-neutral-primary border-b border-default">
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                RMB-001
                            </th>
                            <td class="px-6 py-4">
                                1-1-2026
                            </td>
                            <td class="px-6 py-4">
                                Perjalanan dinas
                            </td>
                            <td class="px-6 py-4">
                                DRAFT
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-fg-brand hover:underline mr-4">Edit</a>
                                <a href="#" class="font-medium text-fg-brand hover:underline">View</a>
                            </td>
                            
                        </tr>
                        <tr class="bg-neutral-primary border-b border-default">
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                RMB-001
                            </th>
                            <td class="px-6 py-4">
                                1-1-2026
                            </td>
                            <td class="px-6 py-4">
                                menuju site
                            </td>
                            <td class="px-6 py-4">
                                DRAFT
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-fg-brand hover:underline mr-4">Edit</a>
                                <a href="#" class="font-medium text-fg-brand hover:underline">View</a>
                            </td>
                        </tr>
                        <tr class="bg-neutral-primary">
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                RMB-001
                            </th>
                            <td class="px-6 py-4">
                                1-1-2026
                            </td>
                            <td class="px-6 py-4">
                                Acara 17 agustus    
                            </td>
                            <td class="px-6 py-4">
                                DRAFT
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-fg-brand hover:underline mr-4">Edit</a>
                                <a href="#" class="font-medium text-fg-brand hover:underline">View</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Index