let currentSearchText = "";
let selectedPhones = []; 

const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhones(data.data, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''; 
    const showAllContainer = document.getElementById('show-all-container');
    const hero = document.getElementById('hero-section');

    if (phones.length > 0) hero.classList.add('hidden');

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
        phones = phones.slice(0, 12);
    } else {
        showAllContainer.classList.add('hidden');
    }

    phones.forEach((phone, index) => {
        const isSelected = selectedPhones.includes(phone.slug);
        const phoneCard = document.createElement('div');
        phoneCard.className = `bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in text-center flex flex-col items-center`;
        phoneCard.style.animationDelay = `${index * 0.05}s`;

        phoneCard.innerHTML = `
            <div class="bg-slate-50 rounded-2xl p-10 mb-8 w-full flex justify-center">
                <img src="${phone.image}" class="h-48 object-contain" />
            </div>
            <h3 class="text-2xl font-bold mb-4">${phone.phone_name}</h3>
            <p class="text-slate-500 mb-6">There are many variations of passages of available, but the majority have suffered</p>
            <div class="flex flex-col gap-3 w-full">
                <button onclick="handleShowDetails('${phone.slug}')" class="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Show Details</button>
                <button onclick="toggleCompare('${phone.slug}')" class="text-blue-600 font-bold hover:underline">
                    ${isSelected ? 'Remove from Compare' : 'Add to Compare'}
                </button>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll = false) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value || currentSearchText;
    if (searchText) {
        toggleLoadingSpinner(true);
        currentSearchText = searchText;
        loadPhones(searchText, isShowAll);
    }
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const p = data.data;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="bg-slate-50 p-12 flex justify-center border-b"><img src="${p.image}" class="h-64 drop-shadow-xl" /></div>
        <div class="p-10">
            <h3 class="text-3xl font-extrabold mb-6">${p.name}</h3>
            <div class="space-y-4 text-slate-600">
                <p><b>Storage:</b> ${p.mainFeatures?.storage || 'N/A'}</p>
                <p><b>Display:</b> ${p.mainFeatures?.displaySize || 'N/A'}</p>
                <p><b>Chipset:</b> ${p.mainFeatures?.chipSet || 'N/A'}</p>
                <p><b>Memory:</b> ${p.mainFeatures?.memory || 'N/A'}</p>
                <p><b>Release:</b> ${p.releaseDate || 'TBA'}</p>
            </div>
        </div>
    `;
    document.getElementById('show_details_modal').showModal();
}

// Comparison Helpers 
const toggleCompare = (slug) => {
    if (selectedPhones.includes(slug)) {
        selectedPhones = selectedPhones.filter(id => id !== slug);
    } else {
        if (selectedPhones.length >= 2) return alert("Select 2 phones maximum.");
        selectedPhones.push(slug);
    }
    updateComparisonBar();
    handleSearch(false); 
}

const updateComparisonBar = () => {
    const bar = document.getElementById('comparison-bar');
    document.getElementById('compare-count').innerText = selectedPhones.length;
    if (selectedPhones.length > 0) {
        bar.classList.remove('translate-y-40', 'opacity-0');
        bar.classList.add('translate-y-0', 'opacity-100');
    } else {
        bar.classList.add('translate-y-40', 'opacity-0');
    }
}

const openComparisonModal = async () => {
    const content = document.getElementById('comparison-content');
    content.innerHTML = '<p class="w-full text-center py-20">Loading Comparison...</p>';
    comparison_modal.showModal();
    const phoneData = await Promise.all(selectedPhones.map(s => fetch(`https://openapi.programming-hero.com/api/phone/${s}`).then(r => r.json())));
    content.innerHTML = phoneData.map(item => `
        <div class="flex-1 min-w-[300px] p-10">
            <img src="${item.data.image}" class="mx-auto h-48 mb-6" />
            <h4 class="text-xl font-bold text-center mb-6">${item.data.name}</h4>
            <div class="space-y-2 text-sm">
                <p><b>Chipset:</b> ${item.data.mainFeatures.chipSet}</p>
                <p><b>Memory:</b> ${item.data.mainFeatures.memory}</p>
            </div>
        </div>`).join('');
}

const clearComparison = () => { selectedPhones = []; updateComparisonBar(); handleSearch(false); }
const toggleLoadingSpinner = (isLoading) => document.getElementById('loading-spinner').classList.toggle('hidden', !isLoading);
const handleShowAll = () => handleSearch(true);