import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResultCard from "./ResultCard";

export default function PredictionForm() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    chestPain: "",
    bp: "",
    cholesterol: "",
    sugar: "",
    thalach: "",
    exang: "",
  });

  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  const estimateMaxHeartRate = () => {
    if (!form.age || isNaN(form.age)) {
      setError("Please enter your age first to estimate Max Heart Rate.");
      return;
    }
    const estimatedThalach = 220 - Number(form.age);
    setForm({ ...form, thalach: estimatedThalach.toString() });
    setError("");
  };

  const handleSubmit = async () => {
    const isFormIncomplete = Object.values(form).some((value) => value === "");
    if (isFormIncomplete) {
      setError("Please fill in all fields before predicting.");
      return;
    }

    const ageNum = Number(form.age);
    const bpNum = Number(form.bp);
    const cholNum = Number(form.cholesterol);
    const thalachNum = Number(form.thalach);

    if (ageNum < 18 || ageNum > 100) {
      setError("Age must be 18-100.");
      return;
    }
    if (bpNum < 80 || bpNum > 250) {
      setError("BP must be 80-250.");
      return;
    }
    if (cholNum < 100 || cholNum > 600) {
      setError("Cholesterol must be 100-600.");
      return;
    }
    if (thalachNum < 60 || thalachNum > 220) {
      setError("Max HR must be 60-220.");
      return;
    }

    setResult(null);
    setError("");
    setLoading(true);

    const payload = {
      age: ageNum,
      sex: form.gender === "male" ? 1 : 0,
      cp: Number(form.chestPain),
      trestbps: bpNum,
      chol: cholNum,
      fbs: form.sugar === "true" ? 1 : 0,
      thalach: thalachNum,
      exang: Number(form.exang),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (error) {
      setError("Failed to connect to server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed: Added px-4 and adjusted py for mobile comfort
    <div className="flex items-center justify-center min-h-[80vh] py-6 px-4 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
          {/* Changed: Responsive padding (p-5 on mobile, p-8 on desktop) */}
          <CardContent className="p-5 md:p-8 space-y-5 md:space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-blue-500 text-center uppercase tracking-tight">
                At-Home Heart Risk Screener
              </h2>
              <p className="text-xs md:text-sm text-slate-400 text-center max-w-md mx-auto">
                Answer these 8 simple questions to assess your cardiovascular
                risk.
              </p>
            </div>

            {/* Changed: grid-cols-1 (mobile) to grid-cols-2 (desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Your Age"
                className="bg-slate-950 border-slate-800 focus:ring-blue-500 h-11 md:h-10"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />

              <Select
                value={form.gender}
                onValueChange={(v) => handleChange("gender", v)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 md:h-10">
                  <SelectValue placeholder="Biological Sex" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white border-slate-700">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.chestPain}
                onValueChange={(v) => handleChange("chestPain", v)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 md:h-10">
                  <SelectValue placeholder="Chest Pain Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white border-slate-700">
                  <SelectItem value="0">Typical (Heavy pressure)</SelectItem>
                  <SelectItem value="1">Atypical (Sharp/Stabbing)</SelectItem>
                  <SelectItem value="2">Non-heart (Muscle ache)</SelectItem>
                  <SelectItem value="3">No Pain</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.exang}
                onValueChange={(v) => handleChange("exang", v)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 md:h-10">
                  <SelectValue placeholder="Exercise Pain?" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white border-slate-700">
                  <SelectItem value="1">Yes, pain during exercise</SelectItem>
                  <SelectItem value="0">No, feels fine</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="BP (e.g. 120)"
                className="bg-slate-950 border-slate-800 h-11 md:h-10"
                value={form.bp}
                onChange={(e) => handleChange("bp", e.target.value)}
              />

              <Input
                type="number"
                placeholder="Cholesterol (e.g. 200)"
                className="bg-slate-950 border-slate-800 h-11 md:h-10"
                value={form.cholesterol}
                onChange={(e) => handleChange("cholesterol", e.target.value)}
              />

              <Select
                value={form.sugar}
                onValueChange={(v) => handleChange("sugar", v)}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 md:h-10">
                  <SelectValue placeholder="Diabetic?" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white border-slate-700">
                  <SelectItem value="true">Yes (&gt; 120 mg/dl)</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Max Heart Rate"
                  className="bg-slate-950 border-slate-800 h-11 md:h-10"
                  value={form.thalach}
                  onChange={(e) => handleChange("thalach", e.target.value)}
                />
                <button
                  type="button"
                  onClick={estimateMaxHeartRate}
                  className="text-[10px] md:text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 ml-1"
                >
                  <Calculator className="w-3 h-3" />
                  Estimate based on age
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs md:text-sm text-center font-medium bg-red-500/10 py-2 rounded border border-red-500/20">
                {error}
              </div>
            )}

            {/* Changed: Larger touch target for mobile (py-7 vs py-6) */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 md:h-12 text-base"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Analyzing Data..." : "Calculate Risk"}
            </Button>

            {result && (
              <div ref={resultRef} className="pt-4 scroll-mt-10">
                {/* Added ref={resultRef} and scroll-mt-10 for a little extra breathing room */}
                <ResultCard result={result} />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
