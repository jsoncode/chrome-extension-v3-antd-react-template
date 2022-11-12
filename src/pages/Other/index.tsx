import React, {FC} from 'react';
import styles from './index.module.less'
import Container from '@/components/Container'
import {Input} from 'antd';

const Index: FC = () => {
    return <div className={styles.page}>
        <Container
            onReset={({width, height}: any) => {
                console.log(width, height)
            }}
        >
            <h1>
                其他页面
            </h1>
            <div>
                测试一个antd组件的显示：
            </div>
            <Input placeholder="请输入内容"/>
        </Container>
    </div>
}

export default Index;