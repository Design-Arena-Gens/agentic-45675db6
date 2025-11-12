import ContentForm from '../components/ContentForm';

export default function Page() {
  return (
    <div className="container">
      <header className="header">
        <div className="brand">Luxury Travel Social Agent</div>
        <a className="button secondary" href="https://agentic-45675db6.vercel.app" target="_blank" rel="noreferrer">Live</a>
      </header>

      <div className="grid">
        <section className="panel section">
          <ContentForm />
        </section>
        <section className="panel section">
          <div className="small">Tips</div>
          <ul>
            <li>Use specific destinations and experiences.</li>
            <li>Select multiple platforms for tailored copy.</li>
            <li>Adjust tone and length to fit your brand.</li>
          </ul>
        </section>
      </div>

      <div className="footer">Built for high-converting luxury travel content.</div>
    </div>
  );
}
