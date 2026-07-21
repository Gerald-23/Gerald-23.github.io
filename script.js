const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEutjheG8yScccuCqd4wGrBHbirF6tJ4RHp0pkhUDwAMwZ0Li-YJijPuN2P24DL-A2/exec";
const SCRIPT_URL_PLACEHOLDER = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
const WHATSAPP_NUMBER = "233597190189";
const WHATSAPP_MESSAGE = "Hello, I just submitted the website enquiry form and would like to continue on WhatsApp.";

const form = document.getElementById("lead-form-form");
const submitButton = document.getElementById("submit-button");
const statusBox = document.getElementById("form-status");
const submittedAtField = document.getElementById("submittedAt");
const pageUrlField = document.getElementById("pageUrl");
const utmSourceField = document.getElementById("utmSource");
const utmMediumField = document.getElementById("utmMedium");
const utmCampaignField = document.getElementById("utmCampaign");
const utmContentField = document.getElementById("utmContent");
const utmTermField = document.getElementById("utmTerm");

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`.trim();
}

function buildWhatsAppUrl(formData) {
  const name = formData.get("fullName") || "there";
  const business = formData.get("businessName") || "my business";
  const intro = `${WHATSAPP_MESSAGE} My name is ${name} and my business is ${business}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(intro)}`;
}

async function submitLead(payload) {
  const body = new URLSearchParams(payload);

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });
}

function fillTrackingFields() {
  const params = new URLSearchParams(window.location.search);

  pageUrlField.value = window.location.href;
  utmSourceField.value = params.get("utm_source") || "";
  utmMediumField.value = params.get("utm_medium") || "";
  utmCampaignField.value = params.get("utm_campaign") || "";
  utmContentField.value = params.get("utm_content") || "";
  utmTermField.value = params.get("utm_term") || "";
}

fillTrackingFields();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (SCRIPT_URL.includes(SCRIPT_URL_PLACEHOLDER)) {
    setStatus("Add your Google Apps Script URL in script.js before using the form.", "error");
    return;
  }

  if (!form.reportValidity()) {
    setStatus("Please complete all required fields.", "error");
    return;
  }

  const formData = new FormData(form);
  submittedAtField.value = new Date().toISOString();
  formData.set("submittedAt", submittedAtField.value);

  const payload = Object.fromEntries(formData.entries());
  payload.consent = formData.get("consent") === "on" ? "Yes" : "No";

  submitButton.disabled = true;
  setStatus("Submitting your details...", "");

  try {
    await submitLead(payload);

    setStatus("Details received. Redirecting you to WhatsApp...", "success");
    window.setTimeout(() => {
      window.location.href = buildWhatsAppUrl(formData);
    }, 700);
  } catch (error) {
    setStatus("We could not submit your details right now. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
  }
});
