import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Activity,
  HeartPulse,
} from "lucide-react";

export default function ResultCard({ result }) {
  const probabilityPercentage = (result.probability * 100).toFixed(1);

  // 1. Define theme colors and icons based on risk level
  const theme =
    {
      High: {
        color: "text-red-500",
        bg: "bg-red-500/10",
        badge: "bg-red-600 hover:bg-red-700",
        progress: "bg-red-500",
        icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      },
      Medium: {
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        badge: "bg-yellow-500 hover:bg-yellow-600 text-slate-900",
        progress: "bg-yellow-500",
        icon: <Info className="w-6 h-6 text-yellow-500" />,
      },
      Low: {
        color: "text-green-500",
        bg: "bg-green-500/10",
        badge: "bg-green-600 hover:bg-green-700",
        progress: "bg-green-500",
        icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      },
    }[result.risk] || theme.Low; // Fallback to Low

  // 2. Generate highly precise, actionable recommendations
  const getRecommendations = (risk) => {
    switch (risk) {
      case "High":
        return [
          "Seek emergency medical assessment immediately, especially if experiencing active chest pain or shortness of breath.",
          "Do not engage in strenuous physical activity until cleared by a cardiologist.",
          "Keep a daily log of blood pressure, heart rate, and any chest discomfort (duration and triggers).",
          "Prepare a list of your current medications and family cardiac history for your emergency visit.",
        ];
      case "Medium":
        return [
          "Schedule a non-urgent consultation with a cardiologist within the next 2 to 4 weeks.",
          "Request a comprehensive lipid panel, HbA1c test, and a professional resting ECG.",
          "Begin strict dietary sodium reduction (aim for under 1,500 mg per day) and limit saturated fats.",
          "Monitor and record your blood pressure at home twice daily (morning and evening).",
        ];
      case "Low":
        return [
          "Maintain routine annual or bi-annual checkups with your primary care physician.",
          "Aim for the AHA-recommended 150 minutes of moderate-intensity aerobic exercise per week.",
          "Focus on a heart-healthy diet rich in whole grains, lean proteins, and minimizing processed sugars.",
          "Keep stress levels managed and ensure 7-9 hours of quality sleep per night.",
        ];
      default:
        return [];
    }
  };

  const specificRecommendations = getRecommendations(result.risk);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-8 border border-slate-700 rounded-xl overflow-hidden bg-slate-900/50"
    >
      {/* Header Section */}
      <div
        className={`p-6 flex items-center justify-between border-b border-slate-700/50 ${theme.bg}`}
      >
        <div className="flex items-center gap-3">
          {theme.icon}
          <h3 className="text-xl font-semibold text-slate-100">
            AI Assessment
          </h3>
        </div>
        <Badge className={`text-sm px-4 py-1.5 ${theme.badge}`}>
          {result.risk} Risk
        </Badge>
      </div>

      {/* Probability Score Section */}
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Calculated Probability
            </span>
            <span className={`text-2xl font-bold ${theme.color}`}>
              {probabilityPercentage}%
            </span>
          </div>
          {/* Custom Progress Bar */}
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${probabilityPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full ${theme.progress}`}
            />
          </div>
        </div>

        {/* Action Plan Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-blue-400" /> Action Plan
          </h4>
          <ul className="space-y-2 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
            {specificRecommendations.map((rec, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm text-slate-300 leading-relaxed"
              >
                <span className={`mt-0.5 font-bold ${theme.color}`}>•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Medical Disclaimer */}
        <p className="text-xs text-slate-500 text-center italic mt-4">
          Disclaimer: This AI prediction is for informational purposes only and
          does not constitute official medical advice.
        </p>
      </div>
    </motion.div>
  );
}
