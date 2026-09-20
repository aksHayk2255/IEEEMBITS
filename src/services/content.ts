import { supabase } from '../lib/supabase';

export type ContentTable = 'events' | 'projects' | 'achievements' | 'team_members' | 'gallery' | 'announcements';

export async function listContent(table: ContentTable) {
  if (!supabase) return { data: [], error: null };
  const query = supabase.from(table).select('*');
  const ordered = table === 'events' ? query.order('date', { ascending: false })
    : table === 'team_members' || table === 'gallery' ? query.order('display_order')
    : table === 'announcements' ? query.order('priority', { ascending: false }) : query.order('created_at', { ascending: false });
  return ordered;
}

export async function saveContent(table: ContentTable, values: Record<string, unknown>, id?: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  if (id) return supabase.from(table).update(values).eq('id', id).select().single();
  return supabase.from(table).insert(values).select().single();
}

export async function deleteContent(table: ContentTable, id: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase.from(table).delete().eq('id', id);
}

export async function uploadContentImage(bucket: string, file: File) {
  if (!supabase) throw new Error('Supabase is not configured.');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use JPG, PNG, or WebP images.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Images must be 5 MB or smaller.');
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
