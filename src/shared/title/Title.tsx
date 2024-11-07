import styles from './title.module.css';
import cn from "classnames";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLHeadElement> {
    className?: string;
    children: React.ReactNode;
}

export function Title ({ children, className, ...props }: Props) {
    return (
        <h1 {...props} className={cn(styles.title, className)}>{children}</h1>
    )
}