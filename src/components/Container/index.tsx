import React from 'react';
import styles from './index.module.less'

interface IProps {
    [key: string]: any;

    children?: React.ReactNode;
}

const Index = (props: IProps) => {
    const {children, style, ...otherProps} = props;
    return <div
        className={styles.container}
        style={{
            ...style,
        }}
        {...otherProps}
    >
        <div className={styles.card}>
            {children}
        </div>
    </div>
}

export default Index;