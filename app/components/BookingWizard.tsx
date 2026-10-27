"use client";

import { useState, useTransition } from "react";
import { SERVICES, getService } from "@/data/services";
import { formatPrice } from "@/lib/format";
import { createRepairTicket, type BookingResult } from "@/app/repairs/actions";

const EMPTY = { serviceId: "", watchBrand: "", watchModel: "", issue: "", name: "", email: "", phone: "" };
type Form = typeof EMPTY;

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ ticketNo: string; token: string } | null>(null);
  const [pending, start] = useTransition();
  const service = getService(form.serviceId);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const field = (k: keyof Form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="grid gap-1">
      <label htmlFor={k} className="text-sm font-medium">{label}</label>
      <input id={k} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined}
        className="border border-ink/30 bg-white px-3 py-2 min-h-11" {...props} />
      {errors[k] && <p id={`${k}-err`} role="alert" className="text-danger text-sm">{errors[k]}</p>}
    </div>
  );

  function next() {
    const e: Record<string, string> = {};
    if (step === 1 && !form.serviceId) e.serviceId = "Choose a service";
    if (step === 2) {
      if (!form.watchBrand.trim()) e.watchBrand = "Enter the brand";
      if (form.issue.trim().length < 10) e.issue = "Describe the problem in at least 10 characters";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(step + 1);
  }

  function submit() {
    start(async () => {
      const res: BookingResult = await createRepairTicket(form);
      if (res.ok) setDone(res.data);
      else {
        setErrors(res.error.fields);
        if (res.error.fields.serviceId) setStep(1);
        else if (res.error.fields.watchBrand || res.error.fields.issue) setStep(2);
      }
    });
  }

  if (done) {
    return (
      <div role="status" className="border border-sage bg-white p-6 grid gap-2">
        <h2 className="font-display text-2xl">Booking received</h2>
        <p>Your ticket number is <strong className="price">{done.ticketNo}</strong>. We will email you a quote after diagnosis. No work starts until you approve it.</p>
        <p className="text-sm text-ink/70">Tracking link: /repairs/track/{done.token}</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); step === 3 ? submit() : next(); }} className="grid gap-5 max-w-xl" noValidate>
      <p className="text-sm text-ink/70" aria-live="polite">Step {step} of 3</p>
      {step === 1 && (
        <fieldset className="grid gap-2">
          <legend className="font-display text-xl mb-2">What needs doing?</legend>
          {SERVICES.map((s) => (
            <label key={s.id} className="flex items-start gap-3 border border-ink/20 bg-white p-3 min-h-11 cursor-pointer">
              <input type="radio" name="service" value={s.id} checked={form.serviceId === s.id} onChange={set("serviceId")} className="mt-1" />
              <span>
                <span className="block font-medium">{s.name}</span>
                <span className="block text-sm text-ink/70">{formatPrice(s.fromMinor)} - {formatPrice(s.toMinor)} · {s.turnaround}</span>
              </span>
            </label>
          ))}
          {errors.serviceId && <p role="alert" className="text-danger text-sm">{errors.serviceId}</p>}
        </fieldset>
      )}
      {step === 2 && (
        <fieldset className="grid gap-4">
          <legend className="font-display text-xl mb-2">Tell us about the watch</legend>
          {field("watchBrand", "Brand")}
          {field("watchModel", "Model (optional)")}
          <div className="grid gap-1">
            <label htmlFor="issue" className="text-sm font-medium">What is wrong?</label>
            <textarea id="issue" rows={4} value={form.issue} onChange={set("issue")} aria-invalid={!!errors.issue}
              className="border border-ink/30 bg-white px-3 py-2" />
            {errors.issue && <p role="alert" className="text-danger text-sm">{errors.issue}</p>}
          </div>
          {service && <p className="text-sm bg-white border border-ink/15 p-3">Indicative estimate: {formatPrice(service.fromMinor)} - {formatPrice(service.toMinor)}. The final quote follows diagnosis.</p>}
        </fieldset>
      )}
      {step === 3 && (
        <fieldset className="grid gap-4">
          <legend className="font-display text-xl mb-2">Your details</legend>
          {field("name", "Full name", { autoComplete: "name" })}
          {field("email", "Email", { type: "email", autoComplete: "email" })}
          {field("phone", "Phone", { type: "tel", autoComplete: "tel" })}
        </fieldset>
      )}
      <div className="flex gap-3">
        {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="border border-ink px-5 py-3 min-h-11">Back</button>}
        <button type="submit" disabled={pending} className="bg-ink text-paper px-5 py-3 min-h-11 disabled:opacity-60">
          {step === 3 ? (pending ? "Submitting..." : "Submit booking") : "Continue"}
        </button>
      </div>
    </form>
  );
}
