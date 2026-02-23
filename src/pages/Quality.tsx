import React, { useState, useEffect } from 'react';
import '../styles/quality.css';
import RequisitionSlip from '../components/RequisitionSlip';
import ApprovalList from '../components/ApprovalList';

interface QualityProps {
  activeSubSection?: string;
}

const Quality: React.FC<QualityProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'requisition-slip');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const qualityMenuItems = [
    { id: 'requisition-slip', label: 'Requisition Slip', icon: '🧾' },
    { id: 'requisition-approval', label: 'Requisition Approval', icon: '✅' },
    { id: 'prod-material-received', label: 'Production Material Received', icon: '📥' },
    { id: 'send-to-dispatch', label: 'Material Send to Dispatch', icon: '🚚' },
  ];

  const renderRequisitionSlip = () => (
    <RequisitionSlip
      title="Requisition Slip"
      headers={["Req ID", "Date", "Requested By", "Material", "Quantity", "Status", "Action"]}
      rows={[
        ['QRS-001', '2026-02-15', 'Production A', 'Steel Plate', '10', 'Pending', 'View'],
        ['QRS-002', '2026-02-14', 'Production B', 'Aluminum Rod', '20', 'Approved', 'View'],
      ]}
    />
  );

  const renderRequisitionApproval = () => (
    <ApprovalList
      title="Requisition Approval"
      headers={["Req ID", "Requested By", "Material", "Qty", "Date", "Status"]}
      rows={[['QRS-001', 'Production A', 'Steel Plate', '10', '2026-02-15', 'Pending']]}
    />
  );

  const renderProdMaterialReceived = () => (
    <div className="quality-content">
      <div className="content-header">
        <h2>Production Material Received</h2>
        <button className="btn btn-primary">+ Receive Material</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Receipt ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>From</th>
              <th>Received Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>QMR-001</td>
              <td>Steel Plate</td>
              <td>10</td>
              <td>Production A</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSendToDispatch = () => (
    <div className="quality-content">
      <div className="content-header">
        <h2>Material Send to Dispatch</h2>
        <button className="btn btn-primary">+ Send to Dispatch</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Dispatch ID</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Destination</th>
              <th>Sent Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>QD-001</td>
              <td>Steel Plate</td>
              <td>8</td>
              <td>Warehouse</td>
              <td>2026-02-16</td>
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
      case 'requisition-approval':
        return renderRequisitionApproval();
      case 'material-received':
        return renderProdMaterialReceived();
      case 'send-dispatch':
        return renderSendToDispatch();
      default:
        return renderRequisitionSlip();
    }
  };

  return (
    <div className="quality-container">
      {renderContent()}
    </div>
  );
};

export default Quality;
