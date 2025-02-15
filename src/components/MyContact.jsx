import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

const MyContact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "b9e864b9-27ad-418e-a2ef-4c9df735bbfb");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setLoading(false);

    if (result.success) {
      setMessage("Message sent successfully!");
      e.target.reset();
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mt-3">
          Let’s discuss how we can help you with AI Voice Generation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-16 mt-12">
        {/* Left - Contact Info */}
        <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-200"
>
  <div className="flex items-center space-x-4">
    <Mail size={24} className="text-orange-600" />
    <p className="text-lg font-medium text-gray-800">jsfitsolutions@gmail.com</p>
  </div>

  <div className="flex items-center space-x-4">
    <MapPin size={24} className="text-orange-600" />
    <p className="text-lg font-medium text-gray-800">Zahir Pir, Rahim Yar Khan</p>
  </div>

  <div className="border-t border-gray-300 pt-6">
    <p className="text-gray-700 text-lg leading-relaxed">
      <Markdown>
      **Powered by JSF Solutions** – Your trusted partner in AI-powered voice generation.  
      We are committed to delivering cutting-edge AI solutions that redefine voice synthesis.  
      If you have any queries, need assistance, or want to collaborate, feel free to reach out.  
      Our team is here to support you with top-tier expertise and seamless customer service.
      </Markdown>
    </p>
  </div>
</motion.div>


        {/* Right - Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              required
              placeholder="Write your message here..."
              className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-md flex items-center justify-center hover:bg-orange-700 transition duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
            <Send size={18} className="ml-2" />
          </button>

          {message && <p className="text-green-600 text-center mt-2">{message}</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default MyContact;
