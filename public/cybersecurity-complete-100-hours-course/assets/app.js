/**
 * MindLyft AI in Collaboration with C3iHub (IIT Kanpur) — Cybersecurity Portfolio
 * Interactive Application Logic (Enquiry Modal, Simulators, Curriculum Tabs, Quiz, UTMs & Lead Forms)
 */
(function () {
  "use strict";

  // =========================================================================
  // LEAD INTEGRATION CONFIG (PURE JS -> GOOGLE APPS SCRIPT)
  // =========================================================================
  const LEAD_CONFIG = {
    sheetTab: "cybersecurity-complete-100-hours-course",
    pageSubject: "New Lead | Full-Stack AI in Cybersecurity",
    googleScriptUrl: window.MINDLYFT_IIT_GOOGLE_SCRIPT_URL || ""
  };

  const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "gclid",
    "fbclid"
  ];
  const UTM_STORAGE_KEY = "mindlyft_utm_params";

  // --- Capture & Persist UTM Parameters ---
  function captureUtmParams() {
    let saved = {};
    try {
      const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (raw) saved = JSON.parse(raw) || {};
    } catch (e) {}

    const urlParams = new URLSearchParams(window.location.search);
    let updated = false;

    UTM_KEYS.forEach((key) => {
      const val = urlParams.get(key);
      if (val !== null && val.trim() !== "") {
        saved[key] = val.trim();
        updated = true;
      }
    });

    if (!saved.landing_page) {
      saved.landing_page = window.location.href;
      updated = true;
    }
    if (!saved.referrer && document.referrer) {
      saved.referrer = document.referrer;
      updated = true;
    }

    if (updated) {
      try {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(saved));
      } catch (e) {}
    }

    return saved;
  }

  const utmData = captureUtmParams();

  // Inject hidden UTM & sheet_tab fields into every lead form
  function hydrateFormTrackingInputs(form) {
    const fields = Object.assign(
      {
        sheet_tab: LEAD_CONFIG.sheetTab,
        landing_page: utmData.landing_page || window.location.href,
        referrer: utmData.referrer || document.referrer || ""
      },
      utmData
    );

    Object.keys(fields).forEach((key) => {
      let input = form.querySelector(`input[name="${key}"]`);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        form.appendChild(input);
      }
      input.value = fields[key] || "";
    });
  }

  document.querySelectorAll("form.lead-form").forEach(hydrateFormTrackingInputs);

  // --- Modal Logic ---
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

    const intent = triggerEl?.getAttribute("data-intent") || "Academic Counselling";
    const title = triggerEl?.getAttribute("data-title") || "Request Course Syllabus & Fee Breakdown";
    const sub = triggerEl?.getAttribute("data-sub") || "Our IIT Kanpur certified academic advisors will connect within 15 minutes.";
    const badge = triggerEl?.getAttribute("data-badge") || "ENQUIRY FUNNEL";
    const ctaText = triggerEl?.getAttribute("data-cta") || "Request Fee Structure & Syllabus PDF →";

    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = sub;
    if (modalBadge) modalBadge.textContent = badge;
    if (modalIntentInput) modalIntentInput.value = intent;
    if (modalSubmitBtn) modalSubmitBtn.textContent = ctaText;

    const modalForm = dialog.querySelector("form.lead-form");
    if (modalForm) {
      hydrateFormTrackingInputs(modalForm);
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

  document.querySelectorAll("[data-open-enquiry]").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openEnquiryModal(btn);
    });
  });

  if (closeDialogBtn) {
    closeDialogBtn.addEventListener("click", closeEnquiryModal);
  }
  if (dialog) {
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
    dialog.addEventListener("click", function (e) {
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

  // --- Send Lead to Google Apps Script (Sheet + Email) ---
  async function dispatchLead(payload) {
    if (!LEAD_CONFIG.googleScriptUrl) {
      console.warn("[MindLyft] LEAD_CONFIG.googleScriptUrl is empty — configure your Apps Script /exec URL in assets/app.js.");
      return false;
    }

    try {
      await fetch(LEAD_CONFIG.googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      return true;
    } catch (err) {
      console.warn("[MindLyft Lead submission error]", err);
      return false;
    }
  }

  // --- Form Handling & Redirection to thank-you.html ---
  document.querySelectorAll("form.lead-form").forEach((form) => {
    form.addEventListener("submit", async function (e) {
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

      const phoneInput = form.querySelector("[name='phone']");
      const rawPhone = (phoneInput?.value || "").replace(/\D/g, "");
      let phone = rawPhone;
      if (rawPhone.length === 12 && rawPhone.startsWith("91")) {
        phone = rawPhone.slice(2);
      } else if (rawPhone.length === 11 && rawPhone.startsWith("0")) {
        phone = rawPhone.slice(1);
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
      const intent = intentInput?.value || "Cybersecurity Lead Form";

      // Validations
      if (name.length < 2) {
        showError("Please enter your full name.", nameInput ? nameInput.name : "full_name");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(phone)) {
        showError("Please enter a valid 10-digit Indian mobile number.", "phone");
        return;
      }

      if (emailInput && email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Please enter a valid email address.", "email");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting & Sending Confirmation...";
      }

      const currentUtms = captureUtmParams();
      const refId = "ML-CYBER-" + Math.floor(1000 + Math.random() * 9000);
      const payload = {
        refId,
        program_group: "iit",
        sheet_tab: LEAD_CONFIG.sheetTab,
        course_slug: LEAD_CONFIG.sheetTab,
        email_subject: LEAD_CONFIG.pageSubject,
        course_name: courseName,
        intent,
        name,
        phone: phone,
        phone_full: "+91 " + phone,
        email,
        profile,
        pageUrl: window.location.href,
        landingPage: currentUtms.landing_page || window.location.href,
        referrer: currentUtms.referrer || document.referrer || "",
        utm_source: currentUtms.utm_source || "",
        utm_medium: currentUtms.utm_medium || "",
        utm_campaign: currentUtms.utm_campaign || "",
        utm_term: currentUtms.utm_term || "",
        utm_content: currentUtms.utm_content || "",
        utm_id: currentUtms.utm_id || "",
        gclid: currentUtms.gclid || "",
        fbclid: currentUtms.fbclid || "",
        submittedAt: new Date().toISOString()
      };

      // Store in sessionStorage
      try {
        sessionStorage.setItem("mindlyft_last_lead", JSON.stringify(payload));
      } catch (err) {}

      // Dispatch to server email + IIT Sheet webhook, and optional client Apps Script
      await Promise.race([
        Promise.allSettled([
          fetch("/api/lead-notify", {
            method: "POST",
            keepalive: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({ skipServerSheet: Boolean(LEAD_CONFIG.googleScriptUrl) }, payload))
          }).catch((notifyErr) => {
            console.warn("[MindLyft Lead Email Notice]", notifyErr);
          }),
          dispatchLead(payload)
        ]),
        new Promise((resolve) => setTimeout(resolve, 1500))
      ]);

      // Hook for CRM / Google Ads / Meta Pixel integration
      window.dispatchEvent(new CustomEvent("mindlyft:leadSubmitted", { detail: payload }));
      console.info("[MindLyft Lead Captured]", payload);

      // Build redirect query params including UTMs
      const q = new URLSearchParams({
        name: name,
        phone: "+91" + phone,
        course: courseName,
        refId: refId
      });
      UTM_KEYS.forEach((key) => {
        if (currentUtms[key]) {
          q.set(key, currentUtms[key]);
        }
      });

      window.location.href = "/cybersecurity-complete-100-hours-course/thank-you.html?" + q.toString();
    });
  });

  // --- Terminal Simulator Tab Switching ---
  document.querySelectorAll(".terminal-tab-btn").forEach((tabBtn) => {
    tabBtn.addEventListener("click", function () {
      const parent = tabBtn.closest(".terminal-window");
      if (!parent) return;

      parent.querySelectorAll(".terminal-tab-btn").forEach((b) => b.classList.remove("active"));
      tabBtn.classList.add("active");

      const targetId = tabBtn.getAttribute("data-term-target");
      parent.querySelectorAll(".terminal-pane").forEach((pane) => {
        pane.style.display = "none";
      });
      const targetPane = parent.querySelector("#" + targetId);
      if (targetPane) {
        targetPane.style.display = "block";
      }
    });
  });

  // --- Curriculum 4-Pillars Navigation ---
  document.querySelectorAll(".pillar-nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      const parent = item.closest(".curriculum-layout");
      if (!parent) return;

      parent.querySelectorAll(".pillar-nav-item").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const targetId = item.getAttribute("data-pillar-target");
      parent.querySelectorAll(".curriculum-pane").forEach((pane) => {
        pane.style.display = "none";
      });
      const targetPane = parent.querySelector("#" + targetId);
      if (targetPane) {
        targetPane.style.display = "block";
      }
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      item.parentElement.querySelectorAll(".faq-item").forEach((it) => it.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // --- Eligibility Quiz Interactive Options ---
  document.querySelectorAll(".quiz-opt-btn").forEach((opt) => {
    opt.addEventListener("click", function () {
      const parent = opt.closest(".quiz-options-grid");
      if (!parent) return;

      parent.querySelectorAll(".quiz-opt-btn").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });

  // --- Smooth Scrolling for In-Page Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();