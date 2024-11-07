import styles from './Button.module.css';
import cn from 'classnames';
import * as React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    appearance?: 'small' | 'big';
}

export function Button ({ children, appearance = 'small', className ,...props}: Props) {
    return (
        <button className={cn(styles.button, className, {
        [styles.small]: appearance === 'small',
        [styles.big]: appearance === 'big',
        })}
        {...props}>
            {children}
        </button>
    )
}