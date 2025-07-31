

const routes = {
  "Chennai-Bangalore": [
    "₹699 | AC Sleeper | 6:00 PM - 11:30 PM",
    "₹799 | Volvo Multi-Axle | 7:00 PM - 12:00 AM",
    "₹649 | Non-AC Seater | 5:30 PM - 11:00 PM"
  ],
  "Hyderabad-Vijayawada": [
    "₹599 | AC Sleeper | 8:00 PM - 1:00 AM",
    "₹499 | Non-AC | 7:00 PM - 12:00 AM",
    "₹699 | AC Seater | 6:30 PM - 11:30 PM"
  ],
  "Madurai-Coimbatore": [
    "₹599 | Non-AC | 4:30 PM - 9:00 PM",
    "₹749 | AC Sleeper | 5:00 PM - 10:00 PM",
    "₹699 | AC Semi-Sleeper | 6:00 PM - 10:30 PM"
  ],
  "Coimbatore-Chennai": [
    "₹899 | AC Volvo | 9:00 PM - 5:30 AM",
    "₹599 | Non-AC | 7:00 PM - 6:00 AM",
    "₹749 | AC Sleeper | 8:30 PM - 6:00 AM"
  ]
};

let selectedSeats = []; // ✅ Global to track seats

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function searchBuses() {
  const from = toTitleCase(document.getElementById("fromCity").value.trim());
  const to = toTitleCase(document.getElementById("toCity").value.trim());
  const key = `${from}-${to}`;
  const optionsDiv = document.getElementById("busOptions");
  optionsDiv.innerHTML = "";

  if (routes[key]) {
    routes[key].forEach((route, index) => {
      const box = document.createElement("div");
      box.classList.add("bus-box");
      box.innerHTML = `
        <h3>${from} → ${to} - Option ${index + 1}</h3>
        <p>${route}</p>`;
      optionsDiv.appendChild(box);
    });
  } else {
    optionsDiv.innerHTML = `<p>No routes found for ${from} to ${to}.</p>`;
  }

  document.getElementById("busModal").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("busModal").style.display = "none";
  });

  window.addEventListener("click", (e) => {
    const modal = document.getElementById("busModal");
    if (e.target === modal) modal.style.display = "none";
  });
});

document.addEventListener("click", function (e) {
  const busBox = e.target.closest(".bus-box");
  if (busBox) {
    document.getElementById("busModal").style.display = "none";
    openSeatModal();
  }
});

function openSeatModal() {
  const seatGrid = document.getElementById("seatGrid");
  seatGrid.innerHTML = "";
  selectedSeats = []; // reset on every open

  for (let i = 1; i <= 20; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.textContent = `Seat ${i}`;
    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");
      const seatNum = seat.textContent;
      if (seat.classList.contains("selected")) {
        selectedSeats.push(seatNum);
      } else {
        selectedSeats = selectedSeats.filter(s => s !== seatNum);
      }
    });
    seatGrid.appendChild(seat);
  }

  document.getElementById("seatModal").style.display = "flex";
}

document.querySelector(".close-seat").onclick = () => {
  document.getElementById("seatModal").style.display = "none";
};

  // === UPI Modal Controls ===
  function openUPIModal() {
      document.getElementById("upiModal").style.display = "flex";
  }

  function closeUPIModal() {
      document.getElementById("upiModal").style.display = "none";
  }

  function openUpiEntryModal() {
      closeUPIModal(); // Close main UPI modal
      document.getElementById("upiEntryBox").style.display = "flex"; // Open manual entry
  }

  function closeUpiEntryModal() {
      document.getElementById("upiEntryBox").style.display = "none";
  }

  let selectedUPIMethod = ""; // global

function handleUPIMethod(methodName) {
  selectedUPIMethod = methodName;
  closeUPIModal();       // close UPI method selection
  openUpiEntryModal();   // show UPI input modal
}

function openUpiEntryModal() {
  document.getElementById("upiEntryBox").style.display = "flex";
}

function closeUpiEntryModal() {
  document.getElementById("upiEntryBox").style.display = "none";
}

function submitUpiEntry() {
  const upiId = document.getElementById("upiEntryInput").value.trim();
  if (upiId === "" || !upiId.includes("@")) {
    alert("Please enter a valid UPI ID (e.g., name@upi)");
    return;
  }

  const from = document.getElementById("fromCity")?.value || "Chennai";
  const to = document.getElementById("toCity")?.value || "Bangalore";
  const seats = window.selectedSeats?.join(", ") || "N/A";
  const now = new Date().toLocaleString();

  const receiptHTML = `
    <h2>✅ Payment Successful via ${selectedUPIMethod}</h2>
    <p><strong>UPI ID:</strong> ${upiId}</p>
    <p><strong>From:</strong> ${from}</p>
    <p><strong>To:</strong> ${to}</p>
    <p><strong>Seats:</strong> ${seats}</p>
    <p><strong>Time:</strong> ${now}</p>
    <button onclick="closeReceipt()">Close</button>
  `;

  document.getElementById("upiEntryBox").style.display = "none";
  document.getElementById("receiptContent").innerHTML = receiptHTML;
  document.getElementById("receiptModal").style.display = "flex";
}
function closeReceipt() {
  console.log("Closing receipt modal...");
  document.getElementById("receiptModal").style.display = "none";
}



