import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Brain, 
  Globe2, 
  LineChart, 
  Shield, 
  Zap, 
  Clock 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced ML Models',
    description: 'Powered by LightGBM, XGBoost, and ensemble methods for highly accurate predictions.',
    gradient: 'from-cyan to-blue-500',
    glowColor: 'cyan',
  },
  {
    icon: Globe2,
    title: 'Global Coverage',
    description: 'Analyze energy trends across 190+ countries with region-specific modeling.',
    gradient: 'from-purple to-pink-500',
    glowColor: 'purple',
  },
  {
    icon: LineChart,
    title: 'Trend Forecasting',
    description: 'Predict clean energy dominance from 2000 to 2042 with confidence intervals.',
    gradient: 'from-emerald to-teal-500',
    glowColor: 'emerald',
  },
  {
    icon: Shield,
    title: 'Reliable Accuracy',
    description: 'Achieve 96.7% model accuracy through rigorous training and validation.',
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'orange',
  },
  {
    icon: Zap,
    title: 'Real-time Analysis',
    description: 'Get instant predictions with our optimized FastAPI backend infrastructure.',
    gradient: 'from-yellow-400 to-orange-500',
    glowColor: 'yellow',
  },
  {
    icon: Clock,
    title: 'Historical Data',
    description: 'Access 22+ years of energy data to understand long-term transformation patterns.',
    gradient: 'from-indigo-500 to-purple',
    glowColor: 'indigo',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for{' '}
            <span className="text-gradient">Energy Intelligence</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Our platform combines cutting-edge machine learning with comprehensive 
            energy data to deliver actionable insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative cursor-pointer"
            >
              <div className="glass-card p-6 md:p-8 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:border-white/20 group-hover:shadow-cyan/10">
                {/* Glow effect on hover */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}
                  style={{
                    background: feature.glowColor === 'cyan' 
                      ? 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)'
                      : feature.glowColor === 'purple'
                      ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)'
                      : feature.glowColor === 'emerald'
                      ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)'
                      : feature.glowColor === 'orange'
                      ? 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)'
                      : feature.glowColor === 'yellow'
                      ? 'radial-gradient(circle, rgba(250,204,21,0.3) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
                  }}
                />

                {/* Icon Container */}
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 mb-4">
            Ready to explore the future of clean energy?
          </p>
          <motion.div
            className="inline-flex items-center gap-2 text-cyan font-medium cursor-pointer group"
            whileHover={{ x: 5 }}
          >
            <span>Start analyzing now</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
