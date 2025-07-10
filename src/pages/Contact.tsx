"use client";

import NavBar from "@/components/generic/nav/NavBar";
import React, { useState } from "react";
import Footer from "@/components/generic/footer/Footer";

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
            const res = await fetch('http://localhost:8080/contact', { // TODO: Replace with the real domain when deployed
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
                }, 1000);
            } else {
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
        <div className="min-h-screen relative">
            <NavBar />
            <h1 className="my-10 sm:my-20 text-center text-5xl lg:text-6xl xl:text-7xl font-black px-4">
                Contact <span className="text-blue-500">Us</span>
            </h1>
            <div className="max-w-md mx-auto px-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Name</p>
                        <input 
                            name="name" 
                            value={form.name} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.name && touched.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            type="text" 
                        />
                        {fieldErrors.name && touched.name && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.name}</p>}
                    </div>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Email</p>
                        <input 
                            name="email" 
                            value={form.email} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.email && touched.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            type="text" 
                            placeholder="email@example.com" 
                        />
                        {fieldErrors.email && touched.email && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Country/Region</p>
                        <input 
                            name="country" 
                            value={form.country} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            className={`w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border ${fieldErrors.country && touched.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            type="text" 
                        />
                        {fieldErrors.country && touched.country && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.country}</p>}
                    </div>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Phone number (optional)</p>
                        <input 
                            name="phone" 
                            value={form.phone} 
                            onChange={handleChange} 
                            className="w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            type="text" 
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Company (optional)</p>
                        <input 
                            name="company" 
                            value={form.company} 
                            onChange={handleChange} 
                            className="w-full pl-2 py-1 mt-2 mb-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            type="text" 
                        />
                    </div>
                    <div className="mb-6">
                        <p className="text-center text-base sm:text-lg md:text-xl font-light">Message</p>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full min-h-32 px-3 py-2 mt-2 mb-1.5 rounded-lg border ${fieldErrors.message && touched.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} resize-none overflow-y-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                        ></textarea>
                        {fieldErrors.message && touched.message && <p className="text-red-500 text-sm text-center mb-4 animate-fade-in">{fieldErrors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full rounded-lg ${status === "success" ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-400"} text-white text-center mt-7 mb-20 py-2 px-4 cursor-pointer transition-all ${isSubmitting ? 'opacity-70' : ''}`}
                        disabled={isSubmitting || status === "success"}
                    >
                        {status === "success" ? "Sent" : isSubmitting ? "Sending..." : "Submit"}
                    </button>
                </form>
                {status === "error" && <p className="text-center text-red-600 mb-8">{errorMsg}</p>}
            </div>
            
            <Footer />
        </div>
    );
}

export default Contact;