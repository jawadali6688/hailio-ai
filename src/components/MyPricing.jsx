import { motion } from "framer-motion";
import { CheckCircle, XCircle, DollarSign, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    name: "Free Plan",
    price: "only for Puranr Marka",
    icon: <DollarSign size={24} className="text-primary" />,
    features: [
      { text: "5 Minutes Free Voice", included: true },
      { text: "Basic AI Models", included: true },
      { text: "Standard Speed", included: true },
      { text: "No API Access", included: false },
    ],
    buttonText: "Get Started",
    buttonStyle: "bg-white text-orange-500 outline outline-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white duration-200",
  },
  {
    id: 2,
    name: "Pro Plan",
    price: "Pkr 1999/month",
    icon: <Star size={24} className="text-yellow-500" />,
    features: [
      { text: "2 Hours AI Voice", included: true },
      { text: "Advanced AI Models", included: true },
      { text: "Emotion Control", included: true },
      { text: "API Access", included: true },
    ],
    buttonText: "Upgrade Now",
    buttonStyle: "bg-gray-800 text-white hover:bg-gray-700  duration-200 cursor-pointer",
  },
  {
    id: 3,
    name: "Enterprise Plan",
    price: "Custom Pricing",
    icon: <Briefcase size={24} className="text-orange-500" />,
    features: [
      { text: "Unlimited AI Voice", included: true },
      { text: "Voice Cloning", included: true },
      { text: "Custom API", included: true },
      { text: "24/7 Priority Support", included: true },
    ],
    buttonText: "Contact Us",
    buttonStyle: "bg-orange-500 text-white cursor-pointer hover:bg-white hover:text-black hover:outline hover:outline-orange-500 duration-200",
  },
];

const MyPricing = () => {
  const navigate = useNavigate()
  return (
    <section id="pricing" className="py-16 bg-base-100 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-primary mb-8"
      >
        Pricing Plans
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{scale: 1.1}}
            transition={{ duration: 0.2,  }}
            className="p-8 border border-gray-300 rounded-xl flex flex-col items-center text-center transition-all cursor-pointer hover:bg-gray-200  duration-200"
          >
            <div className="mb-4">{plan.icon}</div>
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold my-2">{plan.price}</p>
            <ul className="text-sm space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {feature.included ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <button 
            onClick={() => navigate("/login")}
            className={`mt-6 px-4 py-2 rounded-md ${plan.buttonStyle}`}>
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyPricing;
