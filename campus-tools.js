let currentSpaces = typeof initialCampusSpaces !== "undefined" ? [...initialCampusSpaces] : [];

// Render Space Radar Cards
function renderSpaces() {
  const container = document.getElementById("spaces-container");
  if (!container) return;

  container.innerHTML = currentSpaces.map(s => {
    const isAvailable = s.occupancy < 65;
    const badgeStyle = isAvailable 
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
      : "text-amber-400 bg-amber-500/10 border-amber-500/20";

    return `
      <div class="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex flex-col justify-between hover:border-slate-700 transition">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-bold text-white text-xs leading-snug">${s.name}</h4>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[10px] text-orange-400/90 font-medium">${s.block}</span>
              <span class="text-[10px] text-slate-400">• <i class="fa-solid fa-volume-low text-slate-500 mr-0.5"></i>${s.noise}</span>
            </div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-md font-semibold border ${badgeStyle}">${s.status}</span>
        </div>
        <div class="mt-2">
          <div class="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Capacity</span>
            <span class="font-bold text-slate-200">${s.occupancy}%</span>
          </div>
          <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div class="h-full transition-all duration-500 ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}" style="width: ${s.occupancy}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Dynamic Radar Occupancy Simulation
function refreshSpaces() {
  currentSpaces = currentSpaces.map(s => {
    const shift = Math.floor(Math.random() * 19) - 9;
    const newOcc = Math.min(98, Math.max(12, s.occupancy + shift));
    return {
      ...s,
      occupancy: newOcc,
      status: newOcc > 65 ? "Crowded" : "Available"
    };
  });
  renderSpaces();
}

// Quick Chip Auto-Send
function sendQuickQuery(text) {
  const input = document.getElementById("chat-input");
  if (!input) return;
  input.value = text;
  document.getElementById("chat-form")?.dispatchEvent(new Event("submit"));
}

// Automated Campus Bot Handler
function handleChat(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById("chat-messages");

  // Add User Message Bubble
  chatBox.innerHTML += `
    <div class="bg-orange-600 text-white p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] text-right text-xs shadow">
      <p>${text}</p>
    </div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate Response
  setTimeout(() => {
    let reply = "For administrative concerns, head over to the Division of Student Welfare (DSW) at Block 13 or lodge an RMS complaint on your UMS portal.";
    const q = text.toLowerCase();

    if (q.includes("print") || q.includes("xerox")) {
      reply = "🖨️ <b>Late-Night Xerox:</b> Ground Floor shops in UniMall and the kiosk opposite Boys Hostel 4 remain open till late evening.";
    } else if (q.includes("id card") || q.includes("lost card")) {
      reply = "🆔 <b>Lost ID Card:</b> Post it in our feed above first! If still lost, visit Block 30 (Registrar Office) to submit an affidavit and issue a duplicate.";
    } else if (q.includes("quiet") || q.includes("study") || q.includes("library")) {
      reply = "📚 <b>Quiet Workspaces:</b> The 2nd & 3rd floors of Central Library and the study rooms in Block 38 have maximum silent seating available right now.";
    } else if (q.includes("mess") || q.includes("food") || q.includes("dinner")) {
      reply = "🍲 <b>Mess Schedule:</b> Regular mess dinner runs between 7:30 PM and 9:30 PM. UniMall food courts are open till 11:00 PM.";
    } else if (q.includes("gate") || q.includes("entry") || q.includes("timing")) {
      reply = "🚪 <b>Hostel Curfew:</b> Turnstile gates require biometric check-in by 7:00 PM for standard leaves. Special night-out slips must be verified via UMS.";
    }

    chatBox.innerHTML += `
      <div class="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl rounded-tl-none mr-auto max-w-[85%] text-xs">
        <p class="text-slate-300 leading-relaxed">${reply}</p>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 350);
}

// Init when page loads
document.addEventListener("DOMContentLoaded", () => {
  renderSpaces();
});