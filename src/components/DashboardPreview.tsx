import React from 'react';
import salviaLogo from '../assets/salvia.png';

const mockData = [
  { id: 1, time: '10:20', patient: 'Luna', owner: 'A. Patel', form: 'Anaesthesia', ver: 'v1.4', asr: 88, status: 'Needs Review', color: '#DBEAFE', text: '#1E40AF' },
  { id: 2, time: '11:05', patient: 'Max', owner: 'S. Torres', form: 'Blood Results', ver: 'v1.0', asr: 96, status: 'Processed', color: '#DCFCE7', text: '#166534' },
  { id: 3, time: '11:45', patient: 'Bella', owner: 'M. Chen', form: 'Hospitalisation', ver: 'v3.0', asr: 92, status: 'Processed', color: '#DCFCE7', text: '#166534' },
  { id: 4, time: '12:10', patient: 'Rex', owner: 'J. Smith', form: 'Physical Exam', ver: 'v2.1', asr: 65, status: 'Pending', color: '#F3F4F6', text: '#4B5563' },
];

export const DashboardPreview: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '920px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-3)',
      overflow: 'hidden',
      display: 'flex',
      height: '520px',
      position: 'relative',
      zIndex: 10,
      transform: 'translateY(10px)',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease'
    }}>
      {/* Sidebar Focus Layer */}
      <div style={{ width: '80px', backgroundColor: '#F8F9FA', borderRight: '1px solid #EBECEF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', gap: '2rem' }}>
        <img
          src={salviaLogo}
          alt="Salvia Logo"
          style={{ width: '64px', height: '64px', objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', backgroundColor: '#DFE2E6' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', backgroundColor: '#DFE2E6' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', backgroundColor: '#DFE2E6' }}></div>
        </div>
      </div>

      {/* Main Dash Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FCFCFD' }}>

        {/* Dashboard Content */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflow: 'hidden' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid #EBECEF', boxShadow: 'var(--shadow-2)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Total Notes Processed</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>1,284</span>
                <span style={{ backgroundColor: '#ECFCCB', color: '#3F6212', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>+12%</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid #EBECEF', boxShadow: 'var(--shadow-2)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Average Confidence</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>87.2%</span>
                <span style={{ backgroundColor: '#ECFCCB', color: '#3F6212', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>+2.1%</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid #EBECEF', boxShadow: 'var(--shadow-2)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Review Queue</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>189</span>
                <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>−24</span>
              </div>
            </div>
          </div>

          {/* Timeline Table */}
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid #EBECEF', padding: '1.5rem', flex: 1, boxShadow: 'var(--shadow-2)' }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--salvia-primary)', marginBottom: '1.25rem' }}>Recent Submissions</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {mockData.map((row) => (
                <div key={row.id} style={{ display: 'flex', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #F3F4F6', transition: 'background-color 0.2s', cursor: 'pointer' }} className="hover-bg-gray">

                  {/* Status Pip */}
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.status === 'Processed' ? 'var(--accent-dental)' : row.status === 'Pending' ? '#9CA3AF' : 'var(--salvia-warning)', marginRight: '1rem' }}></div>

                  {/* Patient Info */}
                  <div style={{ width: '180px' }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#111827' }}>{row.patient}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#6B7280' }}>Owner: {row.owner}</div>
                  </div>

                  {/* Form Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: '#374151' }}>{row.form}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#9CA3AF' }}>{row.ver}</div>
                  </div>

                  {/* Accuracy Badge */}
                  <div style={{ width: '80px' }}>
                    <span style={{
                      backgroundColor: row.asr > 80 ? 'var(--salvia-accent)' : '#FEF08A',
                      color: row.asr > 80 ? '#19382E' : '#854D0E',
                      padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 'var(--text-xs)'
                    }}>
                      ASR {row.asr}%
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div style={{ width: '120px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: row.color, color: row.text, padding: '4px 10px', borderRadius: 'var(--radius-xl)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hover-bg-gray:hover {
          background-color: #F9FAFB;
        }
      `}</style>
    </div>
  );
};
