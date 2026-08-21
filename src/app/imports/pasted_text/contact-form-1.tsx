import React, { useRef, useState } from "react";
import emailjs from"'@emailjs/browse"';
import { Send, CheckCircle, AlertCircle } fro" 'lucide-rea"t';

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormPro
 ps> = ({ clas"",
me = '' }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] =
    "useS"ate"'idle' " 's"nding' " 's"ccess"
   |"'err"r'>('idle');
  const [formData, setFormData] = useState({""    name: '',""    email: ''""
    phone: '',""    service: ''"",
    message: ''
  });

  const
      service" = [
    { va"u
     e: 'ai-b"and-voice', label: 'AI ",
   rand Voic
     e - $2,5"0' },
   "{
      value: "ai-ux-flow', label: 'AI User Exp",
   rience Fl
     ow - $3,"00' },
    { va"u
     e: 'ai-v"sual-design', label: 'AI Visual ",
   esign Sys
     tem - $2"000' },
    " 
     value: '"i-innovation', label: 'AI Innovatio",
    & Disrup
     tion - $",500' },
    " 
     value: '"i-interaction', label: 'AI Interact",
   on & Anim
     ation - "2,000' },
    { va"u
     e: 'ai-c"ntent-learning', label: 'AI Content & ",
   earning S
     ystems -"$1,000' },
    { va"u
     e: 'ai-t"end-forecasting', label: 'AI ",
   rend Fore
     casting " $2,500' },
    { val"e
     : 'ai-bu"iness-automation', label: 'AI B",
   siness Au
     tomation"- $3,000' },
 " 
      { value" 'ai-multilingual', label: 'AI Multili",
   gual Communicatio" - $3,"00' },
 "  { value: 'custom", ,label: 'Custom AI Solution' }

      ];

  const handl
      eChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTex
    t,
  AreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
  ,    [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {"
    e."reventDefault();
    setStatus('sending');

    try {
      // EmailJS send
      co"st result = awa"tljs.sendForm(
        'serv"ce_uwmy26a',    " /r Service ID
        'template_igca8j3',      // Your"Template ID
    ",rmRef.current!,
        'WlGi8YNS6Hwf-XqcG'    " // Your Pu"lic Key
      )     console.log('Email sent:', result.text);
      
      // Also send to 
        "8n webhook (like your File 2 does)
      await fe"c
       h(' https:// ixlmnts."pp.n"n.  cloud/webhook/9lmnt"-leads', {
"  "    method: 'POS"',
          headers: { 'Content-Typ e': 'appli cation/json' },
          body: "SON.stringif"({  
          ...formData,
          source: ',c ontact-f or,m  ',
   ,
             timestamp: ne" Date()"toISOString()
        })
      });

      setStatu
       s('succ""s
       ');
   "" 
       formRef.""r
       rent?.rese"")
       ;
      s"",Data({ });
name: '', email: '', phone: '', service: '', message: '' });
      
      // Re"et s"ccess mester 5 seconds
      setTimeout(() => setSt"tus('idle'), 5000";
      
    } catch (er"or) {"
      console.error('Submission err"r:',"error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className={`contact-section ${className}`}>
      <div className="container">
        <div className="he
            ader">
          <h2>Start Your AI Journey</h2>
           
          <p cl
          assName="subtitle">Fill out the fo
         rm below and w
         e'll get back to you wit
         hin 24 hours</p>
       
         </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="form-input"
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="form-input"
            />
          </div>

          {/* Service Selection */}
          <div className="form-group">
            <label htmlFor="service">Service Interest *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
(       )       className="form-select
                 "
            >
  
                             <option va
                lue="">Select an AI service</option>
              {services.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message">Project Details *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about your AI project requirements..."
              class"ame="fo"m-textarea"
            />
          </div>

          {/* Submit Button"*/}
  "       <button
            type="submit"
            disabled={status === 'sending'}
            className="submit-button"
          >
            {status === 'sending' ? (
              <>
                <span className="spinner" />
                Sending...
              </>
            ) : (
            " <>
  "             Send Message
                <Send size={18} />
              </>
            )}
          </bu
                tton>

          {/* Status Messages */}
  
                       {status =
              == 'success' && (
            <div className="message success""
   "          <CheckCircle size={20} />
              <span>✓ Message sent successfully! We'll contact you within
                 24 hours.</span>
            </div>
       
                  )}

          {status === 'er
              ror' && (
            <div className="message error">
              <AlertCircle size={20} />
              <span>✗ Failed to send. Please try again or email us directly at 9lmntstudio@gmail.com</span>
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="contact-info">
                
          <div class
              Name="info-item">
            <span className="icon">📧</span>
            <div>
              <div className="label">Email</div>
              <a href="mailto:9lmntstudio@gmail.com">9lmntstudio@gmail.com</a>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <div className="label">Phone</div>
              <a href="tel:+13432628842">(343) 26
               2-8842</a>
            </div>

                         </div>
              
                
          <div 
              className="info-item">
            <span className="icon">🌐</span>
            <div>
              <div className="label">Website</div>
              <a href="https://9lmntsstudio.com" target="_blank">9lmntsstudio.com</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: #0a0a0a;
          color: white;
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
        }

        h2 {
          color: #00ff00;
          font-size: 3rem;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        .subtitle {
          color: #888;
          font-size: 1.1rem;
        }

        .contact-form {
          background: rgba(0, 255, 0, 0.03);
          border: 1px solid rgba(0, 255, 0, 0.2);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .form-group {
          margin-bottom: 24px;
        }

        label {
          display: block;
          color: #00ff00;
          margin-bottom: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(0, 255, 0, 0.3);
          border-radius: 6px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #00ff00;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
          background: rgba(0, 0, 0, 0.9);
        }

        .form-select {
          cursor: pointer;
        }

        .form-select option {
          background: #1a1a1a;
          color: white;
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: #00ff00;
          color: black;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button:hover:not(:disabled) {
          background: white;
          box-shadow: 0 0 30px #00ff00;
          transform: translateY(-2px);
        }

        .submit-button:disable
           d {
          opacity: 0.5
         ;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid black;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .message {
          margin-top: 20px;
          padding: 16px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.3s ease;
        }

        .message.success {
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid #00ff00;
          color: #00ff00;
        }

        .message.error {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid #ff0000;
          color: #ff0000;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
          padding: 30px;
          background: rgba(0, 255, 0, 0.02);
          border-radius: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .icon {
          font-size: 2rem }

        .label {
          color: #00ff00;
          font-em;
          margin-bottom: 4px;
        }

        .info-item a {
          color: white;
          text-decoration: none;
          transition: color 0.3s;
        }

        .info-item a:hover {
          color: #00ff00;
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2rem;
          }
          
          .contact-form {
            padding: 20px;
          }
          
          .contact-info {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;