import cn from "classnames";
import styles from './search.module.css';
import * as React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?:string;
}

export const Search = React.forwardRef<HTMLInputElement, Props>(function Search({ className, ...props}, ref) {
    return (
        <div className={styles.wrapper}>
            <input ref={ref} className={cn(styles.input, className)} {...props}/>
            <img src="/search.svg" alt="Иконка поиска" className={styles.icon}/>
        </div>
    );
});