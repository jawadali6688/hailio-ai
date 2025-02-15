import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section id="home" className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white pt-14">
      
      {/* Left Content */}
      <div className="text-center md:text-left md:w-1/2 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          AI-Powered <br /> Voice Generation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg"
        >
          <Markdown>
            **"Created by JSF Solution"** – Generate **realistic voices** with AI,  
            including **cloning, emotions,** and **custom speed control.**  
           **"2 hours of voice in just 2 minutes!"**
          </Markdown>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center md:justify-start space-x-4"
        >
          <button 
          onClick={() => navigate("/login")}
          className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition cursor-pointer" >
            Try Free
          </button>
          <button className="btn border border-white text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-black transition cursor-pointer">
            <Link
            smooth={true}
            to="features">
            Learn More
            </Link>
          </button>
        </motion.div>
      </div>

      {/* Right Image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-10 w-[70%] md:w-1/2 flex justify-center relative"
      >
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIP.nfF7uEHqj_fJotuAcddpsgHaEo?rs=1&pid=ImgDetMain"
            alt="AI Voice Generation"
            className="rounded-2xl shadow-xl w-full max-w-lg"
          />
          <div className="absolute inset-0 bg-black opacity-30 blur-xl"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
