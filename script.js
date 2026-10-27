const form = document.getElementById("verifyForm");
const certificateIdInput = document.getElementById("certificateId");
const result = document.getElementById("result");
const message = document.getElementById("message");
const copyLinkButton = document.getElementById("copyLinkButton");

function getCertificateIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  // Supports ?id=AP-2026-001 and ?certificateId=AP-2026-001
  return (params.get("id") || params.get("certificateId") || "").trim().toUpperCase();
}

function makeVerificationUrl(id) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("id", id);
  url.hash = "";
  return url.toString();
}

function setImage(elementId, imagePath) {
  const img = document.getElementById(elementId);
  img.onerror = function () {
    img.onerror = null;
    img.alt = "Image not found. Please add the correct image file.";
    img.style.minHeight = "80px";
  };
  img.src = imagePath;
}

function verifyCertificate(rawId, updateUrl = true) {
  const id = rawId.trim().toUpperCase();
  message.className = "message";
  message.textContent = "";

  if (!id) {
    result.hidden = true;
    message.textContent = "Please enter a certificate ID.";
    message.classList.add("error");
    return;
  }

  const record = window.CERTIFICATES && window.CERTIFICATES[id];
  if (!record) {
    result.hidden = true;
    message.textContent = "Certificate not found. Please check the ID and try again.";
    message.classList.add("error");
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("id", id);
      history.replaceState({}, "", url);
    }
    return;
  }

  document.getElementById("studentName").textContent = record.name;
  document.getElementById("studentCnic").textContent = record.cnic;
  document.getElementById("studentCertId").textContent = id;
  document.getElementById("startDate").textContent = record.startDate;
  document.getElementById("endDate").textContent = record.endDate;
  setImage("profileImage", record.profileImage);
  setImage("certificateImage", record.certificateImage);

  result.hidden = false;
  message.textContent = "Certificate record found.";
  message.classList.add("success");

  if (updateUrl) {
    history.replaceState({}, "", makeVerificationUrl(id));
  }
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  verifyCertificate(certificateIdInput.value, true);
});

copyLinkButton.addEventListener("click", async function () {
  const id = document.getElementById("studentCertId").textContent;
  const link = makeVerificationUrl(id);
  try {
    await navigator.clipboard.writeText(link);
    message.textContent = "Verification link copied.";
    message.className = "message success";
  } catch (error) {
    message.textContent = "Copy is unavailable in this browser. Copy this link: " + link;
    message.className = "message success";
  }
});

// Automatically verify when a QR code / URL opens this page with ?id=...
const urlId = getCertificateIdFromUrl();
if (urlId) {
  certificateIdInput.value = urlId;
  verifyCertificate(urlId, false);
}
