import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './components/pages/login';
import RequestForm from './components/pages/reimbursement/RequestForm';
import ApprovalForm from './components/pages/approval/ApprovalForm';
import Reimbursement from './components/pages/reimbursement';
import Sidebar from './components/atom/Sidebar';
import ReimbursementDetail from './components/pages/reimbursement/ReimbursementDetail';
import Approval from './components/pages/approval';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Sidebar />}>
          <Route path="/" element={<Reimbursement />} />
          <Route path="/reimbursement/request" element={<RequestForm />} />
          <Route path="/reimbursement/detail/:id" element={<ReimbursementDetail />} />

          <Route path="/approval" element={<Approval />} />
          <Route path="/approval/form/:id" element={<ApprovalForm />} />
        </Route>

        <Route path='*' element={<NotFound />} />
   
      </Routes>
  );
}

export default App;
