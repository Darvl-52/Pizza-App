import styles from './Container.module.css';
import cn from "classnames";
import * as React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export function Container ({ children, className }: Props) {
    return (
        <div className={cn(styles.container, className)}>
            {children}
        </div>
    )
}