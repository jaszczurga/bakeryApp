import React from 'react';
import {Box} from "@/components/mainSection/superBoxes/box";
import {boxContent} from "@/lib/constants";


export const SuperBoxes = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 p-6">
            {boxContent.map((box, index) => (
                <Box key={index} title={box.title} description={box.description}  />
            ))}
        </div>
    );
};
