import React, {FC} from 'react';
import styles from './index.module.less'
import Container from '@/components/Container'
import {Input} from 'antd';

const Index: FC = () => {
    return <Container>
        <h1>
            其他页面
        </h1>
        <div>
            测试一个antd组件的显示：
        </div>
        <Input placeholder="请输入内容"/>
    </Container>
}

export default Index;