export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q, type } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    let url = 'https://api.deezer.com/search';

    if (type === 'artist') url = 'https://api.deezer.com/search/artist';
    if (type === 'album') url = 'https://api.deezer.com/search/album';
    if (type === 'playlist') url = 'https://api.deezer.com/search/playlist';
    if (type === 'song') url = 'https://api.deezer.com/search/track';

    console.log('➡️ BACKEND → Deezer:', `${url}?q=${q}`);
    const response = await fetch(`${url}?q=${encodeURIComponent(q)}`);
    
    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Backend Error:', error.message);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}

