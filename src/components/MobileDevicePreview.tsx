import React from 'react';

const mockData = [
  { id: 1, patient: 'Luna', form: 'Anaesthesia', asr: 88, status: 'Needs Review', color: '#DBEAFE', text: '#1E40AF' },
  { id: 2, patient: 'Max', form: 'Blood Results', asr: 96, status: 'Processed', color: '#DCFCE7', text: '#166534' },
  { id: 3, patient: 'Bella', form: 'Hospitalisation', asr: 92, status: 'Processed', color: '#DCFCE7', text: '#166534' },
];

export const MobileDevicePreview: React.FC = () => {
  return (
    <div style={{
      width: '300px',
      height: '600px',
      margin: '0 auto',
      backgroundColor: '#fff',
      borderRadius: '44px',
      border: '10px solid #0F172A', // Sturdy Navy Frame
      boxShadow: '0 40px 100px -20px rgba(15, 23, 42, 0.25)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left'
    }}>
      {/* Phone Notch */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '28px',
        backgroundColor: '#0F172A',
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        zIndex: 20
      }} />

      {/* App Nav */}
      <div style={{
        padding: '2.5rem 1.5rem 1rem',
        borderBottom: '1px solid #F1F5F9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'linear-gradient(135deg, var(--salvia-primary) 0%, var(--salvia-accent) 100%)' }} />
          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A', letterSpacing: '-0.01em' }}>Clinical Auditor</span>
        </div>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0' }} />
      </div>

      {/* App Scrollable Content */}
      <div style={{ flex: 1, backgroundColor: '#FCFCFD', overflowY: 'auto', padding: '1.25rem' }}>
        
        {/* KPI Stack */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, marginBottom: '0.25rem' }}>TOTAL NOTES</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>1,284</div>
            <div style={{ color: '#16A34A', fontSize: '0.6rem', fontWeight: 800, marginTop: '0.2rem' }}>+12%</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #EBECEF', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, marginBottom: '0.25rem' }}>ACCURACY</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>87.2%</div>
            <div style={{ color: '#16A34A', fontSize: '0.6rem', fontWeight: 800, marginTop: '0.2rem' }}>+2.1%</div>
          </div>
        </div>

        {/* Submissions List */}
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Recent Submissions
          <span style={{ fontSize: '0.65rem', color: 'var(--salvia-accent)', fontWeight: 800 }}>VIEW ALL</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {mockData.map((row) => (
            <div key={row.id} style={{ 
              padding: '1rem', background: '#fff', borderRadius: '16px', 
              border: '1px solid #EBECEF', display: 'flex', alignItems: 'center', gap: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
            }}>
              <div style={{ 
                width: '8px', height: '8px', borderRadius: '50%', 
                backgroundColor: row.status === 'Processed' ? '#10B981' : '#F59E0B' 
              }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>{row.patient}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{row.form}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                 <div style={{ 
                   fontSize: '0.65rem', fontWeight: 800, color: row.text, 
                   backgroundColor: row.color, padding: '0.2rem 0.5rem', borderRadius: '89px',
                   marginBottom: '0.25rem'
                 }}>{row.status === 'Needs Review' ? 'Review' : 'OK'}</div>
                 <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8' }}>ASR {row.asr}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ 
            height: '42px', background: 'var(--salvia-primary)', borderRadius: '12px', 
            color: '#fff', fontSize: '0.85rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            New Visit Note
          </div>
        </div>

      </div>

      {/* Home Indicator */}
      <div style={{
        height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
      }}>
        <div style={{ width: '80px', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '10px' }} />
      </div>

    </div>
  );
};
