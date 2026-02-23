import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Store from './Store';
import Purchase from './Purchase';
import Production from './Production';
import Quality from './Quality';
import HR from './HR';
import Account from './Account';
import Dispatch from './Dispatch';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const roleRaw = user?.role ?? '';
  const role = roleRaw.toLowerCase();
  const roleClass = roleRaw.replace(/\s+/g, '-').replace('/', '-').toLowerCase();
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    store: false,
    purchase: false,
    production: false,
    quality: false,
    dispatch: false,
    account: false,
    hr: false,
  });
  const [stats] = useState({
    totalProducts: 150,
    lowStockItems: 12,
    totalValue: 45230.5,
    lastUpdate: new Date().toLocaleDateString(),
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const departmentMenuWithSubItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', isModule: false },
    {
      id: 'store',
      label: 'Store',
      icon: '🏪',
      isModule: true,
      subItems: [
        { id: 'store-request-slip', label: 'Request Slip', parent: 'store' },
        { id: 'store-request-approval', label: 'Request Approval', parent: 'store' },
        { id: 'store-material-issued', label: 'Material Issued', parent: 'store' },
        { id: 'store-material-received', label: 'Material Received', parent: 'store' },
        { id: 'store-material-gate-pass', label: 'Material Gate Pass', parent: 'store' },
      ],
    },
    {
      id: 'purchase',
      label: 'Purchase',
      icon: '🛒',
      isModule: true,
      subItems: [
        { id: 'purchase-unit-master', label: 'Unit Master', parent: 'purchase' },
        { id: 'purchase-item-master', label: 'Item Master', parent: 'purchase' },
        { id: 'purchase-order', label: 'Purchase Order', parent: 'purchase' },
        { id: 'purchase-approve-po', label: 'Approve PO', parent: 'purchase' },
        { id: 'purchase-vendor-master', label: 'Vendor Master', parent: 'purchase' },
      ],
    },
    {
      id: 'production',
      label: 'Production',
      icon: '🏭',
      isModule: true,
      subItems: [
        { id: 'production-requisition-slip', label: 'Requisition Slip', parent: 'production' },
        { id: 'production-request-approval', label: 'Request Approval', parent: 'production' },
        { id: 'production-material-request', label: 'Production Material Request', parent: 'production' },
        { id: 'production-material-approval', label: 'Material Approval', parent: 'production' },
        { id: 'production-send-quality', label: 'Send to Quality', parent: 'production' },
      ],
    },
    {
      id: 'quality',
      label: 'Quality',
      icon: '✓',
      isModule: true,
      subItems: [
        { id: 'quality-requisition-slip', label: 'Requisition Slip', parent: 'quality' },
        { id: 'quality-requisition-approval', label: 'Requisition Approval', parent: 'quality' },
        { id: 'quality-material-received', label: 'Material Received', parent: 'quality' },
        { id: 'quality-send-dispatch', label: 'Send to Dispatch', parent: 'quality' },
      ],
    },
    { id: 'dispatch', label: 'Dispatch', icon: '🚚', isModule: true, subItems: [
        { id: 'dispatch-requisition-slip', label: 'Requisition Slip', parent: 'dispatch' },
        { id: 'dispatch-requisition-approval', label: 'Requisition Approval', parent: 'dispatch' },
        { id: 'dispatch-quality-material-received', label: 'Quality Material Received', parent: 'dispatch' },
        { id: 'dispatch-dispatch-note', label: 'Dispatch Note', parent: 'dispatch' },
        { id: 'dispatch-dispatch-approval', label: 'Dispatch Approval', parent: 'dispatch' },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      icon: '💰',
      isModule: true,
      subItems: [
        { id: 'account-requisition-slip', label: 'Requisition Slip', parent: 'account' },
        { id: 'account-requisition-approval', label: 'Requisition Approval', parent: 'account' },
        { id: 'account-bill-entry', label: 'Bill Entry', parent: 'account' },
        { id: 'account-payment-entry', label: 'Payment Entry', parent: 'account' },
      ],
    },
    {
      id: 'hr',
      label: 'HR',
      icon: '👥',
      isModule: true,
      subItems: [
        { id: 'hr-department-master', label: 'Department Master', parent: 'hr' },
        { id: 'hr-employee-master', label: 'Employee Master', parent: 'hr' },
        { id: 'hr-designation-master', label: 'Designation Master', parent: 'hr' },
        { id: 'hr-salary-grade', label: 'Salary Grade Wise', parent: 'hr' },
        { id: 'hr-attendance-check', label: 'Attendance Check', parent: 'hr' },
        { id: 'hr-requisition-slip', label: 'Requisition Slip', parent: 'hr' },
        { id: 'hr-requisition-approval', label: 'Requisition Approval', parent: 'hr' },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      // If the menu is already open, just close it
      if (prev[menuId]) {
        return { ...prev, [menuId]: false };
      }
      // If opening a new menu, close all others
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = key === menuId;
      });
      return newState;
    });
  };

  const getParentDepartment = (sectionId: string): string | null => {
    // Extract parent department from sub-item IDs like "store-request-slip"
    const parts = sectionId.split('-');
    if (parts.length > 1) {
      return parts[0];
    }
    return null;
  };

  const isMenuItemActive = (menuId: string): boolean => {
    if (activeSection === menuId) return true;
    const parentDept = getParentDepartment(activeSection);
    return parentDept === menuId;
  };

  const shouldMenuBeExpanded = (menuId: string): boolean => {
    return expandedMenus[menuId] || isMenuItemActive(menuId);
  };

  const renderDashboardContent = () => (
    <>
      <div className="dashboard-header">
        <h2>{role === 'admin' ? 'Admin' : role === 'manager' ? 'Manager' : 'Staff'} Dashboard</h2>
        <p>
          {role === 'admin'
            ? 'Complete system overview and control'
            : role === 'manager'
            ? 'Manage inventory and monitoring'
            : 'View assigned inventory'}
        </p>
      </div>

      <div className="stats-grid">
        <div className={`stat-card ${roleClass}-stat`}>
          <h3>Total Products</h3>
          <p className="stat-value">{stats.totalProducts}</p>
          <span className="stat-label">
            {role === 'admin'
              ? 'Products in inventory'
              : role === 'manager'
              ? 'In your category'
              : 'Assigned to you'}
          </span>
        </div>
        <div className={`stat-card ${roleClass}-stat`}>
          <h3>{role === 'staff' ? 'Items Below Min' : 'Low Stock'}</h3>
          <p className="stat-value">{stats.lowStockItems}</p>
          <span className="stat-label">
            {role === 'admin' ? 'Need attention' : role === 'manager' ? 'Require restock' : 'Need restock'}
          </span>
        </div>
        <div className={`stat-card ${roleClass}-stat`}>
          <h3>{role === 'staff' ? 'Recent Activities' : 'Inventory Value'}</h3>
          <p className="stat-value">{role === 'staff' ? '12' : `$${stats.totalValue.toFixed(2)}`}</p>
          <span className="stat-label">
            {role === 'admin' ? 'Estimated value' : role === 'manager' ? 'Your inventory' : 'Last 7 days'}
          </span>
        </div>
        <div className={`stat-card ${roleClass}-stat`}>
          <h3>{role === 'staff' ? 'Tasks' : 'Status'}</h3>
          <p className="stat-value">{role === 'staff' ? '3' : role === 'admin' ? '100%' : stats.lastUpdate}</p>
          <span className="stat-label">
            {role === 'admin' ? 'All systems operational' : role === 'manager' ? 'Today' : 'Pending tasks'}
          </span>
        </div>
      </div>
    </>
  );

  const renderModuleContent = () => {
    // Check for specific sub-items first
    if (activeSection.startsWith('store-')) {
      return <Store activeSubSection={activeSection.replace('store-', '')} />;
    }
    if (activeSection.startsWith('purchase-')) {
      return <Purchase activeSubSection={activeSection.replace('purchase-', '')} />;
    }
    if (activeSection.startsWith('production-')) {
      return <Production activeSubSection={activeSection.replace('production-', '')} />;
    }
    if (activeSection.startsWith('quality-')) {
      return <Quality activeSubSection={activeSection.replace('quality-', '')} />;
    }
    if (activeSection.startsWith('account-')) {
      return <Account activeSubSection={activeSection.replace('account-', '')} />;
    }
    if (activeSection.startsWith('hr-')) {
      return <HR activeSubSection={activeSection.replace('hr-', '')} />;
    }
    if (activeSection.startsWith('dispatch-')) {
      return <Dispatch activeSubSection={activeSection.replace('dispatch-', '')} />;
    }

    // Default module rendering (department level clicks)
    if (activeSection === 'store') return <Store />;
    if (activeSection === 'purchase') return <Purchase />;
    if (activeSection === 'production') return <Production />;
    if (activeSection === 'quality') return <Quality />;
    if (activeSection === 'hr') return <HR />;
    if (activeSection === 'account') return <Account />;
    if (activeSection === 'dispatch') return <Dispatch />;

    return null;
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-title">📦 Stock Management</h1>
        </div>
        <div className="navbar-right">
          <span className="user-info">
            {user?.username} <span className={`role-badge role-${roleClass}`}>{roleRaw.toUpperCase()}</span>
          </span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-main">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {departmentMenuWithSubItems.map((item) => (
              <div key={item.id}>
                <button
                  className={`menu-item ${isMenuItemActive(item.id) ? 'active' : ''} ${
                    item.isModule ? 'module-button' : ''
                  }`}
                  onClick={() => {
                    if (item.isModule) {
                      toggleMenu(item.id);
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.isModule && (
                    <span className={`dropdown-arrow ${shouldMenuBeExpanded(item.id) ? 'open' : ''}`}>
                      ▼
                    </span>
                  )}
                </button>
                {item.isModule &&
                  shouldMenuBeExpanded(item.id) &&
                  item.subItems &&
                  item.subItems.length > 0 && (
                    <div className="submenu">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          className={`submenu-item ${activeSection === subItem.id ? 'active' : ''}`}
                          onClick={() => setActiveSection(subItem.id)}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </aside>

        <div className="dashboard-wrapper">
          {activeSection === 'dashboard' && renderDashboardContent()}
          {activeSection !== 'dashboard' && renderModuleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
