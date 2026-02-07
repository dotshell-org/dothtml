"use client";

import NavBar from "@/components/generic/nav/NavBar";
import React, { useState } from "react";
import Footer from "@/components/generic/footer/Footer";
import { useI18n } from "@/i18n/useI18n";

const Contact = () => {
    const { t } = useI18n();
    const [form, setForm] = useState({
        name: "",
        email: "",
        country_region: "",   // au lieu de country
        phone_number: "",     // au lieu de phone
        company: "",
        message: ""
    });
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const requiredFields = ["name", "email", "country", "message"];

    const validate = () => {
        const errors: { [key: string]: string } = {};
        if (!form.name.trim()) errors.name = t("contact.errors.nameRequired");
        if (!form.email.trim()) errors.email = t("contact.errors.emailRequired");
        if (!form.country_region.trim()) errors.country = t("contact.errors.countryRequired");
        if (!form.message.trim()) errors.message = t("contact.errors.messageRequired");
        return errors;
    };

    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        setErrorMsg(null);
        setIsSubmitting(true);
        const errors = validate();
        setFieldErrors(errors);
        setTouched(requiredFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
            return;
        }
        try {
            const res = await fetch('https://dhi.dotshell.eu/contact', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", country_region: "", phone_number: "", company: "", message: "" });
                setTimeout(() => {
                setStatus(null);
            }, 2000);
        } else {
            const data = await res.json();
            setErrorMsg(data.errors ? data.errors.map((e: { msg: string }) => e.msg).join(", ") : t("contact.errors.sendError"));
            setStatus("error");
        }
    } catch {
        setErrorMsg(t("contact.errors.networkError"));
        setStatus("error");
    }
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen relative">
            <NavBar />
            <section className="contact-section py-10">
                <h1 className="my-10 sm:my-20 text-center text-5xl lg:text-6xl xl:text-7xl font-black px-4">
                    {t("contact.title")} <span className="text-blue-500">{t("contact.titleAccent")}</span>
                </h1>
                <div className="max-w-md mx-auto px-8">
                    <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
                        <h2 id="contact-form-heading" className="sr-only">{t("contact.formHeading")}</h2>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.name")}</label>
                            <input 
                                id="name"
                                name="name" 
                                value={form.name} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.name && touched.name ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-800'} bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`}
                                type="text" 
                                required
                                aria-required="true"
                                aria-invalid={fieldErrors.name && touched.name ? "true" : "false"}
                                aria-describedby={fieldErrors.name && touched.name ? "name-error" : undefined}
                            />
                            {fieldErrors.name && touched.name && <p id="name-error" className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.name}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.email")}</label>
                            <input 
                                id="email"
                                name="email" 
                                value={form.email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.email && touched.email ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-800'} bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`}
                                type="email" 
                                placeholder={t("contact.placeholders.email")} 
                                required
                                aria-required="true"
                                aria-invalid={fieldErrors.email && touched.email ? "true" : "false"}
                                aria-describedby={fieldErrors.email && touched.email ? "email-error" : undefined}
                            />
                            {fieldErrors.email && touched.email && <p id="email-error" className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="country_region" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.country")}</label>
                            <input 
                                id="country_region"
                                name="country_region"
                                value={form.country_region}
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.country && touched.country ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-800'} bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`}
                                type="text" 
                                required
                                aria-required="true"
                                aria-invalid={fieldErrors.country && touched.country ? "true" : "false"}
                                aria-describedby={fieldErrors.country && touched.country ? "country-error" : undefined}
                            />
                            {fieldErrors.country && touched.country && <p id="country-error" className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.country}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone_number" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.phone")}</label>
                            <input 
                                id="phone_number"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={handleChange} 
                                className="w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                                type="tel" 
                                aria-required="false"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="company" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.company")}</label>
                            <input 
                                id="company"
                                name="company" 
                                value={form.company} 
                                onChange={handleChange} 
                                className="w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                                type="text" 
                                aria-required="false"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-center text-base sm:text-lg md:text-xl font-light">{t("contact.fields.message")}</label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full min-h-32 px-3 py-2 mt-2 mb-1.5 rounded-lg border ${fieldErrors.message && touched.message ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-800'} resize-none overflow-y-auto bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`}
                                required
                                aria-required="true"
                                aria-invalid={fieldErrors.message && touched.message ? "true" : "false"}
                                aria-describedby={fieldErrors.message && touched.message ? "message-error" : undefined}
                            ></textarea>
                            {fieldErrors.message && touched.message && <p id="message-error" className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`w-full rounded-lg ${status === "success" ? "bg-green-500" : "bg-blue-500 hover:bg-blue-400"} text-white text-center mt-7 mb-20 py-2 px-4 cursor-pointer transition-all ${isSubmitting ? 'opacity-70' : ''}`}
                            disabled={isSubmitting || status === "success"}
                            aria-live="polite"
                        >
                            {status === "success" ? t("contact.submit.sent") : isSubmitting ? t("contact.submit.sending") : t("contact.submit.submit")}
                        </button>
                    </form>
                    {status === "error" && <p className="text-center text-red-600 mb-8" role="alert" aria-live="assertive">{errorMsg}</p>}
                </div>
            </section>
            
            <Footer />
        </main>
    );
}

export default Contact;
