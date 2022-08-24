import React, {useLayoutEffect, useRef, useState} from 'react';
import styles from './index.module.less'

interface IProps {
    [key: string]: any;

    onResize?: ({height, width, ref}: { height: number, width: number, ref: React.ReactDOM | null }) => void;
    children?: React.ReactNode;
}

const Index = (props: IProps) => {
    const {children, onResize, style, ...otherProps} = props;
    const ref: any = useRef<React.ReactDOM | null>();
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const resize = () => {
        let windowHeight = window.innerHeight;
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const w = rect.width;
            const h = windowHeight - rect.top - 1;
            if (width !== w || height !== h) {
                setWidth(w)
                setHeight(h)
                onResize && onResize({width: w, height: h, ref})
            }
        }
    }
    useLayoutEffect(() => {
        resize();
        window.addEventListener('resize', resize, false)
        return () => window.removeEventListener('resize', resize, false)
    }, [ref.current]);
    return <div
        className={styles.container}
        ref={ref}
        style={{
            height,
            ...style,
        }}
        {...otherProps}
    >
        {children}
    </div>
}

export default Index;