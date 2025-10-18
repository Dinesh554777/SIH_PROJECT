import React from 'react';
import Card from '../components/Card';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Get in Touch</h1>
        <p className="text-lg text-text-secondary">We'd love to hear from you. Please fill out the form below or reach out to us directly.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="!p-8">
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                  <input type="text" id="name" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                  <input type="email" id="email" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea id="message" rows={6} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
           <Card>
             <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">Contact Information</h2>
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-accent" />
                    <a href="mailto:support@eduvators.com" className="text-text-secondary hover:text-accent">support@eduvators.com</a>
                </div>
                 <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-accent" />
                    <a href="tel:+911234567890" className="text-text-secondary hover:text-accent">+91 12345 67890</a>
                </div>
                 <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent mt-1" />
                    <p className="text-text-secondary">SIH Nodal Center, Bengaluru, Karnataka, India</p>
                </div>
             </div>
             <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold text-text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4 text-text-secondary">
                    <a href="#" className="hover:text-accent"><Linkedin size={24}/></a>
                    <a href="#" className="hover:text-accent"><Github size={24}/></a>
                    <a href="#" className="hover:text-accent"><Instagram size={24}/></a>
                </div>
             </div>
           </Card>
        </div>
      </div>

      {/* Map Section */}
      <div>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-8">Our Location</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124416.33663013894!2d77.50126521501719!3d12.953997434538743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf80c2354212040e8!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1696511234567" 
            width="100%" 
            height="450" 
            style={{ border: 0, filter: 'invert(90%) grayscale(100%)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;