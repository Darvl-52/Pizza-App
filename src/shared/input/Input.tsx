import styles from './input.module.css';
import cn from 'classnames';
import * as React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({isValid = true, className, ...props}, ref) {
    return (
        <input ref={ref} className={cn(styles.input, className, {
            [styles.invalid]: !isValid
        })} {...props}/>
    );
});