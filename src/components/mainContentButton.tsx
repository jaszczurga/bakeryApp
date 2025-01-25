

import React, { useState, useEffect } from 'react';

export default function ScrollToMainButton() {
    const [showButton, setShowButton] = useState(false);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Tab') {
            setShowButton(true);
        }
    };

    const handleButtonKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setShowButton(false);
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        // Add event listener for keydown to detect Tab press
        window.addEventListener('keydown', handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div className={"relative"}>
            {showButton && (
                <button
                    className={"absolute"}
                    onClick={() => {
                        const mainContent = document.getElementById('main-content');
                        if (mainContent) {
                            mainContent.scrollIntoView({behavior: 'smooth'});
                        }
                    }}
                    onKeyDown={handleButtonKeyDown} // Add onKeyDown to handle Enter key
                >
                    Go to Main Content
                </button>
            )}
        </div>
    );
}
