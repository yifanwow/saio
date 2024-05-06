// ProfileBackground.js
import React, { useEffect, useRef } from 'react';
import BIRDS from 'vanta/dist/vanta.halo.min';

const ProfileBackground_big = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        // Initialize Vanta.js effect
        const vantaEffect = BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            xOffset: -.57,
            yOffset: 0.13,
            size: 7,
            amplitudeFactor:3,
            baseColor: 0x50f31,
            backgroundColor: 0x60318,
        });

        return () => {
            // Cleanup function to destroy Vanta.js effect
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div ref={vantaRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -7 }}></div>;
};

export default React.memo(ProfileBackground_big);
