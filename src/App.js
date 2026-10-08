import './App.css';
import Login from './components/pages/login';
import RequestForm from './components/pages/reimbursement/RequestForm';
import ItemForm from './components/pages/reimbursement/ItemForm';
import ApprovalForm from './components/pages/approval/ApprovalForm';
import Reimbursement from './components/pages/reimbursement';
import Sidebar from './components/atom/Sidebar';

function App() {
  return (
    <>
  
        <Sidebar>
          <Reimbursement></Reimbursement  >
      
        </Sidebar>
        
   

    </>
  );
}

export default App;
