import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Leaf, Flame, Hash, MapPin, ShieldCheck, Zap, Globe, Cpu, Sparkles, Download, Loader2 } from 'lucide-react';

const PredictionResult = ({ prediction, onDownload, isDownloading }) => {
  const { 
    country, 
    year, 
    region,
    is_clean_dominant, 
    confidence, 
    probabilities 
  } = prediction;

  const cleanProbability = probabilities[1] * 100;
  const fossilProbability = probabilities[0] * 100;

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 1.5, ease: "circOut" },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      className="w-full max-w-5xl mx-auto cursor-default perspective-1000"
    >
      <div 
        className="glass-card overflow-hidden border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Color-coded Banner */}
        <div className={`p-10 relative overflow-hidden ${
          is_clean_dominant
            ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-b border-emerald-500/20'
            : 'bg-gradient-to-br from-red-500/10 to-transparent border-b border-red-500/20'
        }`}>
          {/* Input Parameter Badge (PDF Context) */}
          <div className="absolute top-4 left-10 flex gap-4 opacity-50">
            <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-white/5">
              <span className="text-[7px] font-black uppercase text-white/40 tracking-widest">Input Node:</span>
              <span className="text-[7px] font-bold text-amber-400 uppercase tracking-tight">{country}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-white/5">
              <span className="text-[7px] font-black uppercase text-white/40 tracking-widest">Temporal Lock:</span>
              <span className="text-[7px] font-bold text-amber-400 uppercase tracking-tight">{year}</span>
            </div>
          </div>

          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className={`w-24 h-24 rounded-3xl flex items-center justify-center relative translate-z-50 ${
                  is_clean_dominant
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 glow-emerald'
                    : 'bg-gradient-to-br from-red-500 to-amber-700'
                }`}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-3xl" />
                {is_clean_dominant ? (
                  <Leaf className="w-12 h-12 text-white drop-shadow-lg" />
                ) : (
                  <Flame className="w-12 h-12 text-white drop-shadow-lg" />
                )}
              </motion.div>

              <div>
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full animate-ping ${is_clean_dominant ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">System Analysis Complete</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none translate-z-100 ${
                    is_clean_dominant ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {is_clean_dominant ? 'Clean Energy' : 'Fossil Fuel'} <br />
                  <span className="text-white opacity-90">Dominance</span>
                </motion.div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Inference Confidence</div>
              <div className={`text-5xl font-black tracking-tighter leading-none mb-4 ${is_clean_dominant ? 'text-emerald-400' : 'text-red-400'}`}>
                {(confidence * 100).toFixed(1)}%
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload();
                }}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-6 py-2.5 glass rounded-xl text-white font-bold text-[10px] uppercase tracking-widest hover:bg-amber-400/10 border-white/10 hover:border-amber-400/30 transition-all disabled:opacity-50"
              >
                {isDownloading ? (
                   <Loader2 size={14} className="animate-spin text-amber-400" />
                ) : (
                  <Download size={14} className="text-amber-400" />
                )}
                Download Report
              </motion.button>

              <div className="mt-4 flex items-center justify-end gap-2 text-white/40 uppercase text-[10px] font-bold">
                <ShieldCheck size={12} className="text-emerald-400" /> Model Verified
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 lg:p-16 flex flex-col lg:flex-row gap-16 items-center">
          {/* Energy Sphere Visualization */}
          <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center translate-z-100">
            {/* Ambient Shadow */}
            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[70%] h-[15%] bg-black/40 blur-2xl rounded-full" />
            
            {/* The 3D Energy Sphere (CSS Only) */}
            <motion.div 
              animate={{ 
                rotateZ: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className={`relative w-48 h-48 rounded-full border-2 border-white/10 flex items-center justify-center ${
                is_clean_dominant ? 'shadow-[0_0_80px_rgba(16,185,129,0.3)]' : 'shadow-[0_0_80px_rgba(239,68,68,0.3)]'
              }`}
            >
              {/* Inner Glowing Core */}
              <div className={`w-32 h-32 rounded-full blur-xl animate-pulse ${
                is_clean_dominant ? 'bg-emerald-500/40' : 'bg-red-500/40'
              }`} />
              
              {/* Orbiting Particles (Simulated) */}
              {[0, 90, 180, 270].map((deg) => (
                <div 
                  key={deg}
                  className="absolute inset-0"
                  style={{ transform: `rotateZ(${deg}deg)` }}
                >
                  <div className={`w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2 opacity-60 ${
                    is_clean_dominant ? 'bg-emerald-400' : 'bg-red-400'
                  }`} />
                </div>
              ))}
              
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_100%)] shadow-inner" />
            </motion.div>
            
            {/* Meta Info beside sphere */}
            <div className="absolute -right-4 -bottom-4 text-left glass p-4 rounded-2xl border-white/5 max-w-[120px]">
              <div className="text-[8px] font-black text-white/40 uppercase mb-1">Status</div>
              <div className="text-[10px] text-white font-bold tracking-tight">Active Matrix Equilibrium</div>
            </div>
          </div>

          {/* Probability Metrics */}
          <div className="flex-1 w-full space-y-12">
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-white font-black uppercase text-xl tracking-tighter">Clean Energy <span className="text-emerald-400">Score</span></h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Renewable integration probability</p>
                </div>
                <div className="text-emerald-400 font-black text-3xl">{(probabilities[1] * 100).toFixed(1)}%</div>
              </div>
              <div className="h-4 bg-white/5 rounded-full p-1 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${probabilities[1] * 100}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-white font-black uppercase text-xl tracking-tighter">Fossil Fuel <span className="text-red-400">Index</span></h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Hydrocarbon dependency coefficient</p>
                </div>
                <div className="text-red-400 font-black text-3xl">{(probabilities[0] * 100).toFixed(1)}%</div>
              </div>
              <div className="h-4 bg-white/5 rounded-full p-1 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${probabilities[0] * 100}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Inference */}
        <div className="px-10 pb-10 lg:px-16 lg:pb-16">
          <div className="glass p-6 rounded-2xl border-amber-400/10 bg-amber-400/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={40} className="text-amber-400" />
            </div>
            <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-3">Neural Inference Report</h4>
            <p className="text-white/80 text-sm leading-relaxed italic pr-12">
              {is_clean_dominant ? (
                `The neural engine predicts a definitive transition to renewable dominance in ${country} by ${year}. With a ${(confidence * 100).toFixed(1)}% confidence score, this shift indicates a high-probability conversion of local infrastructure to sustainable energy matrices.`
              ) : (
                `Fossil fuel-based energy matrices are projected to maintain dominance in ${country} through ${year}. The high dependency coefficient of ${fossilProbability.toFixed(1)}% suggests that carbon-intensive power generation remains the primary equilibrium for this specific temporal lock.`
              )}
            </p>
          </div>
        </div>

        {/* Global Metadata Footer */}
        <div className="bg-white/[0.02] p-10 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Matrix Node", val: country, icon: Globe },
              { label: "Target Region", val: region, icon: MapPin },
              { label: "Temporal Lock", val: year, icon: Zap },
              { label: "Processing", val: "Neural Engine v3", icon: Cpu }
            ].map((stat, i) => (
              <div key={i} className="group cursor-help">
                <div className="flex items-center gap-3 mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <stat.icon size={14} className="text-amber-400" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">{stat.label}</span>
                </div>
                <div className="text-white font-bold text-sm tracking-tight group-hover:text-amber-400 transition-colors uppercase">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
