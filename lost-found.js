// Load notices from localStorage or fallback to Member 4's seed data
function getStoredItems() {
  const saved = localStorage.getItem("campuspulse_items");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Storage read error", e);
    }
  }
  return [...initialLostFoundItems];
}

let items = getStoredItems();
let activeCategory = "All";

// Category Filter Switcher
function filterByCategory(category) {
  activeCategory = category;
  
  // Update UI active buttons
  const buttons = document.querySelectorAll(".cat-pill");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-category") === category) {
      btn.className = "cat-pill px-3 py-1 text-xs font-semibold rounded-lg bg-orange-600 text-white shadow transition";
    } else {
      btn.className = "cat-pill px-3 py-1 text-xs font-medium rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition";
    }
  });

  renderItems();
}

// Render Notices Feed
function renderItems() {
  const query = (document.getElementById("search-input")?.value || "").toLowerCase().trim();
  const container = document.getElementById("items-container");
  if (!container) return;

  const filtered = items.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(query) || 
      item.location.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
        <p class="text-slate-400 text-xs">No notices found matching current search.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="bg-slate-950 border ${item.resolved ? 'border-emerald-500/30 opacity-70' : 'border-slate-800/80'} p-3 rounded-xl flex items-center justify-between hover:border-slate-700 transition">
      <div class="flex items-center gap-3">
        <span class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px] ${
          item.resolved 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : (item.type === 'Found' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30')
        }">
          ${item.resolved ? '✓' : item.type}
        </span>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-semibold text-white text-xs leading-tight ${item.resolved ? 'line-through text-slate-400' : ''}">${item.title}</h4>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">${item.category}</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-0.5">
            <i class="fa-solid fa-location-dot text-slate-500 mr-1"></i>${item.location} • <span class="text-slate-500">${item.time}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-1.5">
        ${!item.resolved ? `
          <button onclick="toggleResolved(${item.id})" title="Mark as resolved" class="text-xs bg-slate-900 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 px-2 py-1 rounded-lg border border-slate-800 transition">
            <i class="fa-solid fa-check"></i>
          </button>
        ` : '<span class="text-[10px] text-emerald-400 font-bold px-2">Claimed</span>'}
        <button onclick="alert('Notice Contact: ' + '${item.contact}')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 transition">
          Contact
        </button>
      </div>
    </div>
  `).join("");
}

// Mark Item Claimed / Resolved
function toggleResolved(id) {
  items = items.map(item => item.id === id ? { ...item, resolved: true } : item);
  localStorage.setItem("campuspulse_items", JSON.stringify(items));
  renderItems();
}

// Modal open / close
function toggleModal(show) {
  document.getElementById("report-modal")?.classList.toggle("hidden", !show);
}

// Intelligent Match Check
function checkAiMatch(newItem) {
  const oppositeType = newItem.type === "Lost" ? "Found" : "Lost";
  const potentialMatch = items.find(i => 
    i.type === oppositeType && 
    !i.resolved &&
    (i.category === newItem.category || i.title.toLowerCase().includes(newItem.title.toLowerCase().split(" ")[0]))
  );

  const banner = document.getElementById("ai-match-banner");
  if (potentialMatch && banner) {
    banner.classList.remove("hidden");
    banner.innerHTML = `
      <div class="flex items-center justify-between p-3 bg-orange-600/10 border border-orange-500/30 rounded-xl mb-3 text-xs text-orange-300">
        <span class="flex items-center gap-2">
          <i class="fa-solid fa-bolt text-orange-400"></i>
          <span><b>AI Cross-Match:</b> Similar item reported as <b>${potentialMatch.type}</b>: "${potentialMatch.title}" at ${potentialMatch.location}.</span>
        </span>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white ml-2">✕</button>
      </div>
    `;
  }
}

// Submit Notice Form
function submitReport(e) {
  e.preventDefault();
  const title = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const type = document.getElementById("item-status").value;
  const location = document.getElementById("item-location").value;
  const contact = document.getElementById("item-contact").value;

  const newItem = {
    id: Date.now(),
    title,
    category,
    type,
    location,
    time: "Just now",
    contact,
    resolved: false
  };

  checkAiMatch(newItem);

  items.unshift(newItem);
  localStorage.setItem("campuspulse_items", JSON.stringify(items));
  renderItems();
  toggleModal(false);
  e.target.reset();
}

// Init when page loads
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
});