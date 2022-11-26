import React, {FC, useState} from 'react';
import Container from '@/components/Container'
import {Button, Input, message} from 'antd';
import {LoginOutlined} from '@ant-design/icons'
import {translateHuoxing} from "@/utils";
import styles from './index.module.less'

const Index: FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [oldTxt, setOldTxt] = useState('')
    const [newTxt, setNewTxt] = useState('')
    const onChangeOld = (e: any) => {
        console.log(e.target.value)
        setOldTxt(e.target.value)
    }
    const onChangeNew = (e: any) => {
        setNewTxt(e.target.value)
    }
    const transformTxt = () => {
        if (oldTxt === '') {
            messageApi.open({
                type: 'error',
                content: '你还没有填写任何内容',
            });
            return
        }
        setNewTxt(translateHuoxing(oldTxt))
    }
    return <Container>
        {contextHolder}
        <div className={styles.row}>
            <div className={styles.col}>
                <Input.TextArea
                    onChange={onChangeOld}
                    value={oldTxt}
                    rows={30}
                    placeholder={'在这里输入你的文字内容'}
                />
            </div>
            <div className={styles.col}>
                <Button
                    size={'large'}
                    type="primary"
                    icon={<LoginOutlined/>}
                    onClick={() => {
                        transformTxt()
                    }}
                >
                    转火星文
                </Button>
            </div>
            <div className={styles.col}>
                <Input.TextArea
                    onChange={onChangeNew}
                    value={newTxt}
                    rows={30}
                    placeholder={'这里将生成火星文字'}
                />
            </div>
        </div>
    </Container>
}

export default Index;