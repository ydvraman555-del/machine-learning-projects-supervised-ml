import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Factory, 
  Settings, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Microscope, 
  Layers, 
  Zap, 
  ChevronRight,
  Database,
  Search,
  ArrowRight,
  Cpu,
  Scissors,
  Shirt,
  Maximize2,
  Wind,
  Droplet,
  ChevronDown,
  Workflow,
  Rocket,
  Code2,
  Box,
  Eye,
  GitPullRequest,
  Monitor
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// --- RELIABLE CSS BACKGROUND PARTICLES ---
const IndustrialBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-industrial-dark">
      {/* CSS-based Falling Threads */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(100px, -100px); opacity: 0; }
        }
        .thread {
          position: absolute;
          width: 2px;
          height: 200px;
          background: linear-gradient(to bottom, transparent, #06b6d4, transparent);
          animation: fall linear infinite;
        }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #f97316;
          border-radius: 50%;
          box-shadow: 0 0 15px #f97316;
          animation: float linear infinite;
        }
      `}</style>
      
      {[...Array(15)].map((_, i) => (
        <div 
          key={`t-${i}`} 
          className="thread" 
          style={{ 
            left: `${i * 7}%`, 
            animationDuration: `${10 + (i % 5)}s`,
            animationDelay: `${i * 0.7}s`
          }} 
        />
      ))}

      {[...Array(20)].map((_, i) => (
        <div 
          key={`p-${i}`} 
          className="particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            animationDuration: `${15 + (i % 10)}s`,
            animationDelay: `${i * 0.5}s`
          }} 
        />
      ))}

      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-industrial-orange/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-industrial-cyan/5 blur-[120px] rounded-full" />
    </div>
  );
};

const LaserScanner = ({ active, color }) => (
  <AnimatePresence>
    {active && (
      <motion.div 
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-[2px] z-50 shadow-[0_0_20px_rgba(6,182,212,1)]"
        style={{ backgroundColor: color || '#06b6d4' }}
      >
        <div className="absolute inset-0 bg-white blur-[1px]" />
      </motion.div>
    )}
  </AnimatePresence>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  return (
    <div className="relative z-10 min-h-screen">
      <section className="pt-48 pb-32 px-8 text-center max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 mb-8 bg-industrial-orange/10 px-6 py-2 rounded-full border border-industrial-orange/20">
          <Scissors size={16} className="text-industrial-orange" />
          <span className="text-[10px] uppercase font-black tracking-[0.4em] text-industrial-orange">Textile AI Engine v2.5</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-orbitron font-black leading-none mb-8 tracking-tighter uppercase">
          STITCH<span className="text-industrial-cyan">CORE</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto mb-12 font-medium">
          Advanced Support Vector Machine analysis for next-generation industrial textile inspection and quality grading.
        </motion.p>
        <div className="flex justify-center gap-6">
          <Link to="/inspect" className="group relative inline-flex items-center gap-4 bg-white text-black font-black uppercase tracking-[0.2em] px-12 py-6 rounded-xl overflow-hidden transition-all hover:bg-industrial-cyan hover:text-white">
            Start Neural Scan <ArrowRight size={20} />
          </Link>
          <a href="#workflow" className="px-12 py-6 border border-white/10 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Project Workflow</a>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 px-8 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter mb-2">Project <span className="text-industrial-orange">Workflow</span></h2>
              <p className="text-white/30 font-bold uppercase tracking-widest text-xs">Deep dive into the neural inspection pipeline</p>
            </div>
            <Workflow size={40} className="text-industrial-orange opacity-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Data Ingestion", desc: "Preprocessing 25.7K records of thread counts, GSM, and tensile strength.", icon: Database },
              { step: "02", title: "SVM RBF Kernel", desc: "Non-linear classification using optimized hyperplanes for grade detection.", icon: Cpu },
              { step: "03", title: "Feature Scaling", desc: "Standardization of physical metrics to ensure neural equilibrium.", icon: Layers },
              { step: "04", title: "Inspection", desc: "Real-time inference with 95.4% accuracy across multiple material types.", icon: Eye }
            ].map((w, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glass-card p-8 border-t-2 border-industrial-cyan/30">
                <span className="text-5xl font-orbitron font-black text-white/5 block mb-6">{w.step}</span>
                <w.icon size={24} className="text-industrial-cyan mb-4" />
                <h3 className="font-orbitron font-bold uppercase text-sm mb-3">{w.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-medium">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Future Scope */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="glass-card p-12 relative overflow-hidden">
            <h2 className="text-3xl font-orbitron font-black uppercase mb-8">System <span className="text-industrial-cyan">Architecture</span></h2>
            <div className="space-y-6">
              {[
                { label: "Frontend Core", tech: "React 18 + Vite", val: 100 },
                { label: "Neural Engine", tech: "SVM (Scikit-Learn)", val: 95 },
                { label: "API Layer", tech: "FastAPI + Uvicorn", val: 98 },
                { label: "Styling", tech: "Tailwind CSS + Framer", val: 100 }
              ].map((t, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>{t.label}</span>
                    <span className="text-industrial-cyan">{t.tech}</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5"><div className="h-full bg-industrial-cyan" style={{ width: t.val + "%" }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-orbitron font-black uppercase">Future <span className="text-industrial-orange">Scope</span></h2>
            <div className="space-y-4">
              {[
                { icon: Rocket, title: "IoT Integration", desc: "Direct sensor feed from textile looms for autonomous inspection." },
                { icon: Box, title: "Batch Processing", desc: "Large scale analysis of entire production runs with CSV reporting." },
                { icon: Monitor, title: "Mobile Application", desc: "On-the-go quality tracking for factory floor supervisors." },
                { icon: GitPullRequest, title: "Reinforcement Learning", desc: "Continuous model improvement based on manual quality overrides." }
              ].map((s, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-industrial-orange/30 transition-all group">
                  <div className="p-3 bg-industrial-orange/10 rounded-xl text-industrial-orange group-hover:scale-110 transition-transform"><s.icon size={20} /></div>
                  <div>
                    <h3 className="font-orbitron text-sm font-bold uppercase mb-1">{s.title}</h3>
                    <p className="text-white/30 text-xs font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- INSPECTION PAGE ---
const InspectionPage = () => {
  const [formData, setFormData] = useState({
    thread_count: 213,
    gsm: 244,
    tensile_strength: 67,
    fabric_thickness: 0.8,
    defect_count: 0,
    fabric_type: 'cotton'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fabric_type' ? value : parseFloat(value) || 0
    }));
  };

  const handleInspect = async () => {
    setLoading(true);
    setIsScanning(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      const response = await axios.post(`${API_BASE}/predict`, formData);
      setResult(response.data);
    } catch (err) {
      alert("System Offline: Check Backend Status");
    } finally {
      setLoading(false);
      setIsScanning(false);
    }
  };

  const getQualityColor = (q) => {
    switch(q?.toLowerCase()) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#ef4444';
      default: return '#06b6d4';
    }
  };

  return (
    <div className="relative z-10 min-h-screen pt-32 pb-20 px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card p-8 border-l-4 border-l-industrial-orange">
            <h2 className="font-orbitron text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/20 flex items-center gap-3">
              <Settings size={14} className="text-industrial-orange" /> Machine Parameters
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-industrial-cyan">Material Feed</label>
                <div className="grid grid-cols-3 gap-2">
                  {['cotton', 'silk', 'wool', 'linen', 'nylon', 'polyester'].map(t => (
                    <button key={t} onClick={() => setFormData(p => ({...p, fabric_type: t}))} className={`py-2 text-[10px] uppercase font-bold rounded-lg border transition-all ${formData.fabric_type === t ? 'bg-industrial-orange border-industrial-orange text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}>{t}</button>
                  ))}
                </div>
              </div>
              {[
                { id: 'thread_count', label: 'Thread Density', icon: Layers, unit: 'TPI', min: 50, max: 500 },
                { id: 'gsm', label: 'Fabric Mass', icon: Zap, unit: 'GSM', min: 50, max: 500 },
                { id: 'tensile_strength', label: 'Load Limit', icon: Maximize2, unit: 'N/m', min: 10, max: 200 },
                { id: 'fabric_thickness', label: 'Gauge Profile', icon: Microscope, unit: 'mm', min: 0.1, max: 2.0, step: 0.1 },
                { id: 'defect_count', label: 'Defect Density', icon: AlertTriangle, unit: 'CNT', min: 0, max: 20 },
              ].map(f => (
                <div key={f.id} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <f.icon size={14} className="text-white/20" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
                    </div>
                    <span className="font-orbitron text-xs text-industrial-orange font-bold">{formData[f.id]}<span className="text-[8px] ml-1 text-white/20">{f.unit}</span></span>
                  </div>
                  <input type="range" name={f.id} min={f.min} max={f.max} step={f.step || 1} value={formData[f.id]} onChange={handleInputChange} className="w-full h-[2px] bg-white/10 appearance-none cursor-pointer accent-industrial-orange" />
                </div>
              ))}
              <button onClick={handleInspect} disabled={loading} className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.3em] rounded-xl hover:bg-industrial-orange hover:text-white transition-all flex items-center justify-center gap-4">
                {loading ? "Neural Core Loading..." : "Trigger Inspection"}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card h-[600px] relative overflow-hidden flex flex-col items-center justify-center">
            <LaserScanner active={isScanning} color={getQualityColor(result?.quality)} />
            {result ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                <div className="w-64 h-64 rounded-full border-[12px] flex flex-col items-center justify-center mb-8 shadow-2xl transition-all duration-1000" style={{ borderColor: `${getQualityColor(result.quality)}22`, borderTopColor: getQualityColor(result.quality) }}>
                  <Shirt size={64} style={{ color: getQualityColor(result.quality) }} className="mb-4" />
                  <h3 className="text-6xl font-orbitron font-black uppercase tracking-tighter" style={{ color: getQualityColor(result.quality) }}>{result.quality}</h3>
                </div>
                <div className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl inline-block">
                  <p className="text-xs font-black uppercase tracking-[0.3em]">Neural Confidence: <span className="text-industrial-cyan">{(result.confidence * 100).toFixed(2)}%</span></p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-10">
                <Settings size={140} className="animate-spin-slow mb-8" />
                <p className="font-orbitron uppercase tracking-[1em] text-sm">System Idle</p>
              </div>
            )}
          </div>
          <div className="glass-card h-[600px] p-8 flex flex-col">
            <h2 className="font-orbitron text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-white/20">Neural Mapping matrix</h2>
            {result ? (
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={Object.entries(result.probabilities).map(([name, value]) => ({ name, value }))} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#fff" fontSize={10} tickFormatter={v => v.toUpperCase()} width={80} />
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #333' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {Object.entries(result.probabilities).map((entry, index) => <Cell key={`cell-${index}`} fill={getQualityColor(entry[0])} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 border border-dashed border-white/5 rounded-3xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.5em] text-white/10">No Inference Data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP ---
const App = () => {
  return (
    <Router>
      <div className="min-h-screen font-rajdhani text-white selection:bg-industrial-orange selection:text-white overflow-x-hidden relative">
        <IndustrialBackground />
        
        <div className="relative z-10">
          <nav className="h-24 border-b border-white/5 bg-industrial-dark/80 backdrop-blur-2xl flex items-center justify-between px-12 fixed top-0 w-full z-50">
            <Link to="/" className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-industrial-orange rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-industrial-orange/20">
                <Factory size={28} className="text-white" />
              </div>
              <div>
                <h1 className="font-orbitron font-black text-2xl tracking-tighter uppercase">STITCH<span className="text-industrial-orange">CORE</span></h1>
                <p className="text-[9px] uppercase font-bold tracking-[0.4em] text-white/30">Autonomous Inspection Node</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.3em]">
              <Link to="/" className="hover:text-industrial-orange transition-colors">Core Surface</Link>
              <Link to="/inspect" className="px-8 py-3 bg-white text-black rounded-xl hover:bg-industrial-orange hover:text-white transition-all shadow-xl">Launch Inspection</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inspect" element={<InspectionPage />} />
          </Routes>

          <footer className="px-12 py-10 border-t border-white/5 bg-black/50 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-industrial-orange animate-pulse" />
              Core Analytics V2.5.0 Deployment Protocol
            </div>
            <div className="flex gap-12">
              <span>Accuracy: 95.42%</span>
              <span>Uptime: 99.99%</span>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
