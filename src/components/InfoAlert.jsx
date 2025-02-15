import { Info } from "lucide-react";
import { useState } from "react";

const InfoAlert = ({message}) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed z-40 w-[98%]  md:w-[50%]  bottom-0 right-2">
     <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-900 p-4 rounded-lg flex items-center justify-between shadow-md mx-auto my-4 gap-5">
      <div className="flex items-center space-x-3">
        <Info size={24} className="text-orange-500" />
        <p className="text-sm md:text-base font-medium">
          {message}
        </p>
        <span className="bg-red-600 text-white p-1 px-2 rounded-md text-sm">
            <a href="https://jawad-khan.vercel.app/" target="_blank">Contact us</a>
        </span>
      </div>
      <button
        onClick={() => setShow(false)}
        className="text-orange-500 text-xl cursor-pointer hover:text-orange-700 transition"
      >
        ✖
      </button>
    </div>
   </div>
   
  );
};

export default InfoAlert;
