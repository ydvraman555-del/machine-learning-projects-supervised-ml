import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import ParticleBackground from '../components/ParticleBackground';
import { Leaf, Flame, History, Trash2, Download, AlertCircle, TrendingUp, Loader2, Search, Activity, ShieldCheck, Globe } from 'lucide-react';
import jsPDF from 'jspdf';

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('prediction_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handlePredictionResult = (result) => {
    if (result) {
      setPrediction(result.prediction);
      setForecast(result.forecast);
      
      const newEntry = {
        id: Date.now(),
        country: result.prediction.country,
        year: result.prediction.year,
        prediction: result.prediction.is_clean_dominant ? 'Clean' : 'Fossil',
        confidence: result.prediction.confidence,
        timestamp: new Date().toLocaleString()
      };
      
      const newHistory = [newEntry, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('prediction_history', JSON.stringify(newHistory));
    } else {
      setPrediction(null);
      setForecast([]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('prediction_history');
  };

  const generatePDF = async () => {
    if (!prediction || isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // 1. Background - Dark Theme Consistent
      doc.setFillColor(13, 13, 18); // #0d0d12
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // 2. Decorative Border
      doc.setDrawColor(245, 158, 11, 40); // Amber with low opacity
      doc.setLineWidth(0.5);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      // 3. Header Styling
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(245, 158, 11); // Amber
      doc.text('ECOPREDICT // INTELLIGENCE', 20, 30);
      
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('OFFICIAL NEURAL ANALYTICAL DOSSIER', 20, 36);
      
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      doc.text(`REPORT ID: #${Date.now().toString().slice(-8)}`, pageWidth - 60, 30);
      doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - 60, 36);

      // 4. Analysis Context Section
      doc.setDrawColor(40, 40, 50);
      doc.setFillColor(20, 20, 25);
      doc.roundedRect(20, 50, pageWidth - 40, 35, 3, 3, 'FD');
      
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('INPUT COUNTRY', 30, 60);
      doc.text('TARGET YEAR', 85, 60);
      doc.text('REGION NODE', 140, 60);
      
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text(prediction.country.toUpperCase(), 30, 70);
      doc.text(prediction.year.toString(), 85, 70);
      doc.text(prediction.region.toUpperCase(), 140, 70);

      // 5. Main Prediction Result
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text('PROJECTED DOMINANCE COEFFICIENT', 20, 105);
      
      doc.setFontSize(38);
      if (prediction.is_clean_dominant) {
        doc.setTextColor(16, 185, 129); // Emerald
        doc.text('CLEAN ENERGY DOMINANCE', 20, 125);
      } else {
        doc.setTextColor(239, 68, 68); // Red
        doc.text('FOSSIL FUEL DOMINANCE', 20, 125);
      }
      
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text(`Confidence Level: `, 20, 140);
      doc.setTextColor(245, 158, 11);
      doc.text(`${(prediction.confidence * 100).toFixed(1)}%`, 68, 140);

      // 6. Metrics Visualization (Simple Rectangles)
      // Clean Box
      doc.setFillColor(16, 185, 129, 0.1);
      doc.setDrawColor(16, 185, 129, 0.3);
      doc.roundedRect(20, 155, (pageWidth / 2) - 25, 30, 3, 3, 'FD');
      doc.setFontSize(10);
      doc.setTextColor(16, 185, 129);
      doc.text('CLEAN PROBABILITY', 30, 165);
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(`${(prediction.probabilities[1] * 100).toFixed(1)}%`, 30, 178);

      // Fossil Box
      doc.setFillColor(239, 68, 68, 0.1);
      doc.setDrawColor(239, 68, 68, 0.3);
      doc.roundedRect((pageWidth / 2) + 5, 155, (pageWidth / 2) - 25, 30, 3, 3, 'FD');
      doc.setFontSize(10);
      doc.setTextColor(239, 68, 68);
      doc.text('FOSSIL FUEL INDEX', (pageWidth / 2) + 15, 165);
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(`${(prediction.probabilities[0] * 100).toFixed(1)}%`, (pageWidth / 2) + 15, 178);

      // 7. Research Narrative
      doc.setFillColor(245, 158, 11, 0.05);
      doc.setDrawColor(245, 158, 11, 0.2);
      doc.roundedRect(20, 200, pageWidth - 40, 50, 4, 4, 'FD');
      
      doc.setFontSize(10);
      doc.setTextColor(245, 158, 11);
      doc.text('NEURAL INFERENCE REPORT', 30, 210);
      
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(12);
      doc.setTextColor(200, 200, 200);
      
      const narrativeText = prediction.is_clean_dominant 
        ? `The neural engine predicts a definitive transition to renewable dominance in ${prediction.country} by ${prediction.year}. High-probability infrastructure conversion to sustainable matrices.`
        : `Fossil fuel-based energy matrices are projected to maintain dominance in ${prediction.country} through ${prediction.year}. Hydrocarbon dependency remains the primary equilibrium.`;
      
      const splitText = doc.splitTextToSize(narrativeText, pageWidth - 60);
      doc.text(splitText, 30, 222);

      // 8. Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('VALIDATED BY ECOPREDICT NEURAL CORE V3.0 // ANALYTICS DIVISION', 20, 280);
      doc.text('PAGE 01 / 01', pageWidth - 40, 280);

      doc.save(`Energy_Analysis_${prediction.country}_${prediction.year}.pdf`);
    } catch (err) {
      console.error('PDF Error:', err);
      alert(`PDF generation failed: ${err.message || 'Unknown Native Error'}. Please try again.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 relative overflow-hidden">
      <ParticleBackground />
      
      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md glass-strong border-l border-white/10 z-[70] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                  <History size={20} className="text-amber-400" /> Prediction <span className="text-amber-400">History</span>
                </h3>
                <button 
                  onClick={clearHistory}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors group"
                  title="Clear All"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="glass p-4 rounded-xl border-white/5 hover:border-amber-400/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-bold">{item.country}</span>
                        <span className="text-[10px] text-white/30">{item.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/50">{item.year}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                          item.prediction === 'Clean' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.prediction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-white/30 uppercase text-xs font-black tracking-widest">
                  No records yet
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative mb-20">
          {/* Decorative radial glow behind heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border-white/5 text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-8 shadow-2xl"
            >
              <Activity size={12} className="animate-pulse" /> Global Inference Node 01
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
              Energy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600">Forecasting</span>
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8 opacity-30" />
            
            <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-2xl px-4">
              Advanced predictive modeling for the global clean energy transition. 
              Our neural engine analyzes regional shifts to forecast dominance coefficients until <span className="text-white">2042</span>.
            </p>

            <div className="flex items-center gap-6 mt-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(true)}
                className="px-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all border border-white/10 group backdrop-blur-xl"
              >
                <History size={16} className="text-amber-400 group-hover:rotate-[-45deg] transition-transform" />
                History Archive
              </motion.button>
            </div>
          </div>
        </div>

        {/* Prediction Form */}
        <PredictionForm onPredictionResult={handlePredictionResult} />

        {/* Results */}
        {prediction && (
          <div className="mt-12" id="prediction-report">
            {/* Prediction Result Card */}
            <PredictionResult 
              prediction={prediction} 
              onDownload={generatePDF}
              isDownloading={isGeneratingPDF}
            />

            {/* Forecast Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-10 mt-8 border-amber-400/20"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                    <TrendingUp size={24} className="text-amber-400" /> Forecast <span className="text-amber-400">Resonance</span>
                  </h3>
                  <p className="text-xs text-white/30 uppercase tracking-[0.2em] mt-1 italic">
                    Historical divergence vs. predictive modeling for {prediction.country}
                  </p>
                </div>
                <button 
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="p-4 glass rounded-2xl text-amber-400 hover:bg-amber-400/10 transition-all disabled:opacity-50 border border-white/5"
                >
                  {isGeneratingPDF ? <Loader2 className="animate-spin" size={24} /> : <Download size={24} />}
                </button>
              </div>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecast} margin={{ top: 40, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="rgba(255,255,255,0.2)" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.2)" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    />
                    <Tooltip 
                      cursor={{ stroke: 'rgba(245,158,11,0.2)', strokeWidth: 2 }}
                      contentStyle={{ 
                        backgroundColor: '#0a0a0f', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ color: '#f59e0b', fontWeight: '900', fontSize: '14px' }}
                      formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Probability']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="probability" 
                      stroke="#f59e0b" 
                      strokeWidth={5}
                      fillOpacity={1} 
                      fill="url(#colorProb)" 
                      animationDuration={2500}
                    />
                    <ReferenceLine x={2021} stroke="rgba(255,255,255,0.4)" strokeDasharray="5 5">
                      <Label 
                        value="FORECAST ZONE" 
                        position="top" 
                        fill="rgba(255,158,11,1)" 
                        fontSize={10} 
                        fontWeight="900"
                        dy={-20}
                      />
                    </ReferenceLine>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}

        {/* Energy Knowledge Repository */}
        <div className="mt-32 pt-24 border-t border-white/5 pb-12">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-1 bg-amber-400 rounded-full mb-6" />
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Energy <span className="text-amber-400">Knowledge Hub</span></h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl">Deep dive into the underlying matrices of global power infrastructure and sustainable transition targets.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-12 relative overflow-hidden group border-emerald-500/10"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Leaf size={160} className="text-emerald-400" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/20">
                  <Leaf className="text-emerald-400" size={32} />
                </div>
                <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Renewable <span className="text-emerald-400">Matrices</span></h4>
                <p className="text-white/50 leading-relaxed text-lg italic">
                  "Sustainable energy systems represent the final evolutionary stage of global power infrastructure."
                </p>
                <div className="mt-8 space-y-4">
                  <p className="text-white/40 text-sm">Including Solar, Wind, and Hydro, these matrices target zero-emission coefficients while maximizing energy return on investment (EROI).</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-12 relative overflow-hidden group border-red-500/10"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flame size={160} className="text-red-400" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-red-500/20 flex items-center justify-center mb-8 border border-red-500/20">
                  <Flame className="text-red-400" size={32} />
                </div>
                <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Fossil <span className="text-red-400">Dependency</span></h4>
                <p className="text-white/50 leading-relaxed text-lg italic">
                  "Hydrocarbon reliance introduces systemic ESG risks and accelerates atmospheric degradation."
                </p>
                <div className="mt-8 space-y-4">
                  <p className="text-white/40 text-sm">Carbon-intensive sources like Coal and Oil are being phased out as regulatory carbon tax frameworks become globally prevalent.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Future Scope Expansion */}
        <div className="mt-20 pt-20 border-t border-white/5 pb-20">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-1 bg-purple-500 rounded-full mb-6" />
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Strategic <span className="text-purple-400">Future Scope</span></h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl">Our analytical Roadmap for the next phase of global energy distribution and policy modeling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "IoT Grid Sync",
                desc: "Integration of real-time smart grid sensors for millisecond-latency inference across urban regions.",
                icon: Activity,
                color: "text-cyan-400",
                bg: "bg-cyan-400/10"
              },
              {
                title: "Carbon Ledger",
                desc: "Blockchain-based verification for clean energy credits, ensuring 100% transparency in offsets.",
                icon: ShieldCheck,
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                title: "Policy Lab",
                desc: "Interactive simulation of global carbon tax implications on energy transition coefficients.",
                icon: Globe,
                color: "text-amber-400",
                bg: "bg-amber-400/10"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8 border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                  <item.icon className={item.color} size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
