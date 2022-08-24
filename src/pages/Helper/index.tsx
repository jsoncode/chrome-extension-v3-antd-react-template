import React, {FC} from 'react';
import styles from './index.module.less'
import Container from '@/components/Container'

const Index: FC = () => {
    return <div className={styles.page}>
        <Container
            onReset={({width, height}: any) => {
                console.log(width, height)
            }}
        >
            content
        </Container>
    </div>
}

export default Index;