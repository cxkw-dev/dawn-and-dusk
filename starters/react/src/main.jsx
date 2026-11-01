import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import 'dawn-and-dusk/styles.css';
import { Button, Card, Input, Icon, Badge, ThemeToggle } from 'dawn-and-dusk/react';

function App() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  return <main className="dd-stack" style={{ maxWidth: '38rem', margin: 'var(--dd-space-12) auto', padding: 'var(--dd-space-5)', gap: 'var(--dd-space-6)' }}>
    <span className="dd-logo">dawn &amp; dusk</span>
    <h1 className="dd-h1">make something good</h1>
    <Card>
      <form className="dd-stack" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <Input label="Project name" value={name} onChange={(event) => { setName(event.target.value); setSaved(false); }} placeholder="My project" required />
        <div className="dd-row"><Button type="submit" variant="primary"><Icon name="plus" />Create project</Button><ThemeToggle /></div>
        {saved && <p role="status"><Badge intent="ok">Created</Badge> {name} is ready.</p>}
      </form>
    </Card>
  </main>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
