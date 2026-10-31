'use client';
import { useState } from 'react';
import { Button, Card, Input, Icon, ThemeToggle } from 'dawn-and-dusk/react';

export default function Page() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  return <main className="dd-stack" style={{ maxWidth: '38rem', margin: 'var(--dd-space-12) auto', padding: 'var(--dd-space-5)', gap: 'var(--dd-space-6)' }}>
    <span className="dd-logo">dawn &amp; dusk</span>
    <h1 className="dd-h1">make something good</h1>
    <Card>
      <form className="dd-stack" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <Input label="Project name" value={name} onChange={(event) => { setName(event.target.value); setSaved(false); }} required />
        <div className="dd-row"><Button type="submit" variant="primary"><Icon name="plus" />Create project</Button><ThemeToggle /></div>
        {saved && <p role="status">{name} is ready.</p>}
      </form>
    </Card>
  </main>;
}
