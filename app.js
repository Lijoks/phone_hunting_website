let currentSearchText = "";
let selectedPhones = []; 

/**
 *  Fetching Data
 */
const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhones(data.data, isShowAll);
}

/**
 *  Displaying Phone Cards
 */
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''; 
    const showAllContainer = document.getElementById('show-all-container');
    const hero = document.getElementById('hero-section');

    // Hide hero when results are found
    if (phones.length > 0) hero.classList.add('hidden');

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
        phones = phones.slice(0, 12);
    } else {
        showAllContainer.classList.add('hidden');
    }

    if (phones.length === 0) {
        phoneContainer.innerHTML = `<p class="col-span-full text-center py-20 text-slate-400">No results found for "${currentSearchText}".</p>`;
        toggleLoadingSpinner(false);
        return;
    }

    phones.forEach((phone, index) => {
        const isSelected = selectedPhones.includes(phone.slug);
        const phoneCard = document.createElement('div');
        phoneCard.className = `bg-white p-6 rounded-3xl border ${isSelected ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100'} shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-in`;
        phoneCard.style.animationDelay = `${index * 0.05}s`;

        phoneCard.innerHTML = `
            <div class="bg-slate-50 rounded-2xl p-8 mb-6 flex justify-center items-center h-64 overflow-hidden group">
                <img src="${phone.image}" class="h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div class="text-center">
                <h2 class="text-xl font-black text-slate-800 mb-6">${phone.phone_name}</h2>
                <div class="flex gap-2">
                    <button onclick="handleShowDetails('${phone.slug}')" class="flex-1 bg-slate-100 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">Details</button>
                    <button onclick="toggleCompare('${phone.slug}')" class="flex-1 ${isSelected ? 'bg-red-500' : 'bg-blue-600'} text-white py-3 rounded-xl font-bold transition-all active:scale-95">
                        ${isSelected ? 'Remove' : 'Compare'}
                    </button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

/**
 *  Search Logic
 */
const handleSearch = (isShowAll = false) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value || currentSearchText;
    if (searchText) {
        toggleLoadingSpinner(true);
        currentSearchText = searchText;
        loadPhones(searchText, isShowAll);
    }
}

/**
 *  Single Phone Details Modal
 */
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const p = data.data;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="bg-slate-50 p-10 flex justify-center"><img src="${p.image}" class="drop-shadow-2xl h-60" /></div>
        <div class="p-10">
            <h3 class="font-black text-4xl mb-6">${p.name}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border-b pb-2"><p class="text-slate-400 text-xs font-bold uppercase">Brand</p><p class="font-bold text-lg">${p.brand}</p></div>
                <div class="border-b pb-2"><p class="text-slate-400 text-xs font-bold uppercase">Release</p><p class="font-bold text-lg">${p.releaseDate || 'TBA'}</p></div>
                <div class="border-b pb-2"><p class="text-slate-400 text-xs font-bold uppercase">Chipset</p><p class="font-bold">${p.mainFeatures?.chipSet || 'N/A'}</p></div>
                <div class="border-b pb-2"><p class="text-slate-400 text-xs font-bold uppercase">Storage</p><p class="font-bold">${p.mainFeatures?.storage || 'N/A'}</p></div>
            </div>
        </div>
    `;
    show_details_modal.showModal();
}

/**
 *  Comparison Logic
 */
const toggleCompare = (slug) => {
    if (selectedPhones.includes(slug)) {
        selectedPhones = selectedPhones.filter(id => id !== slug);
    } else {
        if (selectedPhones.length >= 2) {
            alert("You can only compare 2 phones at a time.");
            return;
        }
        selectedPhones.push(slug);
    }
    updateComparisonBar();
    handleSearch(false); 
}

const updateComparisonBar = () => {
    const bar = document.getElementById('comparison-bar');
    const countLabel = document.getElementById('compare-count');
    countLabel.innerText = selectedPhones.length;

    if (selectedPhones.length > 0) {
        bar.classList.remove('translate-y-40', 'opacity-0');
        bar.classList.add('translate-y-0', 'opacity-100');
    } else {
        bar.classList.add('translate-y-40', 'opacity-0');
    }
}

const openComparisonModal = async () => {
    const content = document.getElementById('comparison-content');
    content.innerHTML = '<p class="w-full text-center py-20 font-bold">Fetching Comparison Data...</p>';
    comparison_modal.showModal();

    const phoneData = await Promise.all(
        selectedPhones.map(slug => fetch(`https://openapi.programming-hero.com/api/phone/${slug}`).then(r => r.json()))
    );

    content.innerHTML = phoneData.map(item => {
        const p = item.data;
        return `
            <div class="flex-1 min-w-[300px] p-10 animate-fade-in">
                <div class="flex justify-center mb-10"><img src="${p.image}" class="h-60 object-contain drop-shadow-xl" /></div>
                <h3 class="text-3xl font-black mb-8 text-center">${p.name}</h3>
                <div class="space-y-6">
                    <div class="bg-slate-50 p-4 rounded-2xl"><p class="text-xs text-slate-400 font-bold uppercase mb-1">Chipset</p><p class="font-bold">${p.mainFeatures.chipSet || 'N/A'}</p></div>
                    <div class="bg-slate-50 p-4 rounded-2xl"><p class="text-xs text-slate-400 font-bold uppercase mb-1">Memory</p><p class="font-bold">${p.mainFeatures.memory || 'N/A'}</p></div>
                    <div class="bg-slate-50 p-4 rounded-2xl"><p class="text-xs text-slate-400 font-bold uppercase mb-1">Storage</p><p class="font-bold">${p.mainFeatures.storage || 'N/A'}</p></div>
                    <div class="bg-slate-50 p-4 rounded-2xl"><p class="text-xs text-slate-400 font-bold uppercase mb-1">Sensors</p><p class="text-sm font-medium">${p.mainFeatures.sensors.join(', ')}</p></div>
                </div>
            </div>
        `;
    }).join('');
}

const clearComparison = () => {
    selectedPhones = [];
    updateComparisonBar();
    handleSearch(false); 
}

/**
 *  Utilities
 */
const toggleLoadingSpinner = (isLoading) => {
    document.getElementById('loading-spinner').classList.toggle('hidden', !isLoading);
}
const handleShowAll = () => handleSearch(true);