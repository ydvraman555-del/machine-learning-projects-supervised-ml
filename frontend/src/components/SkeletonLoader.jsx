import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="glass-card p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-white/10" />
      <div className="flex-1">
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-white/10 rounded w-full mb-2" />
    <div className="h-3 bg-white/10 rounded w-5/6" />
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-2 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-white/10 rounded"
        style={{ width: `${100 - (i * 15)}%` }}
      />
    ))}
  </div>
);

export const SkeletonSelect = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
    <div className="h-12 bg-white/10 rounded-xl w-full" />
  </div>
);

export const SkeletonResult = () => (
  <div className="glass-card p-8 animate-pulse">
    {/* Header */}
    <div className="h-24 bg-white/10 rounded-xl mb-6" />
    
    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-64 bg-white/10 rounded-xl" />
      <div className="space-y-4">
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-8 bg-white/10 rounded w-full mt-4" />
        <div className="h-8 bg-white/10 rounded w-full" />
      </div>
    </div>
  </div>
);

export const SkeletonStat = () => (
  <div className="glass p-4 rounded-xl text-center animate-pulse">
    <div className="w-8 h-8 bg-white/10 rounded mx-auto mb-2" />
    <div className="h-6 bg-white/10 rounded w-16 mx-auto mb-1" />
    <div className="h-3 bg-white/10 rounded w-20 mx-auto" />
  </div>
);

export default { SkeletonCard, SkeletonText, SkeletonSelect, SkeletonResult, SkeletonStat };
