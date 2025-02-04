export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Paris"; // Default to Paris if not provided
  
    const apiKey = process.env.SECRET_API_KEY; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      return Response.json({
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        date: new Date().toLocaleDateString(),
        summary: `It is currently ${data.current.temp_c}°C with ${data.current.condition.text}.`,
      });
    } catch {
      return Response.json({ error: "Failed to fetch weather data" }, { status: 500 });
    }
  }
  