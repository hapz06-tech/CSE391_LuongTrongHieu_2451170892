const refreshBtn = document.getElementById('refreshBtn');
const loadTime = document.getElementById('loadTime');

function setWidgetState(index, state, errorMessage = '') {
    const widget = document.getElementById(`widget-${index}`);
    const loading = widget.querySelector('.loading-state');
    const error = widget.querySelector('.error-state');
    const success = widget.querySelector('.success-state');

    loading.classList.add('hidden');
    error.classList.add('hidden');
    success.classList.add('hidden');

    if (state === 'loading') {
        loading.classList.remove('hidden');
    } else if (state === 'error') {
        error.classList.remove('hidden');
        error.textContent = errorMessage;
    } else if (state === 'success') {
        success.classList.remove('hidden');
    }
}

function renderWidget(index, data) {
    const content = document.getElementById(`content-${index}`);
    content.innerHTML = '';

    if (index === 0) {
        data.forEach(post => {
            const div = document.createElement('div');
            div.className = 'post-item';
            div.innerHTML = `<strong>${post.title}</strong><p>${post.body.substring(0, 60)}...</p>`;
            content.appendChild(div);
        });
    } else if (index === 1) {
        const img = document.createElement('img');
        img.className = 'dog-image';
        img.src = data.message;
        content.appendChild(img);
    } else if (index === 2) {
        const country = data[0];
        content.innerHTML = `
            <p><strong>Tên:</strong> ${country.name.common}</p>
            <p><strong>Thủ đô:</strong> ${country.capital[0]}</p>
            <p><strong>Dân số:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Khu vực:</strong> ${country.region}</p>
            <img class="country-flag" src="${country.flags.svg}" alt="Flag">
        `;
    }
    
    setWidgetState(index, 'success');
}

async function loadDashboard() {
    [0, 1, 2].forEach(i => setWidgetState(i, 'loading'));
    loadTime.textContent = 'Đang tải dữ liệu...';
    refreshBtn.disabled = true;

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3').then(r => {
            if (!r.ok) throw new Error(`Lỗi tải bài viết (HTTP ${r.status})`);
            return r.json();
        }),
        fetch('https://dog.ceo/api/breeds/image/random').then(r => {
            if (!r.ok) throw new Error(`Lỗi tải ảnh cún (HTTP ${r.status})`);
            return r.json();
        }),
        fetch('https://restcountries.com/v3.1/name/vietnam').then(r => {
            if (!r.ok) throw new Error(`Lỗi tải thông tin quốc gia (HTTP ${r.status})`);
            return r.json();
        })
    ]);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            renderWidget(index, result.value);
        } else {
            setWidgetState(index, 'error', result.reason.message);
        }
    });

    const timeTaken = Date.now() - startTime;
    loadTime.textContent = `Data loaded in ${timeTaken} ms`;
    refreshBtn.disabled = false;
}

refreshBtn.addEventListener('click', loadDashboard);

loadDashboard();