import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">JSF Solutions</h2>
          <p className="mt-3 text-gray-400">
            Empowering AI innovations. Building next-gen voice solutions for seamless communication. Contact us for any queries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">About</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-orange-500" />
              <p>jsfitsolutions@gmail.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-red-500" />
              <p>Zahir Pir, Khan Pur</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Facebook size={30} /></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Twitter size={30} /></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Instagram size={30} /></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Linkedin size={30} /></a>
        </div>
        <p className="mt-4 text-gray-500 text-sm">© {new Date().getFullYear()} JSF Solutions. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">Created by <a href="https://jawad-khan.vercel.app" target="_blank" className="text-orange-500 text-lg">Jawad Khan</a></p>
      </div>
    </footer>
  );
};

export default Footer;
