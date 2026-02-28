import { useState } from "react";
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
  // 1. Scaled down to the 8 patient-friendly features
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  // Helper function: Auto-calculate Max Heart Rate based on Age
  const estimateMaxHeartRate = () => {
    if (!form.age || isNaN(form.age)) {
      setError("Please enter your age first to estimate Max Heart Rate.");
      return;
    }
    const estimatedThalach = 220 - Number(form.age);
    setForm({ ...form, thalach: estimatedThalach.toString() });
    setError(""); // Clear error if successful
  };

  const handleSubmit = async () => {
    // 1. Validation: Check if any of the 8 fields are empty
    const isFormIncomplete = Object.values(form).some((value) => value === "");

    if (isFormIncomplete) {
      setError("Please fill in all fields before predicting.");
      return;
    }

    // --- NEW CODE: Medical Guardrails / Realistic Data Validation ---
    const ageNum = Number(form.age);
    const bpNum = Number(form.bp);
    const cholNum = Number(form.cholesterol);
    const thalachNum = Number(form.thalach);

    if (ageNum < 18 || ageNum > 100) {
      setError("Please enter a valid age between 18 and 100.");
      return;
    }
    if (bpNum < 80 || bpNum > 250) {
      setError(
        "Resting blood pressure must be a realistic value (80 - 250 mm Hg).",
      );
      return;
    }
    if (cholNum < 100 || cholNum > 600) {
      setError("Cholesterol must be a realistic value (100 - 600 mg/dl).");
      return;
    }
    if (thalachNum < 60 || thalachNum > 220) {
      setError("Max heart rate must be a realistic value (60 - 220 bpm).");
      return;
    }
    // ----------------------------------------------------------------

    setResult(null);
    setError("");
    setLoading(true);

    // 2. Payload mapping exactly to the 8 features for the new At-Home model
    const payload = {
      age: ageNum, // Reusing our parsed numbers from above
      sex: form.gender === "male" ? 1 : 0,
      cp: Number(form.chestPain),
      trestbps: bpNum, // Reusing parsed number
      chol: cholNum, // Reusing parsed number
      fbs: form.sugar === "true" ? 1 : 0,
      thalach: thalachNum, // Reusing parsed number
      exang: Number(form.exang),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Catch backend validation errors
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Failed to connect to the prediction server. Make sure your Python backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-slate-900 border-slate-800 shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-blue-500 text-center">
              At-Home Heart Risk Screener
            </h2>
            <p className="text-sm text-slate-400 text-center mb-6">
              Answer these 8 simple questions to assess your cardiovascular
              risk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Your Age"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />

              <Select
                value={form.gender}
                onValueChange={(v) => handleChange("gender", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Biological Sex" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-700 z-50">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.chestPain}
                onValueChange={(v) => handleChange("chestPain", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Describe any chest pain" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-700 z-50">
                  <SelectItem value="0">
                    Typical (Heavy pressure/squeezing)
                  </SelectItem>
                  <SelectItem value="1">
                    Atypical (Sharp/stabbing pain)
                  </SelectItem>
                  <SelectItem value="2">
                    Non-heart related (Muscle ache)
                  </SelectItem>
                  <SelectItem value="3">I have no chest pain</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.exang}
                onValueChange={(v) => handleChange("exang", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pain when exercising?" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-700 z-50">
                  <SelectItem value="1">
                    Yes, exercise causes chest pain
                  </SelectItem>
                  <SelectItem value="0">No, I feel fine exercising</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Resting Blood Pressure (e.g., 120)"
                value={form.bp}
                onChange={(e) => handleChange("bp", e.target.value)}
              />

              <Input
                type="number"
                placeholder="Total Cholesterol (e.g., 200)"
                value={form.cholesterol}
                onChange={(e) => handleChange("cholesterol", e.target.value)}
              />

              <Select
                value={form.sugar}
                onValueChange={(v) => handleChange("sugar", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Are you Diabetic?" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-700 z-50">
                  <SelectItem value="true">
                    Yes (Fasting sugar &gt; 120 mg/dl)
                  </SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>

              {/* Max Heart Rate with Auto-Estimate Button */}
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Max Heart Rate (e.g., 150)"
                  value={form.thalach}
                  onChange={(e) => handleChange("thalach", e.target.value)}
                />
                <button
                  type="button"
                  onClick={estimateMaxHeartRate}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <Calculator className="w-3 h-3" />
                  Don't know? Estimate based on age
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium mt-2 bg-red-500/10 py-2 rounded">
                {error}
              </div>
            )}

            <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-lg py-6"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Analyzing Data..." : "Calculate Risk"}
            </Button>

            {result && <ResultCard result={result} />}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
