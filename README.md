# Weather Dashboard 🌤️

A dynamic, fully responsive modern Weather App built with vanilla HTML, CSS, and JavaScript. Features a sleek glassmorphism UI, real-time live weather fetching using the OpenWeather API, instant unit conversions, and interactive Light & Dark themes.

## ✨ Features
* **Real-time Weather**: Current conditions, Description, Temperature, High/Low, Humidity, and Wind speed derived live from the `OpenWeatherMap.org` API.
* **Smart Search**: Input a city to instantly pull and display live metric data.
* **Glassmorphism Design**: High quality, translucent UI layers designed over deep gradient backgrounds.
* **Instant Unit Conversion**: Toggle seamlessly between Celsius and Fahrenheit in Settings. Math logic recalculates High/Low parameters and wind-speeds (km/h vs mph) on the fly without refreshing the data.
* **Dynamic Theme Toggle**: Switch seamlessly from 'Dark Theme' to 'Light Theme' using CSS variables and smooth 0.4s CSS transition animations across the entire application interface.
* **Secure API Environment**: Abstracted fetching logic utilizing a Vercel Serverless Function (`api/weather.js`) to ensure API Keys remain securely hidden from client-side code on public repositories.

## 🛠️ Built With...
* **HTML5** & **CSS3** (CSS Variables, Flexbox, Grid, keyframe animations)
* **Vanilla JavaScript** (ES6, Async/Await Fetch API, DOM manipulation)
* **Vercel Serverless Functions** (Node.js backend proxy)
* **Phosphor Icons** (Scalable vector cryptography)

## 🚀 Local Development Setup

To run this application locally without Vercel:
1. Clone the repository.
   ```bash
   git clone https://github.com/ayushgupta010/weather.git
   ```
2. For the local serverless functions to emulate correctly, it is highly recommended to use Vercel CLI. Install it if you haven't:
    ```bash
    npm i -g vercel
    ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   WEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
   ```
4. Run the local development server:
   ```bash
   vercel dev
   ```

## 🌍 Vercel Deployment
This project is configured out-of-the-box for optimal deployment on **Vercel**. 
1. Push your code to your GitHub repository.
2. Link the repository to your Vercel Dashboard.
3. Be sure to navigate to **Settings -> Environment Variables** in Vercel and add your API Key:
   * **Key**: `WEATHER_API_KEY`
   * **Value**: `YOUR_OPENWEATHER_API_KEY`
4. Deploy! Vercel handles the `api/weather.js` serverless fetch logic automatically.
