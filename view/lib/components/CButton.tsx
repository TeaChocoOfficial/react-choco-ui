//-Path: "react-choco-ui-test/src/components/CButton.tsx"
import React from "react";

export interface CButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const CButton: React.FC<CButtonProps> = ({
    variant = "primary",
    size = "md",
    children,
    className = "",
    ...props
}) => {
    const baseClasses = "font-medium rounded-lg transition-colors";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}>
            {children}
        </button>
    );
};
