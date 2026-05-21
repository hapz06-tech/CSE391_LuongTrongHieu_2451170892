const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const historyList = document.getElementById('historyList');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const successState = document.getElementById('successState');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const weatherDesc = document.getElementById('weatherDesc');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

function renderHistory() {
    historyList.innerHTML = '';
    searchHistory.forEach(city => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.textContent = city;
        li.addEventListener('click', () => {
            cityInput.value = city;
            getWeather(city);
        });
        historyList.appendChild(li);
    });
}

function saveToHistory(city) {
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase());
    searchHistory.unshift(city);
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    renderHistory();
}

function showState(state) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    successState.classList.add('hidden');

    if (state === 'loading') loadingState.classList.remove('hidden');
    if (state === 'error') errorState.classList.remove('hidden');
    if (state === 'success') successState.classList.remove('hidden');
}

async function getWeather(city) {
    if (!city) return;
    
    showState('loading');
    
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        
        if (!response.ok) {
            throw new Error('Thành phố không tồn tại hoặc lỗi mạng');
        }

        const data = await response.json();
        const current = data.current_condition[0];
        const location = data.nearest_area[0];

        cityName.textContent = location.areaName[0].value;
        temperature.textContent = `${current.temp_C}°C`;
        humidity.textContent = current.humidity;
        weatherDesc.textContent = current.weatherDesc[0].value;

        saveToHistory(location.areaName[0].value);
        showState('success');
        
    } catch (error) {
        errorMessage.textContent = error.message;
        showState('error');
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value.trim());
    }
});

renderHistory();