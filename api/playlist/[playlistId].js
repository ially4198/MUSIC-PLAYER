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
    // Extract playlistId from the URL path
    const playlistId = req.query.playlistId;

    if (!playlistId) {
      return res.status(400).json({ error: 'Playlist ID is required' });
    }

    const url = `https://api.deezer.com/playlist/${playlistId}`;
    console.log('➡️ BACKEND → Deezer:', url);
    
    const response = await fetch(url);
    
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

