import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as WAVES_LIB from 'vanta/src/vanta.waves';

const WAVES = WAVES_LIB.default || WAVES_LIB;

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.THREE) {
      try {
        const wavesFunc = WAVES.default || WAVES;
        setVantaEffect(
          wavesFunc({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 0.50,
            zoom: 0.85
          })
        );
      } catch (err) {
        console.error("Vanta initialization failed:", err);
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={vantaRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }} 
    />
  );
};

export default VantaBackground;
