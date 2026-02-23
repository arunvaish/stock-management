import React from 'react';
import '../styles/requisition.css';

type ApprovalListProps = {
  title?: string;
  headers: string[];
  rows: string[][];
  showActions?: boolean;
};

const ApprovalList: React.FC<ApprovalListProps> = ({ title = 'Approval List', headers, rows, showActions = true }) => {
  const getBadgeClass = (status: string) => {
    const s = (status || '').toString().trim().toLowerCase();
    if (!s) return '';
    if (s.includes('pending')) return 'badge-pending';
    if (s.includes('approved')) return 'badge-approved';
    if (s.includes('fulfilled') || s.includes('issued') || s.includes('received') || s.includes('completed')) return 'badge-fulfilled';
    if (s.includes('rejected')) return 'badge-rejected';
    if (s.includes('active')) return 'badge-active';
    return '';
  };

  const isStatusColumn = (index: number) => {
    const h = headers && headers[index];
    return !!(h && h.toString().toLowerCase().includes('status'));
  };

  return (
    <div className="requisition-container">
      <div className="content-header">
        <h2>{title}</h2>
        <div />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
              {showActions && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                {r.map((cell, i) => (
                  isStatusColumn(i) ? (
                    <td key={i}><span className={`badge ${getBadgeClass(cell)}`}>{cell}</span></td>
                  ) : (
                    <td key={i}>{cell}</td>
                  )
                ))}
                {showActions && (
                  <td>
                    <button className="btn-action btn-approve">Approve</button>
                    <button className="btn-action btn-reject">Reject</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalList;
