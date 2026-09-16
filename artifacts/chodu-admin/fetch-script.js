async function run() {
  const r = await fetch('https://chodu-admin.vercel.app');
  const t = await r.text();
  const match = t.match(/<script.*?src="(.*?)"/);
  if (match) {
    console.log('Found script:', match[1]);
    const r2 = await fetch('https://chodu-admin.vercel.app' + match[1]);
    const t2 = await r2.text();
    console.log(t2.substring(0, 200));
    console.log('Includes Supabase Error?', t2.includes('Missing Supabase environment variables'));
  } else {
    console.log('No script found');
  }
}
run();
