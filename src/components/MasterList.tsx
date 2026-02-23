import React from 'react';
import '../styles/requisition.css';

type MasterListProps = {
  title?: string;
  headers: string[];
  rows: string[][];
};

const MasterList: React.FC<MasterListProps> = ({ title = 'Master List', headers, rows }) => {
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
        <button className="btn btn-primary">+ Add</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
              <th>Action</th>
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
                <td>
                  <button className="btn-action">Edit</button>
                  <button className="btn-action">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterList;
