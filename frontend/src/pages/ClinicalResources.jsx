import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HeartPulse,
  Activity,
  Droplet,
  Flame,
  PersonStanding,
  Info,
  Thermometer,
  ShieldAlert,
} from "lucide-react";

// The 8 key metrics your AI model uses, explained in plain English
const insights = [
  {
    title: "Chest Pain Type (Angina)",
    icon: Flame,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    description:
      "Angina is chest pain caused by reduced blood flow to the heart. 'Typical' means it's heavily linked to heart exertion. 'Atypical' or 'Non-anginal' pains are often sharper and may not be heart-related.",
    normalRange: "Asymptomatic (No pain) is ideal.",
  },
  {
    title: "Resting Blood Pressure",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description:
      "This measures the pressure in your arteries when your heart rests between beats. High blood pressure forces your heart to work much harder to pump blood.",
    normalRange: "Normal is generally around 120/80 mm Hg.",
  },
  {
    title: "Serum Cholesterol",
    icon: Droplet,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    description:
      "Cholesterol is a waxy substance in your blood. While your body needs it to build cells, too much of it can create plaque that clogs your arteries.",
    normalRange: "Healthy levels are typically under 200 mg/dl.",
  },
  {
    title: "Fasting Blood Sugar",
    icon: Thermometer,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    description:
      "Measures your blood sugar after an overnight fast. High fasting sugar is an early indicator of diabetes, which significantly increases the risk of heart disease.",
    normalRange: "Normal is under 100 mg/dl. >120 is high.",
  },
  {
    title: "Maximum Heart Rate",
    icon: HeartPulse,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description:
      "The highest number of beats per minute your heart can safely reach during intense exercise. A healthy heart can beat faster during stress than a compromised one.",
    normalRange: "Roughly 220 minus your age.",
  },
  {
    title: "Exercise-Induced Angina",
    icon: PersonStanding,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    description:
      "Does physical activity cause your chest to hurt or feel squeezed? This is a strong indicator that your heart muscle isn't getting enough oxygen under load.",
    normalRange: "Should be 'No' (Negative).",
  },
  {
    title: "Age Factor",
    icon: Info,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    description:
      "As we get older, our blood vessels become less flexible, making it harder for blood to flow easily. This naturally increases the baseline risk for cardiovascular events.",
    normalRange: "Risk generally increases after age 45.",
  },
  {
    title: "AI Risk Assessment",
    icon: ShieldAlert,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    description:
      "Our machine learning model looks at how all these factors interact together—something human brains struggle to calculate instantly—to find hidden patterns of heart disease.",
    normalRange: "Lower percentage = Better health.",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ClinicalResources() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Health Insights</h1>
        <p className="text-slate-400 mt-2 max-w-3xl">
          Understanding your heart health is the first step to improving it.
          Below is a clinical breakdown of the 8 metrics our AI analyzes to
          determine your cardiovascular risk profile.
        </p>
      </div>

      {/* Grid of Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="bg-slate-900 border-slate-800 shadow-xl h-full flex flex-col hover:border-slate-700 transition-colors">
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${insight.bg}`}
                  >
                    <Icon className={`w-6 h-6 ${insight.color}`} />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between text-slate-400 text-sm leading-relaxed">
                  <p className="mb-6">{insight.description}</p>
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                      Target Range:
                    </span>
                    <span className="text-slate-200">
                      {insight.normalRange}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
