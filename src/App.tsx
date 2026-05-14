import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Flame, Thermometer, Wind, AlertCircle } from 'lucide-react';

// Color Palette
const COLORS = {
  bg: '#0a0a0a',
  pyrite: '#FFD700', // Gold
  oxygen: '#87CEEB', // Sky Blue
  so2: '#FF8C00',    // Dark Orange
  ironOxide: '#5C4033', // Dark Brown/Gray
  accent: '#FF4500', // Orange Red (Heat)
  line: '#333333',
};

const PyriteCrystal = () => (
  <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl">
    <motion.path
      d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
      fill={COLORS.pyrite}
      animate={{
        rotateY: [0, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    />
    <motion.path
      d="M50 5 L50 95 M5 25 L95 25 M5 75 L95 75"
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="1"
    />
  </svg>
);

const OxygenParticle = ({ delay = 0, xStart = -100, yPos = 50 }) => (
  <motion.div
    initial={{ x: xStart, y: yPos, opacity: 0 }}
    animate={{ 
      x: [xStart, 300, 450], 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 0.8]
    }}
    transition={{ 
      duration: 3, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className="absolute w-2 h-2 rounded-full border border-sky-400 bg-sky-200 shadow-[0_0_8px_rgba(135,206,235,0.8)]"
  />
);

const GasParticle = ({ delay = 0, startPos = { x: 50, y: 50 } }) => (
  <motion.div
    initial={{ x: startPos.x, y: startPos.y, opacity: 0, scale: 0 }}
    animate={{ 
      y: [startPos.y, startPos.y - 150, startPos.y - 300],
      x: [startPos.x, startPos.x + (Math.random() * 40 - 20), startPos.x + (Math.random() * 80 - 40)],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.5, 2]
    }}
    transition={{ 
      duration: 4, 
      delay, 
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute w-3 h-3 rounded-full blur-[2px]"
    style={{ backgroundColor: COLORS.so2 }}
  />
);

export default function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { step: 0, duration: 3000 },  // Intro
      { step: 1, duration: 4000 },  // Pyrite Intro
      { step: 2, duration: 4000 },  // Oxygen entry
      { step: 3, duration: 5000 },  // Reaction (Heat)
      { step: 4, duration: 4000 },  // Outcome
    ];

    let current = 0;
    const runSequence = () => {
      setStep(sequence[current].step);
      setTimeout(() => {
        current = (current + 1) % sequence.length;
        runSequence();
      }, sequence[current].duration);
    };

    runSequence();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono overflow-hidden flex flex-col items-center justify-center relative select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main viewport Container (16:9 Aspect Ratio) */}
      <div className="relative w-full max-w-5xl aspect-video border border-[#1a1a1a] bg-[#0c0c0c] overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Step 0: Intro Title */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center z-10"
            >
              <h1 className="text-5xl font-extrabold tracking-tighter text-[#FFD700] mb-2 uppercase">
                Tostación Metalúrgica
              </h1>
              <p className="text-[#888] text-sm tracking-[0.3em] uppercase">Visualización del Proceso de la Pirita</p>
              <motion.div 
                animate={{ width: [0, 200] }}
                className="h-px bg-[#FFD700] mx-auto mt-6"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1 & 2: Pyrite Mineral */}
        <AnimatePresence>
          {(step === 1 || step === 2) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <PyriteCrystal />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <h2 className="text-3xl font-bold text-[#FFD700]">Pirita</h2>
                <p className="text-[#666] text-xl">FeS₂</p>
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mt-4 text-sky-400"
                  >
                    <Wind size={20} />
                    <span className="text-xs uppercase tracking-widest font-bold">Flujo de Oxígeno (O₂)</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Oxygen Particles (Step 2) */}
        {step === 2 && (
          <>
            <OxygenParticle delay={0} yPos={100} />
            <OxygenParticle delay={0.5} yPos={200} />
            <OxygenParticle delay={1} yPos={300} />
            <OxygenParticle delay={1.5} yPos={400} />
            <OxygenParticle delay={2} yPos={150} />
          </>
        )}

        {/* Step 3: Chemical Reaction */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <motion.div 
                animate={{ 
                  backgroundColor: ["transparent", "rgba(255,69,0,0.1)", "transparent"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              />
              
              <div className="z-10 text-center space-y-8">
                <motion.div 
                  className="flex items-center justify-center gap-12"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-600/40 rounded-full flex items-center justify-center border border-yellow-500 blur-[2px] absolute" />
                    <div className="relative font-bold text-2xl text-yellow-100">4FeS₂</div>
                  </div>
                  <div className="text-4xl font-bold text-white">+</div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-sky-600/40 rounded-full flex items-center justify-center border border-sky-500 blur-[2px] absolute" />
                    <div className="relative font-bold text-2xl text-sky-100">11O₂</div>
                  </div>
                </motion.div>

                <div className="flex flex-col items-center gap-2">
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity }}
                  >
                    <Flame className="text-orange-500" size={48} />
                  </motion.div>
                  <p className="text-orange-500 font-bold tracking-[0.5em] text-xs uppercase underline underline-offset-8">Reacción Exotérmica</p>
                </div>
              </div>

              {/* Heat waves */}
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-orange-950/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Outcome */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center z-10"
            >
              <div className="flex gap-20 items-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32 bg-[#4A4A4A] rounded-lg shadow-inner border-2 border-[#333] rotate-45 mb-10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#3a3a3a] opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                       <span className="font-bold text-xs">RESIDUO</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-gray-400">Óxido de Hierro (III)</h3>
                    <p className="text-gray-500">2Fe₂O₃</p>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="h-32 w-px bg-white/10"
                />

                <div className="flex flex-col items-center relative">
                  <div className="mb-4">
                    <GasParticle delay={0} startPos={{x: 0, y: 0}} />
                    <GasParticle delay={0.5} startPos={{x: 10, y: -20}} />
                    <GasParticle delay={1} startPos={{x: -10, y: -40}} />
                    <GasParticle delay={1.5} startPos={{x: 5, y: -60}} />
                  </div>
                  <div className="text-center mt-32">
                    <h3 className="text-xl font-bold text-orange-400">Dióxido de Azufre</h3>
                    <p className="text-orange-600 font-bold">8SO₂ (g)</p>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-16 p-4 border border-white/5 bg-white/5 backdrop-blur-sm"
              >
                <p className="text-xs font-mono tracking-widest text-[#FFD700]">ECUACIÓN COMPLETA DE TOSTACIÓN</p>
                <p className="text-xl font-bold mt-2">4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Furnace Overlay HUD */}
        <div className="absolute top-4 left-4 flex items-center gap-4 text-[10px] text-white/30 tracking-widest uppercase">
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
             SIMULACIÓN_ACTIVA
          </div>
          <div>TEMP_EST: 650°C-800°C</div>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
           <AlertCircle size={14} className="text-white/20" />
           <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${(step + 1) * 20}%` }}
                className="h-full bg-[#FFD700]/50" 
              />
           </div>
        </div>

        {/* Bottom Labels */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-40">
           <div className="space-y-1">
              <p className="text-[9px]">DEPTO: ING_METALÚRGICA</p>
              <p className="text-[9px]">PROYECTO: OXIDACIÓN_SULFUROS_01</p>
           </div>
           <div className="text-right">
              <p className="text-[12px] font-bold">0{step + 1} / 05</p>
              <p className="text-[9px]">BLOQUE_SECUENCIA</p>
           </div>
        </div>
      </div>

      {/* Narrative Legend (Optional Footer) */}
      <div className="mt-8 grid grid-cols-5 gap-8 w-full max-w-5xl px-4">
        {[
          { icon: Beaker, label: "Entrada" },
          { icon: Wind, label: "Oxidación" },
          { icon: Flame, label: "Calor" },
          { icon: AlertCircle, label: "Reacción" },
          { icon: Thermometer, label: "Resultado" }
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col items-center transition-opacity duration-500 ${step === idx ? 'opacity-100' : 'opacity-20'}`}>
            <item.icon size={20} className="mb-2" />
            <span className="text-[10px] uppercase font-bold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Playback Progress */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
           animate={{ width: '100%' }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="h-full bg-[#FFD700]/30"
        />
      </div>
    </div>
  );
}
