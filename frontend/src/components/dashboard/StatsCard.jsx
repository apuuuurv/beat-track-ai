import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon: Icon, trend }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full" // Forces the wrapper to fill the grid height
    >
      {/* Added min-h-[160px] to make the card visibly taller and chunkier */}
      <Card className="bg-slate-900 border-slate-800 shadow-xl h-full min-h-[160px] flex flex-col">
        {/* Increased padding from p-6 to p-8 */}
        <CardContent className="p-8 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            {/* Slightly larger title text */}
            <p className="text-slate-400 font-medium text-base">{title}</p>
            {Icon && (
              // Increased icon padding and size
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <Icon className="w-6 h-6 text-blue-500" />
              </div>
            )}
          </div>

          <div>
            {/* Bumped up number size from text-3xl to text-4xl */}
            <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>

            {trend ? (
              <p
                className={`text-sm font-medium ${trend.positive ? "text-emerald-400" : "text-rose-400"}`}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}{" "}
                <span className="text-slate-500 ml-1 text-xs font-normal">
                  vs last month
                </span>
              </p>
            ) : (
              // Invisible placeholder so cards without trends maintain the exact same vertical height
              <p className="text-sm opacity-0 select-none cursor-default">
                placeholder
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
