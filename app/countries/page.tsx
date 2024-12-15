import { createClient } from '@/utils/supabase/server';

export default async function Countries() {
  const supabase = await createClient();
  const { data: countries } = await supabase.from("url").select();

  return <pre>{JSON.stringify(countries, null, 2)}</pre>
}