import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiUploadCloud, FiMusic, FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import API from "../../../urls";

const VoiceCloning = () => {
  const user = useSelector(auth => auth.auth.userData)
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [clonedVoiceUrl, setClonedVoiceUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceName, setVoiceName] = useState("");
  const [successMsg, setSuccessMsg] = useState(null)

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["mp3", "wav"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isValidType = allowedExtensions.includes(fileExtension);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType) {
      toast.error("Invalid file type. Only MP3 and WAV are allowed.");
      return false;
    }
    if (!isValidSize) {
      toast.error("File size must be under 5MB.");
      return false;
    }

    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      if (audio.duration > 120) {
        toast.error("Audio duration must be under 2 minutes.");
        setFile(null);
      }
    };
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      toast.success("File selected successfully!");
    }
  };

  const uploadToCloudinary = async () => {
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jawad_upload");

    try {
      setSuccessMsg(null);
      setIsUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvuynjvai/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          },
        }
      );

      setIsUploading(false);
      if (!response.data.secure_url) throw new Error("Upload failed");
      toast.success("File uploaded successfully!");
      return response.data.secure_url;
    } catch (error) {
      setIsUploading(false);
      toast.error("Upload failed. Check console.");
      console.error("Cloudinary Upload Error:", error);
    }
  };

  const handleCloneVoice = async () => {
    if (!voiceName.trim()) {
      toast.error("Please provide a name for the cloned voice.");
      return;
    }

    const uploadedUrl = await uploadToCloudinary();
    if (!uploadedUrl) return;

    try {
      setIsProcessing(true);
      const { data } = await axios.post("https://backend-hailio.onrender.com/api/v1/voice/clone_voice", {
        fileUrl: uploadedUrl,
        voiceName,
        userId: user._id
      });

      console.log(data.data)
      // setClonedVoiceUrl(response.data.clonedVoiceUrl);
      toast.success("Voice cloned successfully!");
      setVoiceName("");
      setFile(null);
      setSuccessMsg("Voice cloned successfully!");
    } catch (error) {
      setSuccessMsg(null);
      toast.error(error?.response?.data?.message);
      console.log(error)
    } finally {
      setIsProcessing(false);
    }
  };

  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Voice Cloning</h2>
      {successMsg && (
        <h1 className="text-green-400 mt-2 text-center flex items-center justify-center gap-2 text-xl">
          Voice cloned successfully
        </h1>
      )}

      <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-800 transition duration-200">
        <input type="file" accept=".mp3,.wav" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label htmlFor="fileUpload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 bg-gray-700 rounded-full">
              <FiUploadCloud className="text-orange-500 text-3xl" />
            </div>
            <p className="text-gray-400">Click or Drag & Drop your audio file (MP3, WAV)</p>
          </div>
        </label>
      </div>

      {file && (
        <p className="text-green-400 mt-2 text-center flex items-center justify-center gap-2">
          <FiMusic /> {file.name}
        </p>
      )}

      {isUploading && (
        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-gray-300 mb-1">Name Your Cloned Voice</label>
        <input
          type="text"
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          className="p-2 w-full border rounded-md bg-gray-700 text-white focus:border-orange-500"
          maxLength="30"
        />
      </div>

      <button
        onClick={handleCloneVoice}
        disabled={isUploading || isProcessing}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-all"
      >
        {isProcessing ? (
          <><span className="animate-spin">⏳</span> Processing...</>
        ) : (
          <><FiCheckCircle /> Upload & Clone Voice</>
        )}
      </button>
    </div>
  );
};

export default VoiceCloning;
