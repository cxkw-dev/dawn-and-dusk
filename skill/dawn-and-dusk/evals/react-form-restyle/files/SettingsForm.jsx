import { useState } from 'react';

const TIMEZONES = ['UTC', 'Europe/London', 'Europe/Berlin', 'America/New_York', 'America/Los_Angeles', 'Asia/Tokyo'];
const BIO_MAX = 160;

export default function SettingsForm({ user, onSave, onCancel, saving = false }) {
  const [name, setName] = useState(user.name ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [timezone, setTimezone] = useState(user.timezone ?? 'UTC');
  const [bio, setBio] = useState(user.bio ?? '');
  const [notify, setNotify] = useState({ deploys: true, incidents: true, digest: false, ...user.notify });
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address';
    if (bio.length > BIO_MAX) next.bio = `Keep it under ${BIO_MAX} characters`;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ name: name.trim(), email, timezone, bio, notify });
  }

  const toggle = (key) => setNotify((n) => ({ ...n, [key]: !n[key] }));

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Account settings</h2>
        <p className="mt-1 text-sm text-gray-500">Your profile and how we reach you.</p>
      </div>

      <section className="space-y-5">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800`} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800`} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time zone</label>
          <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
          <textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.bio ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800`} />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{errors.bio ?? 'Shown on your public profile.'}</span>
            <span className={bio.length > BIO_MAX ? 'text-red-600' : ''}>{bio.length} / {BIO_MAX}</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">Notifications</h3>
        {[
          ['deploys', 'Failed deploys', 'Right away, with the build log attached.'],
          ['incidents', 'Incidents', 'When a service you own goes degraded or down.'],
          ['digest', 'Weekly digest', 'Sundays: deploys, uptime and spend in one email.'],
        ].map(([key, label, hint]) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
              <p className="text-xs text-gray-500">{hint}</p>
            </div>
            <button type="button" role="switch" aria-checked={notify[key]} onClick={() => toggle(key)}
              className={`relative inline-flex h-6 w-11 rounded-full transition ${notify[key] ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${notify[key] ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
            </button>
          </div>
        ))}
      </section>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
