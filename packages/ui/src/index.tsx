import * as React from 'react';

export interface AppCardProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function AppCard({ eyebrow, title, description, children }: AppCardProps) {
  return (
    <section
      style={{
        borderRadius: 18,
        padding: 24,
        backgroundColor: '#ffffff',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        border: '1px solid #e2e8f0',
        display: 'grid',
        gap: 12,
      }}
    >
      <p style={{ margin: 0, color: '#0f766e', fontWeight: 700, letterSpacing: '0.08em' }}>{eyebrow}</p>
      <div>
        <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{title}</h2>
        <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>{description}</p>
      </div>
      {children}
    </section>
  );
}
