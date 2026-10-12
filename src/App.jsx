import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './components/pages/login';
import RequestForm from './components/pages/reimbursement/RequestForm';
import ApprovalForm from './components/pages/approval/ApprovalForm';
import Reimbursement from './components/pages/reimbursement';
import Sidebar from './components/atom/Sidebar';
import ReimbursementDetail from './components/pages/reimbursement/ReimbursementDetail';
import Approval from './components/pages/approval';

App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Sidebar />}>
          <Route path="/reimbursement" element={<Reimbursement />} />
          <Route path="/reimbursement/request" element={<RequestForm />} />
          <Route path="/reimbursement/detail" element={<ReimbursementDetail />} />

          <Route path="/approval" element={<Approval />} />
          <Route path="/approval/form" element={<ApprovalForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
