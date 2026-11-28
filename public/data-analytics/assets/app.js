/**
 * MindLyft AI × C-DAC Landing Pages — Enquiry Modal, Sticky CTAs & Form Handler
 * With Google Sheets & Instant Email Notification Integration + UTM Tracking
 */
(function () {
  "use strict";

  // =========================================================================
  // GOOGLE APPS SCRIPT WEB APP INTEGRATION (Google Sheets & Email Alert)
  // =========================================================================
  const GOOGLE_SCRIPT_URL = window.MINDLYFT_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyXXv_LGYkX3diI0CzbpZ2M90p6v1ryNXP8stubJMRnrx1hZnw-vL4C-Y2mkeqvIIuf/exec";

  // Capture UTM parameters from URL query params or sessionStorage fallback
  function getUtmParameters() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content"];
    const utms = {};

    utmKeys.forEach(function (key) {
      const val = params.get(key);
      if (val && val.trim()) {
        utms[key] = val.trim();
        try {
          sessionStorage.setItem("mindlyft_" + key, val.trim());
        } catch (e) {}
      } else {
        try {
          utms[key] = sessionStorage.getItem("mindlyft_" + key) || "";
        } catch (e) {
          utms[key] = "";
        }
      }
    });

    return utms;
  }

  // Pre-cache UTM parameters on script execution
  getUtmParameters();

  const dialog = document.getElementById("enquiryDialog");
  const modalTitle = document.getElementById("modalTitle");
  const modalSub = document.getElementById("modalSub");
  const modalBadge = document.getElementById("modalBadge");
  const modalIntentInput = document.getElementById("modalIntent");
  const modalSubmitBtn = document.getElementById("modalSubmitBtn");
  const closeDialogBtn = document.getElementById("closeEnquiryDialog");

  function openEnquiryModal(triggerEl) {
    if (!dialog) return;
    document.body.classList.add("modal-open");

    const intent = triggerEl?.getAttribute("data-intent") || "Counsellor Callback";
    const title = triggerEl?.getAttribute("data-title") || "Talk to a Program Counsellor";
    const sub =
      triggerEl?.getAttribute("data-sub") ||
      "Share your details for batch dates, fee details, and a 1:1 eligibility check.";
    const badge = triggerEl?.getAttribute("data-badge") || "FREE COUNSELLING";
    const ctaText = triggerEl?.getAttribute("data-cta") || "Request Callback →";

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = sub;
    if (modalBadge) modalBadge.textContent = badge;
    if (modalIntentInput) modalIntentInput.value = intent;
    if (modalSubmitBtn) modalSubmitBtn.textContent = ctaText;

    // Reset modal form state
    const modalForm = dialog.querySelector("form.lead-form");
    if (modalForm) {
      modalForm.style.display = "flex";
      const err = modalForm.querySelector(".form-error-msg");
      if (err) err.textContent = "";
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = ctaText;
      }
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeEnquiryModal() {
    if (!dialog) return;
    document.body.classList.remove("modal-open");
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  // Bind all pop-up triggers (Hero CTAs, Sticky Side Buttons, Section CTAs, Mobile Bar)
  document.querySelectorAll("[data-open-enquiry]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openEnquiryModal(btn);
    });
  });

  if (closeDialogBtn) {
    closeDialogBtn.addEventListener("click", closeEnquiryModal);
  }
  if (dialog) {
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  }

  // Light-dismiss backdrop click on native <dialog>
  if (dialog) {
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!clickedInside) {
        closeEnquiryModal();
      }
    });
  }

  // Handle all on-page & modal enquiry forms and send to Google Sheet + Email
  document.querySelectorAll("form.lead-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let errorEl = form.querySelector(".form-error-msg");
      if (errorEl) {
        errorEl.textContent = "";
      }

      function showError(msg, inputName) {
        if (!errorEl) {
          errorEl = document.createElement("div");
          errorEl.className = "form-error-msg";
          errorEl.style.color = "#dc2626";
          errorEl.style.background = "#fee2e2";
          errorEl.style.border = "1px solid #f87171";
          errorEl.style.borderRadius = "6px";
          errorEl.style.padding = "6px 10px";
          errorEl.style.fontSize = "12px";
          errorEl.style.fontWeight = "600";
          errorEl.style.margin = "6px 0";
          form.prepend(errorEl);
        }
        errorEl.textContent = msg;
        if (inputName) {
          const inp = form.querySelector(`[name='${inputName}']`);
          if (inp) inp.focus();
        }
      }

      const nameInput = form.querySelector("[name='full_name'], [name='name']");
      const name = (nameInput?.value || "").trim();

      // Mobile number sanitization & validation
      const phoneInput = form.querySelector("[name='phone']");
      let rawPhone = (phoneInput?.value || "").replace(/\D/g, "");

      // Handle leading 0 (e.g. 09876543210 -> 9876543210)
      if (rawPhone.length === 11 && rawPhone.startsWith("0")) {
        rawPhone = rawPhone.slice(1);
      }
      // Handle country code 91 (e.g. 919876543210 -> 9876543210)
      if (rawPhone.length === 12 && rawPhone.startsWith("91")) {
        rawPhone = rawPhone.slice(2);
      }

      const emailInput = form.querySelector("[name='email']");
      const email = (emailInput?.value || "").trim();

      const profileInput = form.querySelector("[name='profile'], [name='background']");
      const profile = profileInput?.value || "";

      const courseInput = form.querySelector("[name='course_name'], [name='course_code']");
      let courseName = courseInput?.value || "";
      if (!courseName) {
        const titleParts = document.title.split("|");
        courseName = titleParts[0].trim();
      }

      const intentInput = form.querySelector("[name='cta_intent'], [name='intent'], [name='source']");
      const intent = intentInput?.value || "Website Lead Form";

      // Validations
      if (name.length < 2) {
        showError("Please enter your full name (minimum 2 characters).", nameInput ? nameInput.name : "name");
        return;
      }

      // Validates valid 10-digit Indian mobile number starting with 6, 7, 8, or 9
      if (!/^[6-9]\d{9}$/.test(rawPhone)) {
        showError("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.", "phone");
        return;
      }

      if (emailInput && email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Please enter a valid email address.", "email");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const origBtnText = submitBtn ? submitBtn.textContent : "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting details...";
      }

      // Collect UTM tracking parameters
      const utms = getUtmParameters();

      // Generate unique lead reference ID and assemble CRM / Sheet payload
      const refId = "ML-CDAC-" + Math.floor(1000 + Math.random() * 9000);
      const payload = {
        refId: refId,
        course_name: courseName,
        source: intent,
        name: name,
        phone: rawPhone, // Clean 10 digits without leading '+' so Google Sheets NEVER parses as a formula
        phone_full: "+91 " + rawPhone,
        email: email || "Not Provided",
        background: profile || "Not Specified",
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        utm_source: utms.utm_source || "direct",
        utm_medium: utms.utm_medium || "none",
        utm_campaign: utms.utm_campaign || "",
        utm_id: utms.utm_id || "",
        utm_term: utms.utm_term || "",
        utm_content: utms.utm_content || ""
      };

      // Store in sessionStorage for fast thank you page hydration
      try {
        sessionStorage.setItem("mindlyft_last_lead", JSON.stringify(payload));
      } catch (err) {}

      // Dispatch custom event for Google Analytics / Tag Manager / Pixel
      window.dispatchEvent(new CustomEvent("mindlyft:leadSubmitted", { detail: payload }));
      console.info("[MindLyft Lead Captured with UTMs]", payload);

      // Target Thank You Page with name, phone, course, and UTMs
      const q = new URLSearchParams({
        name: name,
        phone: "+91" + rawPhone,
        course: courseName,
        refId: refId
      });
      if (utms.utm_source) q.set("utm_source", utms.utm_source);
      if (utms.utm_medium) q.set("utm_medium", utms.utm_medium);
      if (utms.utm_campaign) q.set("utm_campaign", utms.utm_campaign);
      if (utms.utm_id) q.set("utm_id", utms.utm_id);
      if (utms.utm_term) q.set("utm_term", utms.utm_term);
      if (utms.utm_content) q.set("utm_content", utms.utm_content);

      const targetUrl = "/data-analytics/thank-you.html?" + q.toString();

      let redirected = false;
      function redirectToThankYou() {
        if (redirected) return;
        redirected = true;
        window.location.href = targetUrl;
      }

      // Send to Google Apps Script Web App (Sheet + Email Notification)
      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL" && GOOGLE_SCRIPT_URL.startsWith("http")) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        })
        .then(() => {
          if (submitBtn) submitBtn.textContent = "Confirmed! Redirecting...";
          setTimeout(redirectToThankYou, 300);
        })
        .catch((fetchErr) => {
          console.warn("[Sheet Integration Notice]", fetchErr);
          redirectToThankYou();
        });

        // Safety fallback: Redirect within 1.2s regardless of network speed
        setTimeout(redirectToThankYou, 1200);
      } else {
        // Direct redirect if script URL is not yet configured (demo / testing mode)
        if (submitBtn) submitBtn.textContent = "Redirecting to Confirmation...";
        setTimeout(redirectToThankYou, 350);
      }
    });
  });

  // Interactive Readiness / Fit Self-Check Selector
  const readinessBtns = document.querySelectorAll("[data-readiness-btn]");
  const readinessText = document.getElementById("readinessResultText");
  const readinessCta = document.getElementById("readinessResultCta");

  readinessBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      readinessBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const msg = btn.getAttribute("data-message");
      const ctaIntent = btn.getAttribute("data-cta-intent");
      if (readinessText && msg) readinessText.textContent = msg;
      if (readinessCta && ctaIntent) readinessCta.setAttribute("data-intent", ctaIntent);
    });
  });
})();
