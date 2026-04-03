import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Globe, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Loader2,
  ChevronDown
} from 'lucide-react';
import { SkeletonSelect } from './SkeletonLoader';

const API_BASE = 'http://localhost:8000';

const PredictionForm = ({ onPredictionResult }) => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState(2030);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries and regions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, regionsRes] = await Promise.all([
          axios.get(`${API_BASE}/countries`),
          axios.get(`${API_BASE}/regions`)
        ]);
        setCountries(countriesRes.data.countries);
        setRegions(regionsRes.data.regions);
      } catch (err) {
        setError('Failed to load data. Please refresh the page.');
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  // Auto-select region when country changes
  useEffect(() => {
    const fetchRegionForCountry = async () => {
      if (!selectedCountry) {
        setSelectedRegion('');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE}/metadata`);
        const region = response.data.mapping[selectedCountry];
        if (region) {
          setSelectedRegion(region);
        }
      } catch (err) {
        console.error('Failed to fetch region:', err);
      }
    };

    fetchRegionForCountry();
  }, [selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) return;

    setLoading(true);
    setError(null);

    try {
      const [predictionRes, forecastRes] = await Promise.all([
        axios.post(`${API_BASE}/predict`, {
          country: selectedCountry,
          year: selectedYear
        }),
        axios.get(`${API_BASE}/forecast/${selectedCountry}`)
      ]);

      onPredictionResult({
        prediction: predictionRes.data,
        forecast: forecastRes.data.forecast
      });
    } catch (err) {
      setError('Prediction failed. Please try again.');
      onPredictionResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Calculate year progress for visual indicator
  const yearProgress = ((selectedYear - 2000) / (2042 - 2000)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="glass-card p-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px]" />

        {/* Header */}
        <div className="relative text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 glow-amber"
          >
            <Sparkles className="w-8 h-8 text-black" fill="currentColor" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Make a Prediction
          </h2>
          <p className="text-white/50 text-sm">
            Select parameters to analyze energy trends
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* Country Dropdown */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Globe size={16} className="text-amber-400" />
              </motion.div>
              Select Country
            </label>
            {fetchingData ? (
              <SkeletonSelect />
            ) : (
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-amber-400 hover:border-white/20 transition-all cursor-pointer"
                >
                  <option value="">Choose a country...</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
              </motion.div>
            )}
          </div>

          {/* Region Dropdown (Auto-populated) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MapPin size={16} className="text-orange-400" />
              </motion.div>
              Region
            </label>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                disabled={!selectedCountry}
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-orange-400 hover:border-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedCountry ? 'Auto-detected region...' : 'Select a country first'}
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
            </motion.div>
            <AnimatePresence>
              {selectedRegion && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-xs text-orange-400 mt-2 overflow-hidden"
                >
                  Detected: {selectedRegion}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Year Slider */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
              <Calendar size={16} className="text-amber-400" />
              Target Year
            </label>
            
            {/* Animated Year Display */}
            <div className="flex justify-center mb-4">
              <motion.div
                key={selectedYear}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass px-8 py-3 rounded-2xl"
              >
                <span className="text-4xl font-bold text-gradient">{selectedYear}</span>
              </motion.div>
            </div>

            {/* Custom Range Slider */}
            <div className="relative px-2">
              <input
                type="range"
                min="2000"
                max="2042"
                step="1"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer focus:outline-none slider-thumb"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #ea580c ${yearProgress}%, rgba(255,255,255,0.1) ${yearProgress}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>2000</span>
                <span>2021</span>
                <span>2042</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!selectedCountry || loading}
            whileHover={!loading && selectedCountry ? { 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
            } : {}}
            whileTap={!loading && selectedCountry ? { scale: 0.98 } : {}}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group uppercase tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#000'
            }}
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <span className="relative flex items-center justify-center gap-2 text-white">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Predict Energy Future
                </>
              )}
            </span>
          </motion.button>
        </form>

        {/* Info Text */}
        <p className="relative text-center text-white/40 text-xs mt-6">
          Powered by LightGBM Machine Learning Model
        </p>
      </div>

      {/* Custom CSS for Range Slider */}
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
          border: 2px solid white;
          transition: transform 0.2s;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
          border: 2px solid white;
        }
      `}</style>
    </motion.div>
  );
};

export default PredictionForm;
