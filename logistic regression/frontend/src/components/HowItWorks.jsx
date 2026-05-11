import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Calendar, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'Select Country',
    description: 'Choose from 190+ countries in our database. Our model automatically identifies the region for accurate predictions.',
    color: 'cyan',
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Choose Year',
    description: 'Pick any year from 2000 to 2042. Forecast future energy dominance or analyze historical trends.',
    color: 'purple',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Get Prediction',
    description: 'Receive instant AI-powered predictions with confidence scores and detailed probability breakdowns.',
    color: 'emerald',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
      },
    },
  };

  const getColorClasses = (color) => {
    const colors = {
      cyan: 'bg-cyan text-cyan border-cyan',
      purple: 'bg-purple text-purple border-purple',
      emerald: 'bg-emerald text-emerald border-emerald',
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Get accurate energy predictions in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 mx-32">
            <motion.div
              variants={lineVariants}
              className="h-full bg-gradient-to-r from-cyan via-purple to-emerald origin-left"
              style={{ 
                background: 'linear-gradient(90deg, #00d4ff 0%, #8b5cf6 50%, #10b981 100%)' 
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                className="relative"
              >
                <div className="glass-card p-8 h-full text-center group hover:border-white/20 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={`text-5xl font-bold opacity-20 ${step.color === 'cyan' ? 'text-cyan' : step.color === 'purple' ? 'text-purple' : 'text-emerald'}`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center mt-4 ${
                      step.color === 'cyan' 
                        ? 'bg-cyan/20 border border-cyan/30' 
                        : step.color === 'purple'
                        ? 'bg-purple/20 border border-purple/30'
                        : 'bg-emerald/20 border border-emerald/30'
                    }`}
                  >
                    <step.icon className={`w-8 h-8 ${
                      step.color === 'cyan' 
                        ? 'text-cyan' 
                        : step.color === 'purple'
                        ? 'text-purple'
                        : 'text-emerald'
                    }`} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-6 z-10">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 text-white/30" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
