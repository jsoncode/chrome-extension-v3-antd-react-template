import React, {FC, useEffect, useState} from 'react';
import Container from '@/components/Container'
import {Button, Form, Switch} from 'antd';

var huoxingKey = 'TranslateHuoxing'
let SwitchOpen = huoxingKey + 'SwitchOpen'
const Index: FC = () => {
    const [checked, setChecked] = useState(false)

    const checkedChange = async (value: boolean) => {
        setChecked(value)
        await chrome.storage.local.set({
            [SwitchOpen]: value
        })
    }

    async function getSwitchOpen() {
        let storage = await chrome.storage.local.get(SwitchOpen)
        setChecked(storage[SwitchOpen])
    }

    useEffect(() => {
        getSwitchOpen()
    }, [])
    return <Container>
        <Form
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
            autoComplete="off"
            size={'large'}
        >
            <Form.Item
                label="开启火星文微博翻译"
                name="open"
            >
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={checked} onChange={checkedChange}/>
            </Form.Item>
        </Form>
    </Container>
}

export default Index;