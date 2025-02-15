import { motion } from "framer-motion";
import { FaMicrophone, FaCog, FaDownload } from "react-icons/fa";

const steps = [
  { id: 1, icon: <FaMicrophone />, title: "Upload Your Voice", description: "Clone any voice in seconds with high-quality AI processing." },
  { id: 2, icon: <FaCog />, title: "Customize & Generate", description: "Adjust pitch, tone, and emotions to create realistic AI voices." },
  { id: 3, icon: <FaDownload />, title: "Download & Use", description: "Get your AI-generated voice ready to use instantly." },
];

const HowItWorks = () => {
  return (
    <section id="" className="py-16 bg-base-100 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-primary mb-8"
      >
        How JSF AI Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: step.id * 0.2 }}
            className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center hover:drop-shadow-2xl duration-300 cursor-pointer"
          >
            <div className="text-5xl text-primary mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
