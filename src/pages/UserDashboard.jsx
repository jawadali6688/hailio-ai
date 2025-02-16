import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, RefreshCcw, RotateCcw  } from 'lucide-react'
import toast from "react-hot-toast";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("settings");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);

  return (
    <section className="">
        <div className="flex flex-col lg:flex-row h-[70vh]  text-white p-6  gap-7">
      {/* Left Section - Text Input */}
      <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col ">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="lg:w-full h-full bg-transparent outline-none text-lg p-4"
          placeholder="Type here to generate speech..."
        />
        <div className="mt-4 ml-4">
            <button onClick={() => toast.error("Not allowed, please contact to admin.")} className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 duration-200 cursor-pointer active:bg-orange-700">
                <span className="text-md lg:text-md">Generate Speech</span>
                <Mic size={25}/>
            </button>
        </div>
        <div className="text-right text-orange-400 text-sm">{text.length} / 1 Million</div>
      </div>

      {/* Right Section - Settings & History */}
      <div className="lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          <button
            className={`pb-2 cursor-pointer ${
              activeTab === "settings" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`pb-2 cursor-pointer ${
              activeTab === "history" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {/* Settings Panel */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4"
          >
            <div className="bg-gray-000 p-2 rounded-lg space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold text-lg">Voice</h3>
        <button onClick={() => toast.error("Not allowed, please contact to admin.")} className="text-gray-400 hover:text-white flex items-center space-x-1">
          <RotateCcw size={16} />
          <span className="text-sm">Reset Value</span>
        </button>
      </div>

      {/* Voice Selection */}
      <div className="flex items-center bg-gray-700 p-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition">
        <img onClick={() => toast.error("Not allowed, please contact to admin.")}
          src="https://jawad-khan.vercel.app/assets/myProfile-BAuoORxB.png"
          alt="Voice Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3 flex-1">
          <h4 className="text-white font-medium">Jawad Khan</h4>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            English
          </span>
        </div>
        <RefreshCcw onClick={() => toast.error("Not allowed, please contact to admin.")} size={18} className="text-gray-400 hover:text-white" />
      </div>
    </div>
            <div>
              <span className="flex justify-between items-center">
              <label className="text-gray-400">Speed </label>
              <label className="bg-gray-700 px-4 py-1 rounded-md text-white" >{speed.toFixed(1)}</label>
              </span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div>
            <span className="flex justify-between items-center">
              <label className="text-gray-400">Pitch </label>
              <label className="bg-gray-700 px-4 py-1 rounded-md text-white" >{pitch.toFixed(1)}</label>
              </span>
              
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </motion.div>
        )}

        {/* History Panel */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-gray-400"
          >
            <p>No history available.</p>
          </motion.div>
        )}
      </div>
    </div>
    </section>
  );
};

export default Dashboard;
