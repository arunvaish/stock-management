import React, { useState, useEffect } from 'react';
import '../styles/production.css';
import RequisitionSlip from '../components/RequisitionSlip';

interface ProductionProps {
  activeSubSection?: string;
}

const Production: React.FC<ProductionProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'requisition-slip');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const renderRequisitionSlip = () => (
    <RequisitionSlip
      title="Requisition Slip"
      headers={["Req ID", "Date", "Requested By", "Material", "Quantity", "Status", "Action"]}
      rows={[
        ['RS-1001', '2026-02-15', 'Shift A', 'Steel Plate', '20', 'Pending', 'View'],
        ['RS-1002', '2026-02-14', 'Shift B', 'Lubricating Oil', '5', 'Approved', 'View'],
      ]}
    />
  );

  const renderRequestApproval = () => (
    <div className="production-content">
      <div className="content-header">
        <h2>Request Approval</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Requested By</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RS-1001</td>
              <td>Shift A</td>
              <td>Steel Plate</td>
              <td>20</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-pending">Pending</span></td>
              <td>
                <button className="btn-action btn-approve">Approve</button>
                <button className="btn-action btn-reject">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProdMaterialRequest = () => (
    <div className="production-content">
      <div className="content-header">
        <h2>Production Material Request</h2>
        <button className="btn btn-primary">+ New Request</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Requested Dept</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PMR-001</td>
              <td>Aluminum Rod</td>
              <td>30</td>
              <td>Production A</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProdMaterialApproval = () => (
    <div className="production-content">
      <div className="content-header">
        <h2>Production Material Approval</h2>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Submitted By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PMR-001</td>
              <td>Aluminum Rod</td>
              <td>30</td>
              <td>Shift A</td>
              <td>2026-02-14</td>
              <td>
                <button className="btn-action btn-approve">Approve</button>
                <button className="btn-action btn-reject">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMaterialSendToQuality = () => (
    <div className="production-content">
      <div className="content-header">
        <h2>Material Send to Quality</h2>
        <button className="btn btn-primary">+ Send to Quality</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Send ID</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SQ-001</td>
              <td>Steel Plate</td>
              <td>10</td>
              <td>Quality Lab</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-active">Sent</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'requisition-slip':
        return renderRequisitionSlip();
      case 'request-approval':
        return renderRequestApproval();
      case 'material-request':
        return renderProdMaterialRequest();
      case 'material-approval':
        return renderProdMaterialApproval();
      case 'send-quality':
        return renderMaterialSendToQuality();
      default:
        return renderRequisitionSlip();
    }
  };

  return (
    <div className="production-container">
      {renderContent()}
    </div>
  );
};

export default Production;
