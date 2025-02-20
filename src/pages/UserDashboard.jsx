import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, RefreshCcw, RotateCcw  } from 'lucide-react'
import toast from "react-hot-toast";
import VoiceCloning from "./dashboard/VoiceClonging";
import axios from "axios";
import VoicePlayer from "./dashboard/VoicePlayer";

const Dashboard = ({tab}) => {
  const [genAudio, setGenAudio] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("settings");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [selectedVoice, setSelectedVoices] = useState({
    id: 1,
    name: "Angelo",
    voice_id: "s3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json",
    gender: "Male"
  })

  const text_to_speech = async () => {
    try {
      if (!text || text === "") {
        toast.error("Input cannot be empty!")
        return
      }
      setGenAudio(null);
      setLoading(true);
      setError(false)
      const response = await axios.post(
        "https://backend-hailio.onrender.com/api/v1/voice/text_to_speech",
        { text, speed, voice_id: selectedVoice.voice_id },
        { responseType: "arraybuffer" } // Receive raw binary data
      );
  
      console.log(response.data); // Debugging
  
      // Convert array buffer to blob
      const audioBlob = new Blob([response.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      setGenAudio(audioUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setError(true)
      console.log("Error:", error);
    }
  };


  const voices = [
    {
      id: 1,
      name: "Angelo",
      voice_id: "s3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json",
      gender: "Male"
    },
    {
      id: 2,
      name: "Jennifer",
      voice_id: "s3://voice-cloning-zero-shot/801a663f-efd0-4254-98d0-5c175514c3e8/jennifer/manifest.json",
      gender: "Female"
    },
    {
      id: 3,
      name: "Samara",
      voice_id: "s3://voice-cloning-zero-shot/90217770-a480-4a91-b1ea-df00f4d4c29d/original/manifest.json",
      gender: "Female"
    },
    {
      id: 4,
      name: "Dexter",
      voice_id: "s3://voice-cloning-zero-shot/b27bc13e-996f-4841-b584-4d35801aea98/original/manifest.json",
      gender: "Male"
    },

  ]
  

  return (
    <section className={`h-screen`}>
       
        {
          tab === "text_to_speech" && (
            <div className="flex flex-col lg:flex-row  text-white p-6  gap-7">
      {/* Left Section - Text Input */}
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col ">
        {
            error && (
              <p className="text-red-600 bg-red-100 flex mx-8 p-2 rounded-md">Error due to load, please try again.</p>
            )
          }
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="lg:w-full h-full bg-transparent outline-none text-lg p-4"
          placeholder="Type here to generate speech..."
        />
        <div className="mt-4 ml-4">
            
                {
                  loading ? (
                    <>
                    <div class="absolute inset-0 flex-col gap-4   mx-auto flex items-center justify-center w-full h-full ">
  <div
    class="w-20 h-20 border-4 border-transparent text-orange-500 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-white text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"
    ></div>
  </div>
    <div className="flex flex-col justify-center items-center gap-1 text-orange-600 font-bold">
    <h1>Generating...</h1>
    <p>It may take a while, please wait...</p>
    </div>
</div>

                    </>
                  ) 
                  :
                  (
                    <>
                    
                    <button 
            disabled={loading}
            onClick={() => text_to_speech() } className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 duration-200 cursor-pointer active:bg-orange-700 disabled:bg-gray-200 disabled:hover:bg-gray-100 disabled:text-gray-900 h-full">
                    <span className="text-md lg:text-md">Generate Speech</span>
                    <Mic size={25}/>
                    </button>
                    </>
                  )
                }
           
        </div>
        <div className="text-right text-orange-400 text-sm">{text.length} / 1 Million</div>
        
        <div>
         
        {genAudio && (
          <>
          <div className="mt-2">
          <VoicePlayer audioSrc={genAudio} speakerName="Jawad Khan" />
          </div>
          </>
        )}

        </div>
      </motion.div>

      {/* Right Section - Settings & History */}
      <div className=" lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
     
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
              activeTab === "clone_voices" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("clone_voices")}
          >
            Cloned Voices
          </button>
          <button
            className={`hidden pb-2 cursor-pointer ${
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
        <button onClick={() => setSelectedVoices({
    id: 1,
    name: "Angelo",
    voice_id: "s3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json",
    gender: "Male"
  })} className="text-gray-400 hover:text-white flex items-center space-x-1 cursor-pointer">
          <RotateCcw size={18} />
          <span className="text-sm">Reset Value</span>
        </button>
      </div>

      {/* Voice Selection */}
      <div className="space-y-4">
        {
          voices.map((voice) => (
            <div 
            onClick={() => setSelectedVoices(voice)}
            key={voice.voice_id} className={`flex items-center  p-3 rounded-lg shadow-md cursor-pointer  transition ${selectedVoice.voice_id === voice.voice_id ? ('bg-orange-600') : ('bg-gray-600 hover:bg-gray-700')}`}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="Voice Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-3 flex-1">
          <h4 className="text-white font-medium">{voice.name}</h4>
          <span className="text-xs text-gray-100 bg-gray-800 px-2 py-1 rounded">
            {voice.gender}
          </span>
        </div>
        {/* <RefreshCcw onClick={() => toast.error("Not allowed, please contact to admin.")} size={18} className="text-gray-400 hover:text-white" /> */}
        <div className="flex flex-col gap-1">
        {/* <span className="text-xs text-gray-100 bg-gray-800 px-2 py-1 rounded">
            English
          </span> */}
       {
        selectedVoice.voice_id === voice.voice_id && (
          <span className="text-xs text-green-100 bg-green-800 px-2 py-1 rounded">
          Selected
        </span>
        )
       }
        </div>
      </div>
          ))
        }
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

            <div className="hidden">
            <span className=" flex justify-between items-center">
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

        {/* Clone voices Panel */}
        {activeTab === "clone_voices" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-gray-400"
          >
            <p>Cloned voices avaible for paid users.</p>
          </motion.div>
        )}
      </div>
    </div>
          )
        }

        {
          tab === "voice_clone" && (
            <div className="sticky bottom-0">
              <VoiceCloning />
            </div>
          )
        }
    </section>
  );
};

export default Dashboard;
