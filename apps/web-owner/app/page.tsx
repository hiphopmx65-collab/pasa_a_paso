import { API_V1_PREFIX, BRAND_NAME, BRAND_TAGLINE } from '@paso-a-paso/config';
import { AppCard } from '@paso-a-paso/ui';

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'linear-gradient(180deg, #ecfeff 0%, #f8fafc 100%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 720, display: 'grid', gap: 16 }}>
        <AppCard
          eyebrow="WEB OWNER"
          title={`${BRAND_NAME} · Dueños`}
          description="Base inicial para que el dueño consulte futuros paseos, estado de su perro y tracking en tiempo real usando un contrato GPS unificado."
        >
          <ul style={{ margin: 0, paddingLeft: 20, color: '#334155', lineHeight: 1.6 }}>
            <li>{BRAND_TAGLINE}</li>
            <li>API esperada: {process.env.NEXT_PUBLIC_API_BASE_URL ?? `http://localhost:4000${API_V1_PREFIX}`}</li>
            <li>FASE 1: pantalla base funcional y lista para crecer.</li>
          </ul>
        </AppCard>
      </div>
    </main>
  );
}
