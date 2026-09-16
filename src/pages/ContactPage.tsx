import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Building, Clock } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Product } from '../types';
import { sendFormEnquiryToEmail, RECIPIENT_EMAIL } from '../utils/emailService';

interface ContactPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenEnquiry }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    requirement: 'Bulk Rolls',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '', city: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 4) {
      newErrors.name = 'Name must be at least 4 characters.';
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Please enter a valid name.';
    }
    const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / State is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    let token: string | undefined;
    if (executeRecaptcha) {
      try {
        token = await executeRecaptcha('contact_page_submit');
      } catch (captchaErr) {
        console.warn('reCAPTCHA execution note:', captchaErr);
      }
    }

    await sendFormEnquiryToEmail({
      formType: 'Main Contact Form',
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      requirement: formData.requirement,
      message: formData.message,
      recaptchaToken: token,
    });

    setIsSubmitting(false);
    setFormSubmitted(true);
  };


  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-8 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            Contact Our Sales & Technical Team
          </h1>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            Whether you need custom color matching, bulk wholesale roll pricing, or physical swatch sample books for your studio, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Phone & WhatsApp Box */}
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
              <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block">
                Instant Response
              </span>
              <h2 className="font-serif text-2xl font-bold">
                Direct Hotline & WhatsApp
              </h2>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Connect directly with our procurement team for live price quotes, stock availability, and dispatch status across India.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/918104019890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-emerald-600 text-white p-4 rounded-2xl flex items-center gap-4 transition-all shadow-md group"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  <div>
                    <span className="font-button text-[10px] font-bold uppercase tracking-wider block opacity-90">
                      WhatsApp Quick Chat
                    </span>
                    <span className="font-serif text-base font-bold">
                      +91 81040 19890
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+918104019890"
                  className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl flex items-center gap-4 transition-all border border-white/15"
                >
                  <Phone className="w-6 h-6 text-[#C67C4E]" />
                  <div>
                    <span className="font-button text-[10px] font-bold uppercase tracking-wider block text-gray-400">
                      Direct Factory Desk
                    </span>
                    <span className="font-serif text-base font-bold">
                      +91 81040 19890
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C67C4E] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Head Office & Experience Center
                  </h4>
                  <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                    B-21-4, Kismat Nagar, Maqsood Estate, CST Road, Kurla West, Mumbai, Maharashtra 400070, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
                <Building className="w-5 h-5 text-[#C67C4E] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Central Supply Hubs
                  </h4>
                  <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                    Mumbai • Ahmedabad • New Delhi • Bangalore • Chennai • Kolkata
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
                <Clock className="w-5 h-5 text-[#C67C4E] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Business Hours
                  </h4>
                  <p className="font-sans text-xs text-gray-600 mt-1">
                    Mon - Sat: 9:30 AM - 7:00 PM IST (Closed Sundays)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Enquiry Emailed & Submitted!
                </h3>
                <p className="font-sans text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. All form field data has been sent directly to <strong className="text-gray-900">{RECIPIENT_EMAIL}</strong>. Our technical sales desk will review your requirement and reply promptly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', company: '', phone: '', email: '', city: '', requirement: 'Bulk Rolls', message: '' });
                    setErrors({ name: '', phone: '', email: '', city: '' });
                  }}
                  className="bg-[#111111] text-white px-6 py-2.5 rounded-full font-button text-xs font-bold uppercase tracking-wider mt-4 hover:bg-[#C67C4E] transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Request Bulk Quote or Swatch Samples
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-sans focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-[#C67C4E]'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Furniture Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 81040 19890"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-sans focus:outline-none focus:ring-2 ${
                        errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-[#C67C4E]'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-sans focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-[#C67C4E]'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pune, Maharashtra"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: '' });
                      }}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-sans focus:outline-none focus:ring-2 ${
                        errors.city ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-[#C67C4E]'
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Requirement Type
                    </label>
                    <select
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E]"
                    >
                      <option value="Bulk Rolls">Bulk Rolls Wholesale Order</option>
                      <option value="Sample Book">Request Physical Swatch Book</option>
                      <option value="Custom Matching">Custom Color / Emboss Matching</option>
                      <option value="Dealer Enquiry">Authorized Dealership Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-button font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Requirement Details / Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify total meters, color codes, thickness, or end application..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E]"
                  />
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                  <Mail className="w-4 h-4 text-[#C67C4E]" />
                  <span>All form field data will be sent directly to <strong>{RECIPIENT_EMAIL}</strong></span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] hover:bg-[#C67C4E] text-white py-3.5 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group disabled:opacity-50"
                >
                  <span>{isSubmitting ? `Sending to ${RECIPIENT_EMAIL}...` : 'Submit Requirement Enquiry'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};