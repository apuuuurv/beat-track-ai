import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  User, 
  Droplets, 
  Stethoscope, 
  Heart, 
  Cpu, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  Microscope,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultCard from "./ResultCard";

export default function PredictionForm() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    chestPain: "0",
    bp: "",
    cholesterol: "",
    sugar: "false",
    thalach: "",
    exang: "0",
  });

  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // Logic: Auto-calculate heart rate (220 - age)
  useEffect(() => {
    const ageNum = parseInt(form.age);
    if (!isNaN(ageNum) && ageNum >= 10 && ageNum <= 110) {
      if (!form.thalach || form.thalach === (220 - (ageNum - 1)).toString()) {
        setForm(prev => ({ ...prev, thalach: (220 - ageNum).toString() }));
      }
    }
  }, [form.age]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const isFormIncomplete = Object.values(form).some((value) => value === "");
    if (isFormIncomplete) {
      setError("Clinical data packet incomplete. All parameters required.");
      return;
    }

    setResult(null);
    setError("");
    setScanning(true);
    
    const startTime = Date.now();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(form.age),
          sex: form.gender === "male" ? 1 : 0,
          cp: Number(form.chestPain),
          trestbps: Number(form.bp),
          chol: Number(form.cholesterol),
          fbs: form.sugar === "true" ? 1 : 0,
          thalach: Number(form.thalach),
          exang: Number(form.exang),
        }),
      });
      const data = await response.json();
      const delay = Math.max(2500 - (Date.now() - startTime), 0);
      
      setTimeout(() => {
        if (data.error) setError(data.error);
        else setResult(data);
        setScanning(false);
      }, delay);
    } catch (e) {
      setScanning(false);
      setError("AI Core communication failure. Server unreachable.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.1, type: "spring", damping: 25 }
    })
  };

  return (
    <div className="flex flex-col items-center min-h-full py-6 md:py-16 px-4 relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl space-y-8 md:space-y-12 relative z-10"
      >
        {/* Header section */}
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Neural Diagnostics Engine V3.0
          </motion.div>
          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
            Patient Analysis <span className="text-blue-500 not-italic">Terminal</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium tracking-wide">
            Calibrate biometric markers for real-time cardiovascular risk stratification.
          </p>
        </div>

        {/* --- THREE-CARD STAGED LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* STAGE 01: PROFILE */}
          <motion.div custom={0} variants={cardVariants}>
            <Card className="glass glow-border h-full bg-slate-950/20 border-white/5 relative group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-bold text-blue-500 flex items-center gap-2 uppercase tracking-widest">
                  <User className="w-4 h-4" /> 01. Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Numerical Age</label>
                    <span className="text-[10px] text-blue-500/60 font-mono">READY</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter Age"
                    className="bg-slate-900/50 border-white/10 h-12 font-mono text-white focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 transition-all opacity-100 pointer-events-auto"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Biological Sex</label>
                  <Tabs value={form.gender} onValueChange={(v) => handleChange("gender", v)}>
                    <TabsList className="grid grid-cols-2 w-full bg-slate-900 border border-white/5 h-12 p-1">
                      <TabsTrigger value="male" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">MALE</TabsTrigger>
                      <TabsTrigger value="female" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">FEMALE</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* STAGE 02: VITALS */}
          <motion.div custom={1} variants={cardVariants}>
            <Card className="glass glow-border h-full bg-slate-950/20 border-white/5 relative group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-bold text-emerald-500 flex items-center gap-2 uppercase tracking-widest">
                  <Activity className="w-4 h-4" /> 02. Hemodynamics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase italic">Resting Blood Pressure</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="120"
                      className="bg-slate-900/50 border-white/10 h-12 font-mono text-white pl-10 focus:border-emerald-500/50 transition-all"
                      value={form.bp}
                      onChange={(e) => handleChange("bp", e.target.value)}
                    />
                    <Zap className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <span className="absolute right-3 top-3.5 text-[9px] text-slate-600 font-mono">mmHg</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase italic">Serum Cholesterol</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="200"
                      className="bg-slate-900/50 border-white/10 h-12 font-mono text-white pl-10 focus:border-emerald-500/50 transition-all"
                      value={form.cholesterol}
                      onChange={(e) => handleChange("cholesterol", e.target.value)}
                    />
                    <Droplets className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <span className="absolute right-3 top-3.5 text-[9px] text-slate-600 font-mono">mg/dl</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase italic">Fasting Sugar {">"} 120</label>
                  <Tabs value={form.sugar} onValueChange={(v) => handleChange("sugar", v)}>
                    <TabsList className="grid grid-cols-2 w-full bg-slate-900 border border-white/5 h-12 p-1">
                      <TabsTrigger value="true" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">YES</TabsTrigger>
                      <TabsTrigger value="false" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">NO</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* STAGE 03: SYMPTOMS */}
          <motion.div custom={2} variants={cardVariants}>
            <Card className="glass glow-border h-full bg-slate-950/20 border-white/5 relative group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-bold text-purple-500 flex items-center gap-2 uppercase tracking-widest">
                  <Stethoscope className="w-4 h-4" /> 03. Symptoms Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Chest Pain Classification</label>
                  <Select value={form.chestPain} onValueChange={(v) => handleChange("chestPain", v)}>
                    <SelectTrigger className="bg-slate-900/50 border-white/10 h-12 text-xs font-bold text-white uppercase focus:ring-purple-500/20">
                      <SelectValue placeholder="Classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-950 border-white/10 backdrop-blur-3xl text-white">
                      <SelectItem value="0" className="text-[10px] font-bold">TYPICAL ANGINA</SelectItem>
                      <SelectItem value="1" className="text-[10px] font-bold">ATYPICAL ANGINA</SelectItem>
                      <SelectItem value="2" className="text-[10px] font-bold">NON-ANGINAL PAIN</SelectItem>
                      <SelectItem value="3" className="text-[10px] font-bold">ASYMPTOMATIC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Max Heart Rate [220 - Age]</label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="bg-slate-900/50 border-white/10 h-12 font-mono text-white pl-10 focus:border-purple-500/50 transition-all"
                      value={form.thalach}
                      onChange={(e) => handleChange("thalach", e.target.value)}
                    />
                    <Heart className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <span className="absolute right-3 top-3.5 text-[9px] text-slate-600 font-mono">BPM</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase text-center w-full block">Exercise Angina</label>
                  <Tabs value={form.exang} onValueChange={(v) => handleChange("exang", v)}>
                    <TabsList className="grid grid-cols-2 w-full bg-slate-900 border border-white/5 h-12 p-1">
                      <TabsTrigger value="1" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">POS (+)</TabsTrigger>
                      <TabsTrigger value="0" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">NEG (-)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* --- ACTION SECTION --- */}
        <div className="flex flex-col items-center gap-6 pt-10">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-xs font-bold text-red-500 uppercase tracking-wider"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-xl relative overflow-hidden rounded-2xl">
            <Button
              onClick={handleSubmit}
              disabled={scanning}
              className={`w-full h-20 text-xl font-black uppercase tracking-[0.3em] transition-all duration-500 border border-white/5 shadow-2xl ${
                scanning 
                  ? "bg-slate-900 text-slate-500 cursor-wait" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.3)]"
              }`}
            >
              {scanning ? (
                <div className="flex items-center gap-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Cpu className="w-6 h-6" />
                  </motion.div>
                  SCANNING DATA...
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  Initiate AI Analysis
                </div>
              )}
            </Button>

            {/* SCANNING LASER ANIMATION */}
            <AnimatePresence>
              {scanning && (
                <motion.div
                  initial={{ top: "-5%" }}
                  animate={{ top: "105%" }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "linear" 
                  }}
                  className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_#60a5fa] z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex gap-8 opacity-40">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              <ShieldCheck className="w-3 h-3" /> HIPAA Compliant
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              <Microscope className="w-3 h-3" /> Clinical Model
            </div>
          </div>
        </div>

        {/* RESULTS AREA */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-10 scroll-mt-10"
            >
              <div className="max-w-4xl mx-auto">
                <ResultCard result={result} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
