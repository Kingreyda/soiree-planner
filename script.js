import { addGuest, formatGuestStatus, formatPlusOne } from "./planner.mjs";

let guests = [
  { name: "Mina", status: "Attending", plusOne: "Yes" },
  { name: "Jordan", status: "Regrets", plusOne: "No" },
  { name: "Sage", status: "Attending", plusOne: "Yes" },
  { name: "Rafi", status: "Attending", plusOne: "No" },
];

const drinks = [
  { night: "Night 1", name: "Golden Hour Spritz", note: "Sparkling wine, apricot, rosemary, and a sunset glow." },
  { night: "Night 2", name: "Moonlit Mango Cooler", note: "Rum, mango, lime, and a whisper of basil." },
  { night: "Night 3", name: "Starlight Basil Smash", note: "Gin, cucumber, lemon, and a crisp herb finish." },
];

const openingNight = new Date("2026-08-14T19:00:00");
const countdownElement = document.getElementById("countdown");
const guestListElement = document.getElementById("guest-list");
const drinkMenuElement = document.getElementById("drink-menu");
const rsvpForm = document.getElementById("rsvp-form");
const guestNameInput = document.getElementById("guest-name");

function renderGuests() {
  guestListElement.innerHTML = guests
    .map(
      (guest) => `
        <article class="guest-card">
          <div class="guest-meta">
            <span class="guest-name">${guest.name}</span>
            <span>Plus-one: ${guest.plusOne}</span>
          </div>
          <span class="badge ${guest.status === "Regrets" ? "pending" : ""}">${guest.status}</span>
        </article>
      `
    )
    .join("");
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    return;
  }

  const status = formatGuestStatus(String(formData.get("status") || "Attending"));
  const hasPlusOne = formData.get("plusOne") === "on";

  guests = addGuest(guests, {
    name,
    status,
    plusOne: formatPlusOne(hasPlusOne),
  });

  renderGuests();
  rsvpForm.reset();
  guestNameInput.focus();
}

function renderDrinks() {
  drinkMenuElement.innerHTML = drinks
    .map(
      (drink) => `
        <article class="drink-card">
          <h3>${drink.night}: ${drink.name}</h3>
          <p>${drink.note}</p>
        </article>
      `
    )
    .join("");
}

function updateCountdown() {
  const now = new Date();
  const diff = openingNight - now;

  if (diff <= 0) {
    countdownElement.innerHTML = "<div><strong>Tonight</strong><span>is glowing</span></div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownElement.innerHTML = `
    <div><strong>${days}</strong><span>days</span></div>
    <div><strong>${hours}</strong><span>hours</span></div>
    <div><strong>${minutes}</strong><span>mins</span></div>
    <div><strong>${seconds}</strong><span>secs</span></div>
  `;
}

rsvpForm.addEventListener("submit", handleSubmit);

renderGuests();
renderDrinks();
updateCountdown();
setInterval(updateCountdown, 1000);
