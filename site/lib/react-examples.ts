export const settingsForm = `'use client';
import { useState } from 'react';
import 'dawn-and-dusk/styles.css';
import { Button, Input, Textarea, Select, Checkbox, Switch } from 'dawn-and-dusk/react';

// Pass a function that saves to your API and rejects on failure.
export default function Settings({ saveSettings }) {
  const [name, setName] = useState('cxkw');
  const [region, setRegion] = useState('iad1');
  const [description, setDescription] = useState('Tools for thoughtful work.');
  const [digest, setDigest] = useState(true);
  const [deploy, setDeploy] = useState(true);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    if (name.trim().length < 2) { setError('Enter at least two characters.'); return; }
    setPending(true); setError(''); setMessage('Saving changes…');
    try {
      await saveSettings({ name: name.trim(), region, description, digest, deploy });
      setMessage('Changes saved.');
    } catch { setMessage('Changes could not be saved. Try again.'); }
    finally { setPending(false); }
  }
  return <form onSubmit={submit} className="dd-stack" style={{ '--dd-gap': 'var(--dd-space-5)' }}>
    <Input label="Workspace name" value={name} onChange={e => { setName(e.target.value); setError(''); }} error={error} required />
    <Select label="Default region" value={region} onChange={e => setRegion(e.target.value)}>
      <option value="iad1">Washington, D.C.</option><option value="fra1">Frankfurt</option>
    </Select>
    <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} />
    <Checkbox label="Weekly activity digest" checked={digest} onChange={e => setDigest(e.target.checked)} />
    <Switch label="Auto-deploy" checked={deploy} onChange={e => setDeploy(e.target.checked)} />
    <Button type="submit" variant="primary" loading={pending}>Save changes</Button>
    <p role="status" aria-live="polite">{message}</p>
  </form>;
}`;
export const dialogExample = `'use client';
import { useState } from 'react';
import { Button, Dialog } from 'dawn-and-dusk/react';

export default function Confirm() {
  const [open, setOpen] = useState(false);
  return <>
    <Button onClick={() => setOpen(true)}>Review changes</Button>
    <Dialog open={open} onOpenChange={setOpen} title="Ready to publish?"
      footer={<Button onClick={() => setOpen(false)}>Keep editing</Button>}>
      <p>Review your changes before publishing.</p>
    </Dialog>
  </>;
}`;
export const tabsExample = `import { Tabs } from 'dawn-and-dusk/react';

<Tabs label="Project" defaultValue="overview" items={[
  { value: 'overview', label: 'Overview', content: <p>Project overview</p> },
  { value: 'activity', label: 'Activity', content: <p>Recent changes</p> },
  { value: 'billing', label: 'Billing', content: <p>Billing details</p>, disabled: true },
]} />`;
