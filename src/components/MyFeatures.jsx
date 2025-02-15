import { motion } from "framer-motion";
import { FaMicrophoneAlt, FaRocket, FaVolumeUp, FaCloudDownloadAlt, FaCode } from "react-icons/fa";

const features = [
  { id: 1, icon: <FaRocket />, title: "Super Fast", description: "Generate 2 hours of voice in just 2 minutes!" },
  { id: 2, icon: <FaMicrophoneAlt />, title: "Ultra-Realistic Voices", description: "High-quality AI voices with human-like expressions." },
  { id: 3, icon: <FaVolumeUp />, title: "Emotions & Tone Control", description: "Customize pitch, speed, and emotions dynamically." },
  { id: 4, icon: <FaCode />, title: "Seamless API Integration", description: "Easily integrate AI voices into your apps & projects." },
  { id: 5, icon: <FaCloudDownloadAlt />, title: "Instant Download", description: "Download generated voices in MP3 & WAV formats." },
];

const MyFeatures = () => {
  return (
    <section id="features" className="py-20 bg-base-200 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-primary mb-8"
      >
        Why Choose JSF AI?
      </motion.h2>
<motion.div
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="w-[98%] lg:w-[90%] mx-auto my-4"
>
<p className="text-gray-800 text-lg  mb-8">
    Experience seamless AI-powered text-to-speech conversion with our intuitive dashboard. 
    Customize voice settings, control pitch & speed, and get high-quality audio in seconds.
  </p>
  
  <div className="w-full max-w-6xl overflow-hidden rounded-2xl shadow-lg border border-gray-700">
    <img
      src="/user_dashboard.png"
      alt="Dashboard Preview"
      className="w-full h-auto object-cover"
    />
  </div>
</motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: feature.id * 0.2 }}
            className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center hover:drop-shadow-2xl duration-300 cursor-pointer"
          >
            <div className="text-5xl text-primary mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyFeatures;
