import { API_V1_PREFIX, BRAND_NAME } from '@paso-a-paso/config';
import { AppCard } from '@paso-a-paso/ui';

const sections = ['Usuarios', 'Perros', 'Paseadores', 'Paseos', 'GPS', 'Alertas'];

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', padding: 24, backgroundColor: '#0f172a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gap: 16 }}>
        <AppCard
          eyebrow="WEB ADMIN"
          title={`${BRAND_NAME} · Panel base`}
          description="Pantalla inicial para validar el arranque del panel administrativo y su conexión prevista con la API versionada."
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <p style={{ margin: 0, color: '#334155' }}>
              API esperada: {process.env.NEXT_PUBLIC_API_BASE_URL ?? `http://localhost:4000${API_V1_PREFIX}`}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sections.map((section) => (
                <span
                  key={section}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 999,
                    backgroundColor: '#e2e8f0',
                    color: '#0f172a',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {section}
                </span>
              ))}
            </div>
          </div>
        </AppCard>
      </div>
    </main>
  );
}
