export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Paris";
    const days = searchParams.get("days") || 5; // Default to 3 days forecast
  
    const apiKey = process.env.SECRET_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
    const forecastDays = data.forecast.forecastday.map(day => ({
      date: day.date,
      averageTemperature: day.day.avgtemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }));
  
      return Response.json({ forecast: forecastDays });
    } catch {
      return Response.json({ error: "Failed to fetch forecast data" }, { status: 500 });
    }
  }