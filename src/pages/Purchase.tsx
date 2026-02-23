import React, { useState, useEffect } from 'react';
import '../styles/purchase.css';
import ApprovalList from '../components/ApprovalList';
import MasterList from '../components/MasterList';

interface PurchaseProps {
  activeSubSection?: string;
}

const Purchase: React.FC<PurchaseProps> = ({ activeSubSection: initialSubSection }) => {
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSubSection || 'unit-master');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const renderUnitMaster = () => (
    <MasterList
      title="Unit Master"
      headers={["Unit ID", "Unit Name", "Unit Code", "Description", "Conversion Factor", "Status"]}
      rows={[
        ['U-001', 'Kilogram', 'KG', 'Weight measurement unit', '1.0', 'Active'],
        ['U-002', 'Piece', 'PC', 'Individual item unit', '1.0', 'Active'],
        ['U-003', 'Liter', 'LTR', 'Volume measurement unit', '1.0', 'Active'],
      ]}
    />
  );

  const renderItemMaster = () => (
    <div className="purchase-content">
      <div className="content-header">
        <h2>Item Master</h2>
        <button className="btn btn-primary">+ Add New Item</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Code</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ITE-001</td>
              <td>Steel Plate Grade A</td>
              <td>SPA-001</td>
              <td>Raw Materials</td>
              <td>KG</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>ITE-002</td>
              <td>Aluminum Rod</td>
              <td>ALR-002</td>
              <td>Raw Materials</td>
              <td>KG</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>ITE-003</td>
              <td>Testing Chemical</td>
              <td>TCH-003</td>
              <td>Chemicals</td>
              <td>LTR</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>ITE-004</td>
              <td>Lubricating Oil</td>
              <td>LUB-004</td>
              <td>Oils & Lubricants</td>
              <td>LTR</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPurchaseOrder = () => (
    <div className="purchase-content">
      <div className="content-header">
        <h2>Purchase Order</h2>
        <button className="btn btn-primary">+ Create New PO</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Vendor</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>PO Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PO-2026-001</td>
              <td>Steel Industries Ltd</td>
              <td>Steel Plate Grade A</td>
              <td>100</td>
              <td>$250.00</td>
              <td>$25,000.00</td>
              <td>2026-02-15</td>
              <td><span className="badge badge-pending">Pending</span></td>
              <td><button className="btn-action">View</button><button className="btn-action">Edit</button></td>
            </tr>
            <tr>
              <td>PO-2026-002</td>
              <td>Chemical Suppliers Inc</td>
              <td>Testing Chemical</td>
              <td>50</td>
              <td>$100.00</td>
              <td>$5,000.00</td>
              <td>2026-02-14</td>
              <td><span className="badge badge-approved">Approved</span></td>
              <td><button className="btn-action">View</button><button className="btn-action">Edit</button></td>
            </tr>
            <tr>
              <td>PO-2026-003</td>
              <td>Al-Metal Corp</td>
              <td>Aluminum Rod</td>
              <td>75</td>
              <td>$180.00</td>
              <td>$13,500.00</td>
              <td>2026-02-13</td>
              <td><span className="badge badge-fulfilled">Received</span></td>
              <td><button className="btn-action">View</button><button className="btn-action">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovePO = () => (
    <ApprovalList
      title="Approve Purchase Order"
      headers={["PO Number", "Vendor", "Item", "Total Amount", "Submitted By", "Submitted Date", "Status"]}
      rows={[
        ['PO-2026-001', 'Steel Industries Ltd', 'Steel Plate Grade A', '$25,000.00', 'John Doe', '2026-02-15', 'Pending'],
        ['PO-2026-004', 'Supplier XYZ', 'Spare Parts', '$8,500.00', 'Jane Smith', '2026-02-16', 'Pending'],
      ]}
    />
  );

  const renderVendorMaster = () => (
    <div className="purchase-content">
      <div className="content-header">
        <h2>Vendor Master</h2>
        <button className="btn btn-primary">+ Add New Vendor</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Vendor Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>VND-001</td>
              <td>Steel Industries Ltd</td>
              <td>Mr. Rajesh Kumar</td>
              <td>rajesh@steelind.com</td>
              <td>+91-9123456789</td>
              <td>Mumbai</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>VND-002</td>
              <td>Chemical Suppliers Inc</td>
              <td>Ms. Priya Sharma</td>
              <td>priya@chemsupply.com</td>
              <td>+91-9876543210</td>
              <td>Delhi</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>VND-003</td>
              <td>Al-Metal Corp</td>
              <td>Mr. Vikram Singh</td>
              <td>vikram@almetal.com</td>
              <td>+91-8765432109</td>
              <td>Bangalore</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
            <tr>
              <td>VND-004</td>
              <td>Supplier XYZ</td>
              <td>Mr. Ahmed Khan</td>
              <td>ahmed@supplierxyz.com</td>
              <td>+91-7654321098</td>
              <td>Chennai</td>
              <td><span className="badge badge-active">Active</span></td>
              <td><button className="btn-action">Edit</button><button className="btn-action">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'unit-master':
        return renderUnitMaster();
      case 'item-master':
        return renderItemMaster();
      case 'purchase-order':
        return renderPurchaseOrder();
      case 'approve-po':
        return renderApprovePO();
      case 'vendor-master':
        return renderVendorMaster();
      default:
        return renderUnitMaster();
    }
  };

  return (
    <div className="purchase-container">
      {renderContent()}
    </div>
  );
};

export default Purchase;
