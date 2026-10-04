// Realistic Space Radar data across Lovely Professional University
const initialCampusSpaces = [
  { 
    id: "space-1",
    name: "Central Library (2nd Floor)", 
    occupancy: 82, 
    status: "Crowded", 
    noise: "Silent Zone", 
    tag: "Study Area",
    block: "Block 25/26"
  },
  { 
    id: "space-2",
    name: "Block 34 Computer Labs", 
    occupancy: 36, 
    status: "Available", 
    noise: "Moderate", 
    tag: "Workstation",
    block: "Block 34"
  },
  { 
    id: "space-3",
    name: "Central Library (3rd Floor Reading Hall)", 
    occupancy: 45, 
    status: "Available", 
    noise: "Pin-Drop Silence", 
    tag: "Study Area",
    block: "Block 25/26"
  },
  { 
    id: "space-4",
    name: "UniMall 1st Floor Common Area", 
    occupancy: 78, 
    status: "Crowded", 
    noise: "Social Buzz", 
    tag: "Social Hub",
    block: "UniMall"
  },
  { 
    id: "space-5",
    name: "Block 38 Innovation Workstation", 
    occupancy: 24, 
    status: "Available", 
    noise: "Quiet", 
    tag: "Workstation",
    block: "Block 38"
  },
  { 
    id: "space-6",
    name: "BH-4 Late Night Reading Room", 
    occupancy: 68, 
    status: "Busy", 
    noise: "Whisper Only", 
    tag: "Hostel Zone",
    block: "BH-4"
  }
];

// Initial Lost & Found reports with realistic tags & items
const initialLostFoundItems = [
  { 
    id: 101, 
    title: "LPU Student Registration ID Card & Lanyard", 
    category: "ID Cards",
    type: "Found", 
    location: "Block 34 Central Stairs", 
    time: "15 mins ago", 
    contact: "Security Guard Desk, Gate 2",
    resolved: false
  },
  { 
    id: 102, 
    title: "Matte Black boAt Airdopes 141 Case", 
    category: "Electronics",
    type: "Lost", 
    location: "Baldev Raj Mittal Unipolis", 
    time: "45 mins ago", 
    contact: "WhatsApp: +91 98881 23456",
    resolved: false
  },
  { 
    id: 103, 
    title: "Casio fx-991EX Scientific Calculator", 
    category: "Gadgets",
    type: "Found", 
    location: "Central Library Ground Reading Hall", 
    time: "2 hrs ago", 
    contact: "Librarian Counter Desk #2",
    resolved: false
  },
  { 
    id: 104, 
    title: "Black Room Key with Red Keychain (BH-2 Room 412)", 
    category: "Keys",
    type: "Lost", 
    location: "UniMall Food Court", 
    time: "3 hrs ago", 
    contact: "Student Welfare Desk",
    resolved: false
  }
];