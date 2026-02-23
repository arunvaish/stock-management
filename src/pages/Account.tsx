import React, { useState, useEffect } from 'react';
import '../styles/account.css';
import RequisitionSlip from '../components/RequisitionSlip';
import ApprovalList from '../components/ApprovalList';

interface AccountProps {
  activeSubSection?: string;
}

const Account: React.FC<AccountProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'requisition-slip');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const renderReqSlip = () => (
    <RequisitionSlip
      title="Requisition Slip"
      headers={["Req ID", "Date", "Requested By", "Amount", "Status"]}
      rows={[['AR-001', '2026-02-15', 'EMP-010', '$1,200.00', 'Pending']]}
    />
  );

  const renderReqApproval = () => (
    <ApprovalList
      title="Requisition Approval"
      headers={["Req ID", "Requested By", "Amount", "Date", "Status"]}
      rows={[['AR-001', 'EMP-010', '$1,200.00', '2026-02-15', 'Pending']]}
    />
  );

  const renderBillEntry = () => (
    <div className="account-content">
      <div className="content-header">
        <h2>Bill Entry</h2>
        <button className="btn btn-primary">+ New Bill</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Bill Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BILL-001</td>
              <td>Steel Industries Ltd</td>
              <td>$25,000.00</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPaymentEntry = () => (
    <div className="account-content">
      <div className="content-header">
        <h2>Payment Entry</h2>
        <button className="btn btn-primary">+ New Payment</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Bill ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAY-001</td>
              <td>BILL-001</td>
              <td>$25,000.00</td>
              <td>2026-02-15</td>
              <td>Bank Transfer</td>
              <td><span className="badge badge-fulfilled">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'requisition-slip':
        return renderReqSlip();
      case 'requisition-approval':
        return renderReqApproval();
      case 'bill-entry':
        return renderBillEntry();
      case 'payment-entry':
        return renderPaymentEntry();
      default:
        return renderReqSlip();
    }
  };

  return (
    <div className="account-container">
      {renderContent()}
    </div>
  );
};

export default Account;
