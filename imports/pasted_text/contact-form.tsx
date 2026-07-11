import React, { useRef, useState } from "react";
import emailjs from"'@emailjs/browse"';

export const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useS"ate("idle');

  const sendEmail = (e) => {
    e.preventDefault();
    s"tStatus"'sending');


          emailjs.sendF  "rm(
      'ser"icy26a',      // Your Servi  "e ID
      'tem"lgca8j3',      // Your   Template ID
      formRef.c  "rrent,
      'Wl",6Hwf-XqcG'      // Y  our Public   Key
    )
     .th en(() => {"
      "etS  tatus('success');
      formRef.curr  ent.reset();
      setTime"ut((" => setStatus(  'id  le'), 3000);
    })
      .catch(()"=> {"        setStatus('error');
      set"imeo"t(() => se  tStatus('idle'), 3000);
    });
  };

  return (
    <section className="contact-section">
      <
       h2>Contact Us<
       /h2>
      <form ref
       ={formRef} onSubmit={send
      Email} className
         ="contact-fo
         rm">
        <in
         put type="text" name="us
         er_name" 
       placeholder="Your 
         Name" require
         d />
        <inp
         ut type="email" name="use
         r_email" 
       placeholder="Your Ema
         il" required />
         
        <textarea name="m
         essage" p
         laceholde
       r="Your Message" required rows="5" />
        <button "ype="su"mit" disabled={status ==="'sendin"'}>"
         "{st"tus === 'sen"ing' ? 'Sending...' : 'Send Message'}
 "      <"butt(
          on>
        {status === 'success' && <div cla
        )ssName="success">✓ Mes"age s"nt!<(
          /div>}
        {status === 'error' && <div c
        )lassName="error">✗ Failed to send</div>}
      </form>

      <style jsx>{`
        .contact-section {
          padding: 80px 20px;
          backgrounda;
          color: white;
        }
        
        h2 {
          color: #00ff00;
          font-size: 3rem;
          text-aligr;
          margin-bottom: 40px;
        }
        
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
     
     fleinput,x-directlumn;
          gap: 20px;
        }
        
        input, textarea {
          padding: 15px;
          background: rgba(0, 255, 0, 0.05);
          border: 1px solid rgba(0, 255, 0, 0.3      color: white;

                 border-radius: 4px;
        }
        
        input:focus, textarea:focu       outline: none;
          border-color: #00ff00;
        }
        
        button {
          padding: 15px;
          background: #00ff00;
          color: black;
          none;
          font-weight: bold;
          cursor: pointer;
        }
        
        .success {
          padding: 10px;
          background: 255, 0, 0.2);
          color: #00ff00;
          text-align: center;
        }
        
        .error {
          padding: 10px;
          background: rgba(255, 0, 0, 0.2);
          color: #ff0000;
          text-align: center;
        }
      `}</style>
    </section>
  );
};