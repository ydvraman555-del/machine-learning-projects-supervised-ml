import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, ShieldCheck, TrendingUp, Database, Cpu, Activity, BarChart3, Sun, Wind, Droplets, Globe } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import EnergyCore3D from '../components/EnergyCore3D';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer */}
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20 relative z-10 py-28">
        {/* Left Side: Hero Content */}
        <motion.div
          className="text-center lg:text-left lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-white/10 text-amber-400 text-xs font-black uppercase tracking-[0.2em] mb-8 glow-amber mx-auto lg:mx-0"
          >
            <Zap size={14} fill="currentColor" />
            Neural Engine v3.0 // Active
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white flex flex-col">
            <span className="opacity-40 text-4xl lg:text-5xl mb-2 tracking-widest">THE ERA OF</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
              ENERGY <br /> DOMINANCE
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0 font-medium">
            Advanced machine learning forecasting for the global energy transition. 
            Analyze regional stability and predictive dominance coefficients.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <Link to="/predict">
              <button className="px-10 py-5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] flex items-center gap-3 border-none">
                Analyze Ecosystem <ArrowRight size={20} strokeWidth={3} />
              </button>
            </Link>
            <button className="px-10 py-5 glass text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center gap-3 backdrop-blur-xl">
              <Activity size={20} className="text-amber-400" /> Live Status
            </button>
          </div>
          <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-amber-400" />
              <span className="text-xs font-bold tracking-widest uppercase">Verified Models</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-400" />
              <span className="text-xs font-bold tracking-widest uppercase">Real-time Data</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3D Core */}
        <motion.div 
          className="relative lg:col-span-5 flex items-center justify-center p-4 lg:pr-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="w-full max-w-[450px] aspect-square relative">
            {/* Soft decorative glow behind 3D core */}
            <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            <EnergyCore3D />
          </div>
        </motion.div>
      </div>
      
      {/* Technical Architecture / ML Workflow */}
      <section className="relative z-10 py-24 w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase mb-4">Intelligence Pipeline</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Machine Learning <span className="text-amber-400">Workflow</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Database, title: "Data Collection", desc: "Aggregating global historical energy consumption metrics from 2000-2022.", color: "amber" },
            { icon: Cpu, title: "Feature Engineering", desc: "Processing time-series lags and regional indicators to detect non-linear shifts.", color: "orange" },
            { icon: Activity, title: "Logic Core (Aim)", desc: "Primary research focused on Logistic Regression for probabilistic classification.", color: "amber" },
            { icon: BarChart3, title: "Final Inference", desc: "Generating high-fidelity dominance scores using optimized LightGBM kernels.", color: "orange" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-amber-400/30 transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="text-amber-400" size={24} />
              </div>
              <h4 className="text-white font-bold mb-3">{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{item.desc}</p>
              <div className="mt-auto flex items-center gap-2 pt-6 border-t border-white/5">
                <div className="h-[2px] w-8 bg-amber-400 opacity-30" />
                <span className="text-[10px] font-black text-amber-400/30 tracking-widest uppercase">Phase 0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Philosophy & Research Foundation */}
      <section className="relative z-10 py-24 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Problem Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 border-amber-400/10 bg-amber-400/[0.02]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                <ShieldCheck className="text-amber-400" size={20} />
              </div>
              <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase">The Mission</h2>
            </div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 leading-none">The <span className="text-amber-400">Problem</span> Statement</h3>
            <div className="space-y-6">
              <p className="text-white/70 leading-relaxed">
                As the world faces an escalating climate crisis, the transition to sustainable power is no longer optional—it is a global necessity. However, **energy transition is not uniform**.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={80} className="text-amber-400" />
                </div>
                <div className="text-amber-400 font-black text-xs uppercase tracking-widest mb-3 italic">Threshold Crisis</div>
                <h4 className="text-white font-bold text-lg mb-2 capitalize">The Invisibility of the Transition Curve</h4>
                <p className="text-white/40 text-sm leading-relaxed relative z-10">
                  Decision makers lack data-driven tools to predict **when** a nation will reach the "Clean Energy Threshold"—the point where renewables finally surpass fossil fuel production.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Dataset Rationale */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center">
                <Database className="text-orange-400" size={20} />
              </div>
              <h2 className="text-sm font-bold text-orange-400 tracking-[0.3em] uppercase">Core Engine</h2>
            </div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 leading-none">Dataset <span className="text-orange-400">Rationale</span></h3>
            <p className="text-white/60 mb-10 leading-relaxed">
              To build a robust predictive model, we utilized the **Global Renewable & Fossil Fuel Energy (1990–2021)** dataset—a high-fidelity record covering over 5,000 observations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Temporal Depth", val: "30+ Years", desc: "Capturing the entire evolutionary arc of the Green Revolution.", icon: TrendingUp },
                { title: "Global Scope", val: "200+ Nations", desc: "Cross-sectional diversity from Azerbaijan to emerging markets.", icon: Globe },
                { title: "Standardized %", val: "Dominance Scale", desc: "Normalized metrics allow fair comparison between global powers.", icon: ShieldCheck },
                { title: "High-Fidelity", val: "5,451 Records", desc: "Large-scale data ensures model resilience against outliers.", icon: Activity }
              ].map((item, i) => (
                <div key={i} className="p-6 glass rounded-2xl border-white/5 hover:border-orange-400/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] font-black text-orange-400/50 uppercase tracking-widest">{item.title}</div>
                    <item.icon className="text-orange-400/40 group-hover:text-orange-400 transition-colors" size={16} />
                  </div>
                  <div className="text-xl font-black text-white mb-2">{item.val}</div>
                  <p className="text-[10px] text-white/30 leading-relaxed font-medium uppercase">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Foundation Section */}
      <section className="relative z-10 py-24 w-full max-w-7xl mx-auto px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase mb-4">The Research Nexus</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">Primary Aim: <br /><span className="text-amber-400">Logistic Regression</span></h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              This project was conceived to explore the mathematical limits of linear models in predicting complex energy transitions. While the final deployment utilizes LightGBM for production accuracy, <strong>Logistic Regression</strong> remains the theoretical core and primary research objective of this study.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 glass rounded-xl border-white/10">
                <div className="text-2xl font-black text-white mb-1">Baseline</div>
                <div className="text-xs text-amber-400/60 uppercase font-black tracking-widest">LR Accuracy: 70.4%</div>
              </div>
              <div className="p-4 glass rounded-xl border-amber-400/20 bg-amber-400/5">
                <div className="text-2xl font-black text-amber-400 mb-1">Target</div>
                <div className="text-xs text-white/40 uppercase font-black tracking-widest">Classification Clarity</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass rounded-3xl p-8 border-white/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Activity size={120} className="text-amber-400" />
            </div>
            <h4 className="text-white font-bold text-xl mb-6">Scientific Methodology</h4>
            <ul className="space-y-4">
              {[
                { label: "Predictive Probability", desc: "Utilizing sigmoid functions to determine the likelihood of renewable dominance." },
                { label: "Linear Decision Boundaries", desc: "Mapping the clear separation between fossil fuel reliance and clean energy shifts." },
                { label: "Gradient Descent Optimization", desc: "Fine-tuning the cost function to minimize classification error across 20+ regions." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div>
                    <div className="text-amber-400 font-bold text-sm uppercase tracking-tighter">{item.label}</div>
                    <div className="text-white/50 text-xs">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Model Benchmarking Section */}
      <section className="relative z-10 py-24 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase mb-4">Algorithm Performance</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Model <span className="text-amber-400">Benchmarks</span></h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white/40 text-sm max-w-md text-right hidden md:block"
          >
            Comparative analysis of global energy trend classification across multiple gradient boosting and ensemble architectures.
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "LightGBM", score: "96.9%", status: "DEPLOYED", color: "from-amber-400/20 to-transparent", highlight: true },
            { name: "Ensemble", score: "94.1%", status: "OPTIMIZED", color: "from-white/5 to-transparent" },
            { name: "CatBoost", score: "93.0%", status: "VERIFIED", color: "from-white/5 to-transparent" },
            { name: "XGBoost", score: "92.8%", status: "VERIFIED", color: "from-white/5 to-transparent" },
            { name: "Random Forest", score: "85.1%", status: "BASELINE", color: "from-white/5 to-transparent" },
            { name: "Logistic Reg.", score: "70.4%", status: "PRIMARY AIM", color: "from-amber-400/10 to-transparent", aim: true }
          ].map((algo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glass p-5 rounded-2xl border ${algo.highlight ? 'border-amber-400/40 bg-amber-400/5 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : algo.aim ? 'border-amber-400/20' : 'border-white/5'} flex flex-col justify-between group transition-all h-full`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`text-[7px] font-black px-2 py-0.5 rounded uppercase tracking-[0.2em] ${algo.highlight ? 'bg-amber-400 text-black' : algo.aim ? 'bg-amber-400/20 text-amber-400' : 'bg-white/5 text-white/40'}`}>
                    {algo.status}
                  </div>
                  {algo.highlight && <Zap size={12} className="text-amber-400 fill-amber-400 animate-pulse" />}
                  {algo.aim && <Activity size={12} className="text-amber-400" />}
                </div>
                <h4 className={`font-black uppercase tracking-tight text-xs lg:text-sm ${algo.highlight || algo.aim ? 'text-white' : 'text-white/60'}`}>{algo.name}</h4>
              </div>
              <div className="mt-6">
                <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1">Accuracy</div>
                <div className={`text-2xl font-black tracking-tighter ${algo.highlight ? 'text-amber-400' : algo.aim ? 'text-amber-400/80' : 'text-white/30'}`}>
                  {algo.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clean Energy Insights Section */}
      <section className="relative z-10 py-24 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-amber-400 tracking-[0.3em] uppercase mb-4">Environmental Impact</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">The Future is <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 underline decoration-amber-400/30">Sustainable Power</span></h3>
            <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
              Clean energy dominance isn't just a prediction—it's a global necessity. Our AI models track the irreversible shift from carbon-intensive fossil fuels to high-efficiency renewable matrices.
            </p>
            <div className="space-y-6">
              {[
                { icon: Sun, label: "Solar Resilience", value: "+24% YoY Growth" },
                { icon: Wind, label: "Wind Kinetic Capture", value: "Global Scalability" },
                { icon: Droplets, label: "Hydropower Stability", value: "Base-Load Foundation" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                    <stat.icon className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm tracking-tight">{stat.label}</div>
                    <div className="text-amber-400/50 text-[10px] font-black uppercase tracking-widest">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-0 bg-amber-400/10 blur-[100px] rounded-full" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="glass p-1 rounded-2xl overflow-hidden aspect-[4/5] object-cover"
            >
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" alt="Clean Energy" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            </motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="glass p-1 rounded-2xl overflow-hidden aspect-[4/5] object-cover mt-12"
            >
              <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800" alt="Sustainable" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default LandingPage;
