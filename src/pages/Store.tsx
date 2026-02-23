import React, { useState, useEffect } from 'react';
import '../styles/store.css';
import ApprovalList from '../components/ApprovalList';

interface StoreProps {
  activeSubSection?: string;
}

const Store: React.FC<StoreProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'request-slip');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const renderRequestSlip = () => (
    <div className="store-content">
      <div className="content-header">
        <h2>Request Slip</h2>
        <button className="btn btn-primary">+ New Request Slip</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Slip ID</th>
              <th>Date</th>
              <th>Department</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RS-001</td>
              <td>2026-02-15</td>
              <td>Production</td>
              <td>Steel Plate</td>
              <td>50</td>
              <td><span className="badge badge-pending">Pending</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
            <tr>
              <td>RS-002</td>
              <td>2026-02-14</td>
              <td>Quality</td>
              <td>Testing Chemicals</td>
              <td>10</td>
              <td><span className="badge badge-approved">Approved</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
            <tr>
              <td>RS-003</td>
              <td>2026-02-13</td>
              <td>HR</td>
              <td>Office Supplies</td>
              <td>20</td>
              <td><span className="badge badge-fulfilled">Fulfilled</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRequestApproval = () => (
    <ApprovalList
      title="Request Approval"
      headers={["Slip ID", "Requested By", "Material", "Quantity", "Requested Date", "Status"]}
      rows={[
        ['RS-001', 'John Doe', 'Steel Plate', '50', '2026-02-15', 'Pending'],
        ['RS-004', 'Jane Smith', 'Aluminum Rod', '30', '2026-02-16', 'Pending'],
      ]}
    />
  );

  const renderMaterialIssued = () => (
    <div className="store-content">
      <div className="content-header">
        <h2>Material Issued</h2>
        <button className="btn btn-primary">+ Issue Material</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Slip ID</th>
              <th>Material</th>
              <th>Quantity Issued</th>
              <th>Issued Date</th>
              <th>Issued By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MI-001</td>
              <td>RS-002</td>
              <td>Testing Chemicals</td>
              <td>10</td>
              <td>2026-02-14</td>
              <td>Raj Kumar</td>
              <td><span className="badge badge-fulfilled">Issued</span></td>
            </tr>
            <tr>
              <td>MI-002</td>
              <td>RS-003</td>
              <td>Office Supplies</td>
              <td>20</td>
              <td>2026-02-13</td>
              <td>Priya Sharma</td>
              <td><span className="badge badge-fulfilled">Issued</span></td>
            </tr>
            <tr>
              <td>MI-003</td>
              <td>RS-005</td>
              <td>Lubricating Oil</td>
              <td>5</td>
              <td>2026-02-12</td>
              <td>Raj Kumar</td>
              <td><span className="badge badge-fulfilled">Issued</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMaterialReceived = () => (
    <div className="store-content">
      <div className="content-header">
        <h2>Material Received</h2>
        <button className="btn btn-primary">+ Receive Material</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Receipt ID</th>
              <th>PO Number</th>
              <th>Supplier</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Received Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MR-001</td>
              <td>PO-2026-001</td>
              <td>Steel Industries Ltd</td>
              <td>Steel Plate</td>
              <td>100</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
            </tr>
            <tr>
              <td>MR-002</td>
              <td>PO-2026-002</td>
              <td>Chemical Suppliers Inc</td>
              <td>Testing Chemicals</td>
              <td>50</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
            </tr>
            <tr>
              <td>MR-003</td>
              <td>PO-2026-003</td>
              <td>Al-Metal Corp</td>
              <td>Aluminum Rod</td>
              <td>75</td>
              <td>2026-02-13</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMaterialGatePass = () => (
    <div className="store-content">
      <div className="content-header">
        <h2>Material Gate Pass</h2>
        <button className="btn btn-primary">+ Generate Gate Pass</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Gate Pass ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Destination</th>
              <th>Issued Date</th>
              <th>Issued By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GP-001</td>
              <td>Steel Plate</td>
              <td>50</td>
              <td>Production Unit A</td>
              <td>2026-02-15</td>
              <td>Raj Kumar</td>
              <td><span className="badge badge-active">Active</span></td>
            </tr>
            <tr>
              <td>GP-002</td>
              <td>Testing Chemicals</td>
              <td>10</td>
              <td>Quality Lab</td>
              <td>2026-02-14</td>
              <td>Priya Sharma</td>
              <td><span className="badge badge-fulfilled">Completed</span></td>
            </tr>
            <tr>
              <td>GP-003</td>
              <td>Office Supplies</td>
              <td>20</td>
              <td>Admin Office</td>
              <td>2026-02-13</td>
              <td>Raj Kumar</td>
              <td><span className="badge badge-fulfilled">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'request-slip':
        return renderRequestSlip();
      case 'request-approval':
        return renderRequestApproval();
      case 'material-issued':
        return renderMaterialIssued();
      case 'material-received':
        return renderMaterialReceived();
      case 'material-gate-pass':
        return renderMaterialGatePass();
      default:
        return renderRequestSlip();
    }
  };

  return (
    <div className="store-container">
      {renderContent()}
    </div>
  );
};

export default Store;
