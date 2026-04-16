import React from 'react';

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
      borderRadius: '24px',
      boxShadow: '0 32px 80px rgba(20, 45, 36, 0.12), 0 0 0 1px rgba(20, 45, 36, 0.05), inset 0 2px 2px rgba(255, 255, 255, 0.8)',
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
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--salvia-primary) 0%, var(--salvia-accent) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#fff' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#DFE2E6' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#DFE2E6' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#DFE2E6' }}></div>
        </div>
      </div>

      {/* Main Dash Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FCFCFD' }}>

        {/* Dashboard Content */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Total Notes Processed</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>1,284</span>
                <span style={{ backgroundColor: '#ECFCCB', color: '#3F6212', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>+12%</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Average Confidence</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>87.2%</span>
                <span style={{ backgroundColor: '#ECFCCB', color: '#3F6212', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>+2.1%</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Review Queue</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1 }}>189</span>
                <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>−24</span>
              </div>
            </div>
          </div>

          {/* Timeline Table */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', padding: '1.5rem', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--salvia-primary)', marginBottom: '1.25rem' }}>Recent Submissions</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {mockData.map((row) => (
                <div key={row.id} style={{ display: 'flex', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #F3F4F6', transition: 'background-color 0.2s', cursor: 'pointer' }} className="hover-bg-gray">

                  {/* Status Pip */}
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.status === 'Processed' ? '#10B981' : row.status === 'Pending' ? '#9CA3AF' : '#F59E0B', marginRight: '1rem' }}></div>

                  {/* Patient Info */}
                  <div style={{ width: '180px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{row.patient}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Owner: {row.owner}</div>
                  </div>

                  {/* Form Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.85rem', color: '#374151' }}>{row.form}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{row.ver}</div>
                  </div>

                  {/* Accuracy Badge */}
                  <div style={{ width: '80px' }}>
                    <span style={{
                      backgroundColor: row.asr > 80 ? 'var(--salvia-accent)' : '#FEF08A',
                      color: row.asr > 80 ? '#19382E' : '#854D0E',
                      padding: '4px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem'
                    }}>
                      ASR {row.asr}%
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div style={{ width: '120px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: row.color, color: row.text, padding: '4px 10px', borderRadius: '24px', fontSize: '0.75rem', fontWeight: 600 }}>
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
