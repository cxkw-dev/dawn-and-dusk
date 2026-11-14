import { StrictMode, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, Textarea, Select, Checkbox, Switch, Button, Dialog, Tabs } from '../../library/react';
function App() {
  const [name, setName] = useState('Initial'); const [region, setRegion] = useState('a');
  const [checked, setChecked] = useState(false); const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('first'); const [error, setError] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null); const select = useRef<HTMLSelectElement>(null);
  const checkbox = useRef<HTMLInputElement>(null); const dialog = useRef<HTMLDialogElement>(null);
  return <main>
    <form onSubmit={e => { e.preventDefault(); setError(name.length < 2 ? 'Too short' : ''); }}>
      <Input label="Name" value={name} onChange={e => setName(e.target.value)} error={error} />
      <Textarea ref={textarea} name="bio" label="Biography" value={name} onChange={e => setName(e.target.value)} error={error} aria-describedby="external-hint" />
      <p id="external-hint">Shared hint</p>
      <Select ref={select} name="region" label="Region" value={region} onChange={e => setRegion(e.target.value)} error={error}><option value="a">A</option><option value="b">B</option></Select>
      <Checkbox ref={checkbox} name="consent" label="Consent" checked={checked} onChange={e => setChecked(e.target.checked)} hint={0} />
      <Switch label="Updates" checked={checked} onChange={e => setChecked(e.target.checked)} />
      <Checkbox label="Disabled" disabled /><Textarea label="Uncontrolled" defaultValue="Original" /><Select label="Uncontrolled region" defaultValue="b"><option value="a">A</option><option value="b">B</option></Select>
      <Button type="submit">Save</Button>
    </form>
    <output id="state">{name}|{region}|{String(checked)}</output>
    <Button id="ref-check" onClick={() => { document.querySelector('#refs')!.textContent = [textarea.current?.tagName, select.current?.tagName, checkbox.current?.tagName, dialog.current?.tagName].join('|'); }}>Check refs</Button><output id="refs" />
    <Button id="open-dialog" onClick={() => setOpen(true)}>Open dialog</Button>
    <Dialog ref={dialog} open={open} title="Review changes" onOpenChange={setOpen} footer={<><Button id="done-dialog" onClick={() => setOpen(false)}>Done</Button><button style={{visibility:"hidden"}}>Hidden action</button><span inert><button>Inert action</button></span></>}><Input label="Modal field" autoFocus /></Dialog>
    <output id="modal-state">{String(open)}</output>
    <Tabs label="Project" value={tab} onValueChange={setTab} items={[{ value:'first', label:'First', content:<p>First panel</p> }, { value:'disabled', label:'Disabled', content:'Never', disabled:true }, { value:'last', label:'Last', content:<p>Last panel</p> }]} />
    <output id="tab-state">{tab}</output>
  </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
