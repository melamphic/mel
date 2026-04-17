import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BLOG_CONTENT } from '../data/blogContent';

export const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const article = BLOG_CONTENT[id as string];

  if (!article) {
    return (
      <div style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <Header />
        <div style={{ padding: '5rem 0' }}>
          <h1 style={{ color: 'var(--salvia-primary)', fontSize: '2.5rem' }}>Article Dossier Not Found</h1>
          <p style={{ color: 'var(--salvia-text-muted)', marginBottom: '2rem' }}>The requested institutional record could not be retrieved.</p>
          <Link to="/blog" className="pill-button" style={{ textDecoration: 'none' }}>Back to Blog Feed</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
        <article className="container" style={{ maxWidth: '800px' }}>

          <Link to="/blog" style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            textDecoration: 'none', color: 'var(--salvia-text-muted)',
            fontSize: '0.9rem', marginBottom: '3rem', fontWeight: 600
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>

          <span style={{
            fontFamily: 'monospace', fontSize: '0.75rem',
            color: 'var(--salvia-accent)', fontWeight: 800,
            letterSpacing: '0.1em'
          }}>
            DOSSIER #2026-04 // {article.tag}
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', margin: '1.5rem 0',
            letterSpacing: '-0.03em', lineHeight: 1.15
          }}>
            {article.q}
          </h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            color: 'var(--salvia-text-muted)', fontSize: '0.9rem',
            marginBottom: '4rem', borderBottom: '1px solid #F1F5F9',
            paddingBottom: '1.5rem'
          }}>
            <span>By {article.author}</span>
            <span style={{ opacity: 0.3 }}>•</span>
            <span>{article.date}</span>
          </div>

          <div className="article-body" style={{
            fontSize: '1.15rem', color: '#334155',
            lineHeight: 1.8,
          }}>
            {article.content}
          </div>

        </article>
      </main>

      <Footer />

      <style>{`
        .article-body h3 {
          font-size: 1.8rem;
          color: var(--salvia-primary);
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .article-body p {
          margin-bottom: 1.8rem;
        }
        .article-body ul {
          margin-bottom: 2.5rem;
          padding-left: 1.5rem;
        }
        .article-body li {
          margin-bottom: 1rem;
        }
        .article-body li strong {
          color: var(--salvia-primary);
        }
      `}</style>
    </div>
  );
};
