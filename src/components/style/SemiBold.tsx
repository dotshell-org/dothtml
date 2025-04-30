import React from "react";

interface SemiBoldTagProps {
    children: React.ReactNode;
}

const SemiBold: React.FC<SemiBoldTagProps> = ({ children }) => {
    return <span className="font-semibold">
        {children}
    </span>
}

export default SemiBold;