import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Globe, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const DemoPreview = () => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
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
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-cyan text-sm font-medium mb-4">
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See It In{' '}
              <span className="text-gradient">Action</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Experience our intuitive prediction interface. Select any country, 
              choose your target year, and get instant AI-powered insights into 
              clean energy dominance with confidence scores and trend forecasts.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Real-time predictions with 96.7% accuracy',
                'Interactive charts and visualizations',
                'Historical and forecast data analysis',
                'Export results for further analysis',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="/predict"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Try It Now
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Right - 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000"
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan/20 to-purple/20 rounded-3xl blur-2xl opacity-50" />
              
              {/* Mockup Card */}
              <div className="relative glass-card p-6 border border-white/10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Energy Prediction</h3>
                      <p className="text-white/50 text-sm">AI-Powered Analysis</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald/50" />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  <div className="glass p-4 rounded-xl">
                    <label className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Globe size={14} className="text-cyan" />
                      Select Country
                    </label>
                    <div className="flex items-center justify-between bg-surface/50 px-4 py-3 rounded-lg">
                      <span className="text-white">Germany</span>
                      <ArrowRight size={16} className="text-white/30 rotate-90" />
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl">
                    <label className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Calendar size={14} className="text-cyan" />
                      Target Year
                    </label>
                    <div className="bg-surface/50 px-4 py-3 rounded-lg text-white">
                      2030
                    </div>
                  </div>
                </div>

                {/* Result Preview */}
                <div className="glass p-4 rounded-xl border border-emerald/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Clean Energy Dominant</p>
                      <p className="text-emerald text-sm">87.3% Confidence</p>
                    </div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="mt-4 flex items-end gap-1 h-16">
                    {[40, 55, 45, 70, 65, 80, 75, 87].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-emerald/50 to-emerald rounded-t"
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3 py-2 rounded-lg border border-cyan/30"
                >
                  <span className="text-xs text-cyan font-medium">Live Prediction</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 w-24 h-24 border border-dashed border-cyan/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-16 h-16 border border-dashed border-purple/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;
