import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { deleteContent, listContent, saveContent, uploadContentImage, type ContentTable } from '../../services/content';

type FieldType = 'text' | 'textarea' | 'url' | 'date' | 'number' | 'boolean' | 'image' | 'tags';
interface Field { key: string; label: string; type?: FieldType; required?: boolean; }
interface ManagerConfig { table: ContentTable; title: string; bucket?: string; fields: Field[]; }
type EditableRow = Record<string, unknown>;

const configs: Record<string, ManagerConfig> = {
  events: { table: 'events', title: 'Events', bucket: 'events', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'date', label: 'Date', type: 'date', required: true }, { key: 'location', label: 'Location' }, { key: 'registration_url', label: 'Registration URL', type: 'url' }, { key: 'image_url', label: 'Image', type: 'image' }, { key: 'featured', label: 'Featured', type: 'boolean' }, { key: 'published', label: 'Published', type: 'boolean' }] },
  projects: { table: 'projects', title: 'Projects', bucket: 'projects', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'technologies', label: 'Technologies (comma separated)', type: 'tags' }, { key: 'github_url', label: 'GitHub URL', type: 'url' }, { key: 'demo_url', label: 'Demo URL', type: 'url' }, { key: 'image_url', label: 'Image', type: 'image' }, { key: 'featured', label: 'Featured', type: 'boolean' }, { key: 'published', label: 'Published', type: 'boolean' }] },
  achievements: { table: 'achievements', title: 'Achievements', bucket: 'achievements', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'year', label: 'Year', type: 'number', required: true }, { key: 'image_url', label: 'Image', type: 'image' }, { key: 'featured', label: 'Featured', type: 'boolean' }, { key: 'published', label: 'Published', type: 'boolean' }] },
  team: { table: 'team_members', title: 'Team members', bucket: 'team', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'position', label: 'Position', required: true }, { key: 'image_url', label: 'Profile photo', type: 'image' }, { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' }, { key: 'email', label: 'Email', type: 'text' }, { key: 'display_order', label: 'Display order', type: 'number' }, { key: 'active', label: 'Active', type: 'boolean' }] },
  gallery: { table: 'gallery', title: 'Gallery', bucket: 'gallery', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'image_url', label: 'Image URL', type: 'image', required: true }, { key: 'category', label: 'Category' }, { key: 'event_name', label: 'Event name' }, { key: 'display_order', label: 'Display order', type: 'number' }] },
  announcements: { table: 'announcements', title: 'Announcements', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'link_url', label: 'Link URL', type: 'url' }, { key: 'priority', label: 'Priority', type: 'number' }, { key: 'active', label: 'Active', type: 'boolean' }] },
};

const inputClass = 'mt-2 w-full rounded-sm border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent';
const rowLabel = (row: EditableRow) => String(row.title ?? row.name ?? 'Untitled');

export default function AdminManager() {
  const pathKey = useLocation().pathname.split('/')[2] || 'events';
  const config = configs[pathKey] ?? configs.events;
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [editing, setEditing] = useState<EditableRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listContent(config.table);
      if (result.error) throw result.error;
      setRows((result.data ?? []) as EditableRow[]);
      setMessage('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load content.');
    } finally {
      setLoading(false);
    }
  }, [config.table]);

  useEffect(() => { setEditing(null); void load(); }, [load]);

  function updateField(key: string, value: unknown) {
    setEditing((current) => ({ ...(current ?? {}), [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setMessage('');
    const values: Record<string, unknown> = {};
    config.fields.forEach((field) => {
      let value = editing[field.key];
      if (field.type === 'boolean') value = Boolean(value);
      if (field.type === 'number') value = value === '' || value == null ? 0 : Number(value);
      if (field.type === 'tags') value = Array.isArray(value) ? value : String(value ?? '').split(',').map((tag) => tag.trim()).filter(Boolean);
      if (field.type !== 'boolean' && field.type !== 'number' && field.type !== 'tags') value = String(value ?? '');
      values[field.key] = value;
    });
    if ((config.table === 'events' || config.table === 'projects') && 'title' in values) {
      values.slug = String(values.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    try {
      await saveContent(config.table, values, typeof editing.id === 'string' ? editing.id : undefined);
      setMessage('Saved successfully.');
      setEditing(null);
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed.');
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(field: Field, file?: File) {
    if (!file || !config.bucket) return;
    setBusy(true);
    setMessage('');
    try {
      const url = await uploadContentImage(config.bucket, file);
      updateField(field.key, url);
      setMessage('Image uploaded. Save the record to apply it.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  }

  async function removeRow(row: EditableRow) {
    if (typeof row.id !== 'string' || !window.confirm(`Delete “${rowLabel(row)}”?`)) return;
    setBusy(true);
    try {
      await deleteContent(config.table, row.id);
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Delete failed.');
    } finally {
      setBusy(false);
    }
  }

  return <div>
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow text-accent">Admin / {config.title}</p><h1 className="mt-3 font-display text-5xl">{config.title}</h1></div>
      <button disabled={busy} onClick={() => { setMessage(''); setEditing({ published: true, active: true, featured: false, display_order: rows.length }); }} className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-3 text-sm font-medium text-bg disabled:opacity-50"><Plus size={16} /> Add new</button>
    </div>
    {message && <p role="status" className="mt-6 break-words border border-line px-4 py-3 text-sm text-muted">{message}</p>}
    <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-panel text-xs uppercase tracking-wider text-muted"><tr><th className="px-4 py-3">Title / name</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={String(row.id)} className="border-t border-line"><td className="max-w-xs truncate px-4 py-4 text-ink">{rowLabel(row)}</td><td className="px-4 py-4 text-muted">{row.active === false || row.published === false ? 'Inactive' : 'Published'}</td><td className="px-4 py-4"><div className="flex gap-3"><button disabled={busy} title="Edit" onClick={() => { setMessage(''); setEditing({ ...row }); }} className="text-muted hover:text-accent disabled:opacity-50"><Pencil size={16} /></button><button disabled={busy} title="Delete" onClick={() => void removeRow(row)} className="text-muted hover:text-red-300 disabled:opacity-50"><Trash2 size={16} /></button></div></td></tr>)}</tbody>
        </table>
        {loading ? <p className="px-4 py-12 text-center text-sm text-muted">Loading content...</p> : rows.length === 0 && <p className="px-4 py-12 text-center text-sm text-muted">No content has been added yet.</p>}
      </div>
      {editing && <form key={String(editing.id ?? 'new')} onSubmit={submit} className="space-y-4 border border-line bg-panel p-5">
        <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl">{editing.id ? 'Edit item' : 'New item'}</h2><button type="button" onClick={() => setEditing(null)} className="text-sm text-muted">Cancel</button></div>
        {config.fields.map((field) => {
          const value = editing[field.key];
          if (field.type === 'boolean') return <label key={field.key} className="flex items-center gap-3 text-sm text-muted"><input type="checkbox" checked={Boolean(value)} onChange={(event) => updateField(field.key, event.target.checked)} className="accent-[var(--color-accent)]" />{field.label}</label>;
          if (field.type === 'image') return <div key={field.key}><label className="block text-sm text-muted">{field.label}<input type="url" required={field.required} value={String(value ?? '')} onChange={(event) => updateField(field.key, event.target.value)} className={inputClass} placeholder="https://…" /></label>{config.bucket && <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-accent"><Upload size={14} /> Upload image (JPG, PNG, WebP; max 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void uploadImage(field, event.target.files?.[0])} /></label>}</div>;
          const common = { required: field.required, value: field.type === 'tags' && Array.isArray(value) ? value.join(', ') : String(value ?? ''), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(field.key, event.target.value), className: inputClass };
          return <label key={field.key} className="block text-sm text-muted">{field.label}{field.type === 'textarea' ? <textarea {...common} rows={4} /> : <input {...common} type={field.type === 'tags' ? 'text' : field.type ?? 'text'} />}</label>;
        })}
        <button disabled={busy} className="w-full rounded-sm bg-accent px-4 py-3 text-sm font-medium text-bg disabled:opacity-50">{busy ? 'Saving…' : 'Save item'}</button>
      </form>}
    </div>
  </div>;
}
