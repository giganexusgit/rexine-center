import React, { useState } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Product } from '../types';
import {
  sendFormEnquiryToEmail,
  RECIPIENT_EMAIL,
} from '../utils/emailService';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
}

export const QuickEnquiryModal: React.FC<QuickEnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    userType: 'Architect',
    quantity: '1 Roll (30m)',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);


  if (!isOpen) return null;

  // -----------------------------
  // Validation
  // -----------------------------
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim().replace(/[\s()-]/g, '');
    const email = formData.email.trim();
    const city = formData.city.trim();

    // Name validation
    if (!name) {
      newErrors.name = 'Name is required.';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/.test(name)) {
      newErrors.name = 'Please enter a valid name.';
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = 'Enter a valid email address.';
    }

    // City / location validation
    if (!city) {
      newErrors.city = 'City / location is required.';
    } else if (city.length < 2) {
      newErrors.city = 'Please enter a valid location.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error when user starts correcting the field
    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before sending
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      let token: string | undefined;
      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha('quick_enquiry_submit');
        } catch (captchaErr) {
          console.warn('reCAPTCHA execution note:', captchaErr);
        }
      }

      // 1. Send form details to email
      await sendFormEnquiryToEmail({
        formType: 'Wholesale Quick Enquiry',
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        userType: formData.userType,
        quantity: formData.quantity,
        productCode: selectedProduct?.code,
        productName: selectedProduct?.name,
        message: formData.message.trim(),
        recaptchaToken: token,
      });

      setIsSending(false);
      setSubmitted(true);


      // 2. Prepare WhatsApp message
      const pInfo = selectedProduct
        ? ` regarding ${selectedProduct.code} (${selectedProduct.name})`
        : '';

      const text = encodeURIComponent(
        `Hello Rexine Centre,\n` +
          `I am submitting a wholesale enquiry${pInfo}:\n` +
          `Name: ${formData.name}\n` +
          `Phone: ${formData.phone}\n` +
          `Email: ${formData.email || 'N/A'}\n` +
          `City: ${formData.city}\n` +
          `Role: ${formData.userType}\n` +
          `Quantity: ${formData.quantity}\n` +
          `Notes: ${formData.message}`
      );

      // 3. Open WhatsApp after brief delay
      setTimeout(() => {
        window.open(
          `https://wa.me/918104019890?text=${text}`,
          '_blank'
        );

        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to send enquiry:', error);
      setIsSending(false);
    }
  };

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
  onClick={onClose}
>
      <div
    className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
    onClick={(e) => e.stopPropagation()}
  >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-5 rounded-t-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-button text-[8px] font-bold uppercase tracking-[0.2em] text-[#C67C4E] mb-1">
                Wholesale Quick Enquiry
              </p>

              <h3 className="font-serif text-l font-bold">
                {selectedProduct
                  ? `Product: ${selectedProduct.code}`
                  : 'Direct Stock & Pricing Desk'}
              </h3>

              {selectedProduct && (
                <p className="mt-1 text-xs text-gray-300">
                  {selectedProduct.name}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close enquiry form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
<div className="p-6 bg-[#F8F6F2] max-h-[calc(90vh-120px)] overflow-y-auto">          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-lg font-bold text-[#111111]">
                Enquiry Sent to Factory Desk!
              </h4>

              <p className="font-sans text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                All form details have been emailed directly to{' '}
                <strong className="text-gray-900">
                  {RECIPIENT_EMAIL}
                </strong>{' '}
                and prefilled for WhatsApp instant response.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" data-lenis-prevent >
              {/* Name */}
              <div>
                <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    handleChange('name', e.target.value)
                  }
                  placeholder="e.g. Vikramaditya Shah"
                  className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E] ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-3">
                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleChange('phone', e.target.value)
                    }
                    placeholder="+91 81040 19890"
                    className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E] ${
                      errors.phone
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange('email', e.target.value)
                    }
                    placeholder="name@domain.com"
                    className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E] ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* City + User Type */}
              <div className="grid grid-cols-2 gap-3">
                {/* City */}
                <div>
                  <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City / Location *
                  </label>

                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      handleChange('city', e.target.value)
                    }
                    placeholder="e.g. Surat, Mumbai"
                    className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E] ${
                      errors.city
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />

                  {errors.city && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                    I am a...
                  </label>

                  <select
                    value={formData.userType}
                    onChange={(e) =>
                      handleChange('userType', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E]"
                  >
                    <option value="Architect">
                      Architect / Interior Designer
                    </option>
                    <option value="Sofa Maker">
                      Sofa / Furniture Manufacturer
                    </option>
                    <option value="Retailer">
                      Retail Fabric Store / Dealer
                    </option>
                    <option value="Automotive">
                      Automotive Interior Specialist
                    </option>
                    <option value="End User">
                      End Consumer / Home Owner
                    </option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Req. Quantity
                </label>

                <select
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange('quantity', e.target.value)
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E]"
                >
                  <option value="Sample Book Only">
                    Physical Sample Book
                  </option>
                  <option value="5-15 Meters">
                    5 - 15 Meters (Sample Roll)
                  </option>
                  <option value="1 Roll (30m)">
                    1 Full Master Roll (~30m)
                  </option>
                  <option value="5+ Bulk Rolls">
                    5+ Bulk Rolls (Commercial)
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-button font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Message / Special Texture Requirements
                </label>

                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) =>
                    handleChange('message', e.target.value)
                  }
                  placeholder="Specify required color shades, backing type, or project timeline..."
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#C67C4E]"
                />
              </div>

              {/* Email notification */}
              <div className="text-[10px] text-gray-500 flex items-center gap-1.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#C67C4E]" />

                <span>
                  Enquiry details will be sent to{' '}
                  <strong>{RECIPIENT_EMAIL}</strong>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#111111] hover:bg-[#C67C4E] text-white py-3.5 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group mt-2 disabled:opacity-50"
              >
                <span>
                  {isSending
                    ? 'Sending to Email...'
                    : 'SUBMIT ENQUIRY TO EMAIL & WHATSAPP'}
                </span>

                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
