import React, { ElementType } from "react";
import { useDrawerContext } from "./DrawerContext";

interface DrawerHeaderProps {
    className?: string;
    children?: React.ReactNode;
    closeButtonClass?: string;
    as?: ElementType
}

const DrawerHeader = ({ children, className, as: Component = "button" }: DrawerHeaderProps) => {
    const { onHide } = useDrawerContext();

    return (
        <Component
            className={className ? className : ''}
            onClick={onHide}
        >
            {children}
        </Component>
    );
}

export default DrawerHeader;