export default async function handler(req, res) {
  // Use a fallback to parse URL if req.query is empty (common in local Vercel dev)
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const city = req.query.city || urlParams.get('city');
  const units = req.query.units || urlParams.get('units') || 'metric';
  
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City is required', url: req.url });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
