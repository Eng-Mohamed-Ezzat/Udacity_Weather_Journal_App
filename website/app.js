// Personal API Key for OpenWeatherMap API
const apiKey =  '2ae2ae0ebdfb692d3d09571f62ef4685&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (!zipCode) {
    alert('Please enter a ZIP code');
    return;
  }

  try {
    const weatherData = await getWeatherData(zipCode);
    if (weatherData.main) {
      const newDate = new Date().toLocaleDateString();
      await postData('/add', {
        temperature: weatherData.main.temp,
        date: newDate,
        userResponse: feelings,
      });
      updateUI();
    } else {
      alert('Invalid ZIP code or unable to fetch weather data.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

/* Function to GET Web API Data */
const getWeatherData = async (zipCode) => {
  const response = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`);
  try {
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

/* Function to GET Project Data and update the UI */
const updateUI = async () => {
  const response = await fetch('/all');
  try {
    const data = await response.json();
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temperature)}°F`;
    document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
  } catch (error) {
    console.error('Error updating UI:', error);
  }
};
