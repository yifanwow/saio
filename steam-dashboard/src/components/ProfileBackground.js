// ProfileBackground.js
import React, { useEffect, useRef } from 'react';
import BIRDS from 'vanta/dist/vanta.halo.min';

const ProfileBackground = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        // Initialize Vanta.js effect
        const vantaEffect = BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            xOffset: 0,
            yOffset: 0.15,
            size: 1.19,
            amplitudeFactor: 0.01,
            baseColor: 0x4d2693,
            backgroundColor: 0x231b41,
        });

        return () => {
            // Cleanup function to destroy Vanta.js effect
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div ref={vantaRef} style={{ position: 'fixed',boxShadow: '1.5vw 0px 55px rgba(0, 0, 0, 0.7)', top: 0, left: 0, width: '30%', height: '100vh', zIndex: -1 }}></div>;
};

export default React.memo(ProfileBackground);
