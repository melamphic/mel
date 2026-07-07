import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const ASSETS = [
  { name: 'Favicon', path: '/favicon.png', type: 'image' },
  { name: 'OG Image', path: '/og-image.png', type: 'image' },
  { name: 'Allied World', path: '/illustrations/allied_world.webp', type: 'image' },
  { name: 'Audio World', path: '/illustrations/audio_world.webp', type: 'image' },
  { name: 'Chiro World', path: '/illustrations/chiro_world.webp', type: 'image' },
  { name: 'Clinic World', path: '/illustrations/clinic_world.webp', type: 'image' },
  { name: 'Court Scene', path: '/illustrations/court_scene.webp', type: 'image' },
  { name: 'Dental World', path: '/illustrations/dental_world.webp', type: 'image' },
  { name: 'Globe', path: '/illustrations/globe.webp', type: 'image' },
  { name: 'Hero Flow', path: '/illustrations/hero_flow.webp', type: 'image' },
  { name: 'Hero Scene', path: '/illustrations/hero_scene.webp', type: 'image' },
  { name: 'Hospital Dome (MP4)', path: '/illustrations/hospital_dome.mp4', type: 'video' },
  { name: 'Salvia Footer', path: '/illustrations/salvia_footer.webp', type: 'image' },
  { name: 'Signup Scene', path: '/illustrations/signup_scene.webp', type: 'image' },
  { name: 'Speech World', path: '/illustrations/speech_world.webp', type: 'image' },
  { name: 'Vet World', path: '/illustrations/vet_world.webp', type: 'image' },
];

export const AssetsPage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Brand Assets"
        description="Official Salvia brand assets, logos, and illustrations available for press and partners."
        path="/assets"
      />
      <Header />

      <main style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h1 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 800,
            color: 'var(--salvia-primary)',
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
          }}>
            Brand Assets
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.6,
            marginBottom: '4rem',
            maxWidth: '600px',
          }}>
            View and download official Salvia brand assets, logos, and illustrations.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {ASSETS.map((asset) => (
              <div key={asset.path} style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FAFBFC',
              }}>
                <div style={{
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: '#fff',
                  borderBottom: '1px solid var(--border-subtle)',
                  minHeight: '200px',
                  position: 'relative'
                }}>
                  {asset.type === 'video' ? (
                    <video 
                      src={asset.path} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                    />
                  ) : (
                    <img 
                      src={asset.path} 
                      alt={asset.name} 
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                    />
                  )}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--salvia-primary)', marginBottom: '0.25rem' }}>
                    {asset.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--salvia-text-muted)', marginBottom: '1rem' }}>
                    {asset.path}
                  </div>
                  <a href={asset.path} download target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--salvia-accent)',
                    textDecoration: 'none',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
