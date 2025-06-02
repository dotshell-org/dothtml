"use client";

import NavBar from "@/components/home/nav/NavBar";
import SemiBold from "@/components/style/SemiBold";
import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        country: "",
        phone: "",
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
        if (!form.name.trim()) errors.name = "Name is required.";
        if (!form.email.trim()) errors.email = "Email is required.";
        if (!form.country.trim()) errors.country = "Country is required.";
        if (!form.message.trim()) errors.message = "Message is required.";
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/contact' : '/contact'}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", country: "", phone: "", company: "", message: "" });
                // Ajout du délai d'une seconde pour l'état "Sent"
                setTimeout(() => {
                    setStatus(null);
                }, 1000);            } else {
                const data = await res.json();
                setErrorMsg(data.errors ? data.errors.map((e: { msg: string }) => e.msg).join(", ") : "Error while sending message.");
                setStatus("error");
            }
        } catch {
            setErrorMsg("Network error.");
            setStatus("error");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="h-screen relative">
            <NavBar />
            <h1 className="my-20 text-center text-7xl font-black">
                Contact <span className="text-blue-500">Us</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="text-center text-xl font-light">Name</p>
                    <input name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} className={`relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.name && touched.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} type="text" />
                    {fieldErrors.name && touched.name && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.name}</p>}
                </div>
                <div>
                    <p className="text-center text-xl font-light">Email</p>
                    <input name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} className={`relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.email && touched.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} type="text" placeholder="email@example.com" />
                    {fieldErrors.email && touched.email && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.email}</p>}
                </div>
                <div>
                    <p className="text-center text-xl font-light">Country/Region</p>
                    <input name="country" value={form.country} onChange={handleChange} onBlur={handleBlur} className={`relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.country && touched.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} type="text" />
                    {fieldErrors.country && touched.country && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.country}</p>}
                </div>
                <div>
                    <p className="text-center text-xl font-light">Phone number (optional)</p>
                    <input name="phone" value={form.phone} onChange={handleChange} className="relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-5.5 rounded-lg border border-gray-300 dark:border-gray-700" type="text" />
                </div>
                <div>
                    <p className="text-center text-xl font-light">Company (optional)</p>
                    <input name="company" value={form.company} onChange={handleChange} className="relative left-1/2 -translate-x-1/2 text-light w-80 pl-2 py-1 mt-2 mb-5.5 rounded-lg border border-gray-300 dark:border-gray-700" type="text" />
                </div>
                <p className="text-center text-xl font-light">Message</p>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative left-1/2 -translate-x-1/2 text-light w-80 min-h-50 px-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.message && touched.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} resize-none overflow-y-auto`}
                ></textarea>
                {fieldErrors.message && touched.message && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.message}</p>}
                <p/>
                <button
                    type="submit"
                    className={`relative left-1/2 -translate-x-1/2 rounded-lg ${status === "success" ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-400"} text-white text-center mt-7 mb-10 p-2 w-80 cursor-pointer transition-all ${isSubmitting ? 'opacity-70' : ''}`}
                    disabled={isSubmitting || status === "success"}
                >
                    {status === "success" ? "Sent" : isSubmitting ? "Sending..." : "Submit"}
                </button>
            </form>
            {status === "error" && <p className="text-center text-red-600">{errorMsg}</p>}
            <footer className="w-full text-center text-xl font-light mt-20 py-20 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <p className="mb-4">
                    Made with 🥐 by <SemiBold>Dotshell</SemiBold>, France • Open Source & Privacy First
                </p>
                <p className="mb-2">
                    Follow us on
                    <a href="https://github.com/dotshell-org" className="text-blue-500 hover:underline mx-1" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
                <p className="text-sm text-neutral-400 mt-4">
                    © {new Date().getFullYear()} Dotshell. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Contact;