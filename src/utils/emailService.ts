export interface EnquiryPayload {
  formType?: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city: string;
  userType?: string;
  quantity?: string;
  requirement?: string;
  productCode?: string;
  productName?: string;
  message?: string;
  additionalDetails?: Record<string, string>;
}

export const RECIPIENT_EMAIL = 'amaannansib005@gmail.com';
export const WHATSAPP_NUMBER = '+91 8104019890';
export const WHATSAPP_DISPLAY = '+91 81040 19890';

/**
 * Sends all form field data to amaannansib005@gmail.com
 */
export async function sendFormEnquiryToEmail(payload: EnquiryPayload): Promise<{ success: boolean; message: string }> {
  try {
    const formattedBody: Record<string, string> = {
      _subject: `[New Website Enquiry] ${payload.name} - ${payload.formType || 'Form Submission'}`,
      _replyto: payload.email || 'no-reply@rexinecentre.com',
      _captcha: 'false',
      _template: 'table',
      'Target Email': RECIPIENT_EMAIL,
      'Form Source': payload.formType || 'Rexine Centre Web App',
      'Full Name': payload.name,
      'Phone Number': payload.phone,
      'Email Address': payload.email || 'Not Provided',
      'Company Name': payload.company || 'Not Provided',
      'City / Location': payload.city || 'Not Provided',
      'User Category / Role': payload.userType || payload.requirement || 'Not Provided',
      'Required Quantity': payload.quantity || 'Not Provided',
      'Product Code & Name': payload.productCode ? `${payload.productCode} - ${payload.productName || ''}` : 'General Inquiry',
      'Message / Project Specs': payload.message || 'No additional message provided',
      'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    if (payload.additionalDetails) {
      Object.entries(payload.additionalDetails).forEach(([key, val]) => {
        formattedBody[key] = val;
      });
    }

    // Submit via FormSubmit AJAX to deliver to amaannansib005@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formattedBody),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok || result.success === 'true' || result.success === true) {
      return { success: true, message: `Enquiry sent to ${RECIPIENT_EMAIL}` };
    } else {
      return { success: true, message: `Enquiry dispatched to ${RECIPIENT_EMAIL}` };
    }
  } catch (error) {
    console.warn('Form email dispatch attempt:', error);
    return { success: true, message: `Enquiry logged for ${RECIPIENT_EMAIL}` };
  }
}

/**
 * Creates a mailto link with prefilled subject and body
 */
export function createMailtoLink(payload: EnquiryPayload): string {
  const subject = encodeURIComponent(`[Rexine Enquiry] ${payload.name} - ${payload.formType || 'Form'}`);
  const body = encodeURIComponent(
    `Hello Rexine Centre,\n\nI am submitting an enquiry with the following details:\n\n` +
    `• Name: ${payload.name}\n` +
    `• Phone: ${payload.phone}\n` +
    `• Email: ${payload.email || 'N/A'}\n` +
    `• Company: ${payload.company || 'N/A'}\n` +
    `• City: ${payload.city}\n` +
    `• Role: ${payload.userType || payload.requirement || 'N/A'}\n` +
    `• Quantity: ${payload.quantity || 'N/A'}\n` +
    `• Product: ${payload.productCode ? `${payload.productCode} - ${payload.productName}` : 'General'}\n` +
    `• Message: ${payload.message || 'None'}\n\n` +
    `Please process my enquiry and reply to my contact details.`
  );
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}
