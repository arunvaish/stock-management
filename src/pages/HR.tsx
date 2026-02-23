import React, { useState, useEffect } from 'react';
import '../styles/hr.css';
import RequisitionSlip from '../components/RequisitionSlip';
import MasterList from '../components/MasterList';

interface HRProps {
  activeSubSection?: string;
}

const HR: React.FC<HRProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'department-master');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);


  const renderDepartmentMaster = () => (
    <MasterList
      title="Department Master"
      headers={["Dept ID", "Department Name", "Manager", "Phone", "Status"]}
      rows={[
        ['DPT-001', 'Production', 'Mr. A', '+91-9000000001', 'Active'],
        ['DPT-002', 'Quality', 'Ms. B', '+91-9000000002', 'Active'],
      ]}
    />
  );

  const renderEmployeeMaster = () => (
    <MasterList
      title="Employee Master"
      headers={["Emp ID", "Name", "Department", "Designation", "Email", "Phone"]}
      rows={[
        ['EMP-001', 'Raj Kumar', 'Production', 'Supervisor', 'raj@company.com', '+91-9000000003'],
        ['EMP-002', 'Priya Sharma', 'Quality', 'Executive', 'priya@company.com', '+91-9000000004'],
      ]}
    />
  );

  const renderDesignationMaster = () => (
    <MasterList
      title="Designation Master"
      headers={["Desig ID", "Designation", "Grade", "Status"]}
      rows={[['DES-001', 'Supervisor', 'G2', 'Active'], ['DES-002', 'Executive', 'G1', 'Active']]}
    />
  );

  const renderSalaryGrade = () => (
    <div className="hr-content">
      <div className="content-header">
        <h2>Salary Grade Wise</h2>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Min Salary</th>
              <th>Max Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>G1</td>
              <td>$300</td>
              <td>$500</td>
              <td><button className="btn-action">Edit</button></td>
            </tr>
            <tr>
              <td>G2</td>
              <td>$501</td>
              <td>$800</td>
              <td><button className="btn-action">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceCheck = () => (
    <div className="hr-content">
      <div className="content-header">
        <h2>Attendance Check</h2>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>In</th>
              <th>Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-02-16</td>
              <td>EMP-001</td>
              <td>Raj Kumar</td>
              <td>09:00</td>
              <td>18:00</td>
              <td><span className="badge badge-active">Present</span></td>
            </tr>
            <tr>
              <td>2026-02-16</td>
              <td>EMP-002</td>
              <td>Priya Sharma</td>
              <td>09:15</td>
              <td>18:10</td>
              <td><span className="badge badge-active">Present</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReqSlip = () => (
    <RequisitionSlip
      title="Requisition Slip"
      headers={["Req ID", "Date", "Requested By", "Description", "Status"]}
      rows={[['HRR-001', '2026-02-15', 'EMP-002', 'Office Chairs', 'Pending']]}
    />
  );

  const renderReqApproval = () => (
    <div className="hr-content">
      <div className="content-header">
        <h2>Requisition Approval</h2>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Requested By</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HRR-001</td>
              <td>EMP-002</td>
              <td>Office Chairs</td>
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

  const renderContent = () => {
    switch (activeSubSection) {
      case 'department-master':
        return renderDepartmentMaster();
      case 'employee-master':
        return renderEmployeeMaster();
      case 'designation-master':
        return renderDesignationMaster();
      case 'salary-grade':
        return renderSalaryGrade();
      case 'attendance-check':
        return renderAttendanceCheck();
      case 'requisition-slip':
        return renderReqSlip();
      case 'requisition-approval':
        return renderReqApproval();
      default:
        return renderDepartmentMaster();
    }
  };

  return (
    <div className="hr-container">
      {renderContent()}
    </div>
  );
};

export default HR;
