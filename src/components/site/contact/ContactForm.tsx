"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactService } from "@/services/contactService";

const SUBJECTS = [
  "Admission Enquiry",
  "Fees & Scholarship",
  "Book Demo Class",
  "Course Information",
  "Other",
];

type FormData = {
  name:    string;
  email:   string;
  phone:   string;
  subject: string;
  message: string;
  hpToken: string; // honeypot, hidden from people; sent to the API as "website"
};

type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = { name: "", email: "", phone: "", subject: "", message: "", hpToken: "" };

// Mirrors the API's CreateContactMessageValidator so most mistakes are caught before sending
function validate(f: FormData): Errors {
  const e: Errors = {};
  if (!f.name.trim())                                   e.name    = "Please enter your name.";
  if (!f.phone.trim())                                  e.phone   = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{6,19}$/.test(f.phone.trim())) e.phone   = "Please enter a valid phone number.";
  if (!f.email.trim())                                  e.email   = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.subject)                                       e.subject = "Please choose a subject.";
  if (f.message.trim().length < 10)                     e.message = "Message must be at least 10 characters.";
  return e;
}

const inputCls =
  "w-full border rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

function fieldCls(error?: string) {
  return `${inputCls} ${error ? "border-red-300 bg-red-50/40" : "border-gray-200"}`;
}

export default function ContactForm() {
  const [formData,   setFormData]   = useState<FormData>(EMPTY);
  const [errors,     setErrors]     = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent,       setSent]       = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await contactService.submit({
        name:    formData.name.trim(),
        email:   formData.email.trim(),
        phone:   formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        website: formData.hpToken,
      });
      setSent(true);
      setFormData(EMPTY);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">

        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Write To Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Send Us a <span className="text-blue-600">Message</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
          <p className="text-gray-500 text-lg">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {sent ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h3 className="text-2xl font-bold text-gray-900">Message sent!</h3>
            <p className="text-gray-500">
              Thank you for reaching out. Our team will get back to you within 24 hours on working days.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 md:p-10 space-y-6">

            {/* Honeypot: invisible to people, bots fill it in and get silently dropped.
                The name and label must not look like anything browser autofill or password
                managers recognise (e.g. "website", "url", "company"), or real visitors get dropped. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="hpToken" tabIndex={-1} autoComplete="off"
                  data-lpignore="true" data-1p-ignore="true" data-form-type="other"
                  value={formData.hpToken} onChange={handleChange} />
              </label>
            </div>

            {/* Row 1 — Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input id="contact-name" type="text" name="name" autoComplete="name" maxLength={100}
                  value={formData.name} onChange={handleChange}
                  placeholder="Enter your name" className={fieldCls(errors.name)} />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input id="contact-phone" type="tel" name="phone" autoComplete="tel" maxLength={20}
                  value={formData.phone} onChange={handleChange}
                  placeholder="Enter your phone" className={fieldCls(errors.phone)} />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            {/* Row 2 — Email + Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input id="contact-email" type="email" name="email" autoComplete="email" maxLength={200}
                  value={formData.email} onChange={handleChange}
                  placeholder="Enter your email" className={fieldCls(errors.email)} />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-sm font-semibold text-gray-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select id="contact-subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  className={`${fieldCls(errors.subject)} bg-white`}>
                  <option value="">Select a subject</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
              </div>
            </div>

            {/* Row 3 — Message */}
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-semibold text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea id="contact-message" name="message" rows={5} maxLength={5000}
                value={formData.message} onChange={handleChange}
                placeholder="Write your message here..."
                className={`${fieldCls(errors.message)} resize-none`} />
              {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
            </div>

            {serverError && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : "📨 Send Message"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              We typically respond within 24 hours on working days.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
