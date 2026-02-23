import React, { useState, useEffect } from 'react';
import '../styles/dispatch.css';
import RequisitionSlip from '../components/RequisitionSlip';
import ApprovalList from '../components/ApprovalList';

interface DispatchProps {
  activeSubSection?: string;
}

const Dispatch: React.FC<DispatchProps> = ({ activeSubSection: initialSubSection }) => {
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
        ['DRS-001', '2026-02-15', 'Quality A', 'Packaging Box', '50', 'Pending', 'View'],
        ['DRS-002', '2026-02-14', 'Quality B', 'Labels', '100', 'Approved', 'View'],
        ['DRS-003', '2026-02-13', 'Quality C', 'Packing Material', '30', 'Fulfilled', 'View'],
      ]}
    />
  );

  const renderRequisitionApproval = () => (
    <ApprovalList
      title="Requisition Approval"
      headers={["Req ID", "Requested By", "Material", "Qty", "Date", "Status"]}
      rows={[
        ['DRS-001', 'Quality A', 'Packaging Box', '50', '2026-02-15', 'Pending'],
        ['DRS-004', 'Quality D', 'Bubble Wrap', '20', '2026-02-16', 'Pending'],
      ]}
    />
  );

  const renderQualityMaterialReceived = () => (
    <div className="dispatch-content">
      <div className="content-header">
        <h2>Quality Material Received</h2>
        <button className="btn btn-primary">+ Receive Material</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Receipt ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>From Quality</th>
              <th>Received Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DQR-001</td>
              <td>Steel Plate</td>
              <td>10</td>
              <td>Quality A</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
            <tr>
              <td>DQR-002</td>
              <td>Aluminum Rod</td>
              <td>20</td>
              <td>Quality B</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-approved">Verified</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
            <tr>
              <td>DQR-003</td>
              <td>Copper Wire</td>
              <td>15</td>
              <td>Quality C</td>
              <td>2026-02-13</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDispatchNote = () => (
    <div className="dispatch-content">
      <div className="content-header">
        <h2>Dispatch Note</h2>
        <button className="btn btn-primary">+ Create Dispatch Note</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Dispatch ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Destination</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DN-001</td>
              <td>Steel Plate</td>
              <td>8</td>
              <td>Customer A</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-pending">Pending</span></td>
              <td><button className="btn-action">Edit</button></td>
            </tr>
            <tr>
              <td>DN-002</td>
              <td>Aluminum Rod</td>
              <td>18</td>
              <td>Customer B</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-active">In Transit</span></td>
              <td><button className="btn-action">Track</button></td>
            </tr>
            <tr>
              <td>DN-003</td>
              <td>Copper Wire</td>
              <td>12</td>
              <td>Customer C</td>
              <td>2026-02-13</td>
              <td><span className="badge badge-fulfilled">Delivered</span></td>
              <td><button className="btn-action">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDispatchApproval = () => (
    <ApprovalList
      title="Dispatch Approval"
      headers={["Dispatch ID", "Material", "Qty", "Destination", "Date", "Status"]}
      rows={[
        ['DN-001', 'Steel Plate', '8', 'Customer A', '2026-02-15', 'Pending'],
        ['DN-004', 'Iron Ingot', '5', 'Customer D', '2026-02-16', 'Pending'],
      ]}
    />
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'requisition-slip':
        return renderRequisitionSlip();
      case 'requisition-approval':
        return renderRequisitionApproval();
      case 'quality-material-received':
        return renderQualityMaterialReceived();
      case 'dispatch-note':
        return renderDispatchNote();
      case 'dispatch-approval':
        return renderDispatchApproval();
      default:
        return renderRequisitionSlip();
    }
  };

  return (
    <div className="dispatch-container">
      {renderContent()}
    </div>
  );
};

export default Dispatch;
