import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mic, RefreshCcw, RotateCcw  } from 'lucide-react'
import toast from "react-hot-toast";
import VoiceCloning from "./dashboard/VoiceClonging";
import axios from "axios";
import VoicePlayer from "./dashboard/VoicePlayer";
import { useSelector } from "react-redux";
import API from "../../urls";

const Dashboard = ({tab}) => {
  const messages = [
    'Grabbing some pixels...',
    'Just a sec... making it awesome!',
    'Loading magic... 🪄✨',
    'Still working... promise it’s worth it!',
    'Almost there... hold tight!',
    'Transforming bytes into fun!',
    'You’re gonna love this! 🧡',
    'Making data dance... 💃🕺',
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  const user = useSelector(auth => auth.auth.userData)
  const userId = user?._id
  const [genAudio, setGenAudio] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("settings");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState(null)
  const [history, setHistory] = useState([])
  const [selectedVoice, setSelectedVoices] = useState(null)

  const text_to_speech = async () => {
    try {
      if (!text || text === "") {
        toast.error("Bhai kuch likh v lo!")
        return
      }
      if (!selectedVoice) {
        toast.error("Bhai speaker to select kr koi")
        return
      }
      setGenAudio(null);
      setLoading(true);
      setError(false)
      const response = await axios.post(
        "https://backend-hailio.onrender.com/api/v1/voice/text_to_speech",
        { text, speed, audioUrl: selectedVoice?.clonedUrl, userId: user._id },
        { responseType: "arraybuffer" } // Receive raw binary data
      );
  
      console.log(response.data); // Debugging
  
    //   // Convert array buffer to blob
    //   const arrayBufferToAudioUrl = (arrayBuffer, mimeType = "audio/mp3") => {
    //     const blob = new Blob([new Uint8Array(arrayBuffer)], { type: mimeType });
    //     return URL.createObjectURL(blob);
    // };
    
    // // Example usage
    // const audioSrc = arrayBufferToAudioUrl(response.data);
    // Convert Blob to an Object URL
const blobToAudioUrl = (blob) => {
  return URL.createObjectURL(blob);
};

// Example: Assuming 'audioBlob' is the Blob received from the response
const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
const audioSrc = blobToAudioUrl(audioBlob);
      // const audioBlob = new Blob([response.data], { type: "audio/wav" });
      // const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioSrc)
      setGenAudio(audioSrc);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true)
      // toast.error(error.response.message)
      console.log("Error:", error);
    }
  };

  const fetchClonedVoices = async () => {
    try {
      const { data } = await axios.post("https://backend-hailio.onrender.com/api/v1/auth/get_user_cloned", {userId})
      console.log(data.data, "cloned")
      setVoices(data.data.clonedVoices)
      setHistory(data.data.generatedVoices)
    } catch (error) {
      
      console.log(error)
    }
  }

  useEffect(() => {
    fetchClonedVoices()
  }, [tab])

  console.log(voices)
  

  return (
    <section className={`h-screen`}>
       
        {
          tab === "text_to_speech" && (
            <div className="flex flex-col lg:flex-row  text-white p-6  gap-7">
      {/* Left Section - Text Input */}
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col min-h-[400px]">
        {
            error && (
              <p className="text-lg font-bold border bg-orange-600 text-black border-white p-2 rounded-lg">Bhai Refresh kr k try kr nahi to Paid Account ly  - Bhai Paid Plans ly lo, kab tk free chalao gy.</p>
            )
          }
        <textarea
          value={text}
          maxLength={user?.oneTimeCharacters}
          onChange={(e) => setText(e.target.value)}
          className="lg:w-full h-full bg-transparent outline-none text-lg p-4"
          placeholder="Type here to generate speech..."
        />
        <div className="mt-4 ml-4">
            
                {
                  loading ? (
                    <>
                    <div class="absolute inset-0 flex-col gap-4   mx-auto flex items-center justify-center w-full h-full ">
  {/* <div
    class="w-20 h-20 border-4 border-transparent text-orange-500 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-white text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"
    ></div>
  </div>
    <div className="flex flex-col justify-center items-center gap-1 text-orange-600 font-bold">
    <h1>Generating...</h1>
    <p>It may take a while, please wait...</p>
    </div> */}

<div className="flex flex-col items-center justify-center  ">
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
        <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
        <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
      </div>
      <p className="mt-4 text-orange-600 font-semibold text-lg">
        {messages[messageIndex]}
      </p>
    </div>
</div>

                    </>
                  ) 
                  :
                  (
                    <>
                    
                    {
                      user?.voiceAccess && (
                        (history?.length >= user?.allowedVoicesRequest) ? (
                          <h1 className="text-white bg-orange-700 w-fit px-2 py-1 rounded-lg">Bs bhai bahut krli voice generate
                            <h3>ab button v gaib hogya</h3>
                          </h1>


                        ) :
                        (
                          <button 
            disabled={loading}
            onClick={() => text_to_speech() } className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 duration-200 cursor-pointer active:bg-orange-700 disabled:bg-gray-200 disabled:hover:bg-gray-100 disabled:text-gray-900 h-full">
                    <span className="text-md lg:text-md">Generate Speech</span>
                    <Mic size={25}/>
                    </button>
                        )
                      ) 
                    }
                    </>
                  )
                }
           
        </div>
        <div className="text-right text-orange-400 text-sm">{text.length} / {user.oneTimeCharacters}</div>
        
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
            History
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
        <h3 className="text-white font-semibold text-lg">Cloned Voices</h3>
        <button onClick={() => setSelectedVoices(null)} className="text-gray-400 hover:text-white flex items-center space-x-1 cursor-pointer">
          <RotateCcw size={18} />
          <span className="text-sm">Reset Value</span>
        </button>
      </div>
      {
        (!selectedVoice && voices) && (
          <p className="text-red-600 bg-red-100 rounded-lg px-4">No Voice Selected</p>
        )
      }

{
        !voices && (
          <p className="text-red-600 bg-red-100">Bhai koi voice clone kr ly</p>
        )
      }

      {/* Voice Selection */}
      <div className="space-y-4">
        {
          voices?.slice()?.reverse()?.map((voice) => (
            <div 
            onClick={() => setSelectedVoices(voice)}
            key={voice.clonedUrl} className={`flex items-center  p-3 rounded-lg shadow-md cursor-pointer  transition ${selectedVoice?.clonedUrl === voice?.clonedUrl ? ('bg-orange-600') : ('bg-gray-600 hover:bg-gray-700')}`}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="Voice Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-3 flex-1">
          <h4 className="text-white font-medium">{voice.clonedName}</h4>
        </div>
        <div className="flex flex-col gap-1">
       {
        selectedVoice?.clonedUrl === voice?.clonedUrl && (
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
            {/* <div>
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
            </div> */}

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
            <div className="space-y-2">
            {
              history && history?.length > 0 ? (
                history?.slice()?.reverse()?.map((data) => (
                  <div 
                  key={data._id}
             className={`flex items-center gap-4  p-3 rounded-lg shadow-md cursor-pointer  transition hover:bg-gray-200 hover:text-gray-900`}>
        <button
        onClick={() => {
          if (data.audio) {
            const link = document.createElement("a");
            link.href = data.audio;
            link.download = "generated_voice.wav";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            toast.error("No audio available to download.");
          }
        }}
        className="hover:text-orange-600 cursor-pointer"
      >
        <Download size={26} />
      </button>
        <h3 className="w-[99%] truncate">{data?.voiceText}</h3>
      </div>
                ))
              ): 
              (
<p>No history available.</p>
              )
            }
            </div>
            
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
