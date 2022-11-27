import React from 'react';
import Icon, {FireOutlined, QuestionCircleOutlined, SettingOutlined, WeiboOutlined} from "@ant-design/icons";
import Huoxing from "@/pages/Huoxing";
import WeiBo from '@/pages/WeiBo';
import Other from '@/pages/Other';
import Fanti from "@/pages/Fanti";
import {ReactComponent as FanSvg} from '@/assets/fan.svg'

const list = [
    {
        label: '火星文微博',
        icon: <WeiboOutlined style={{color: '#f50'}}/>,
        route: '/Weibo',
        element: <WeiBo/>
    },
    {
        label: '火星文翻译机',
        // 使用svg图标
        icon: <FireOutlined style={{color: '#f50'}}/>,
        // 使用svg图片
        // icon: <Icon component={<FireOutlined/>}/>,
        route: '/Huoxing',
        element: <Huoxing/>
    },
    {
        label: '繁简转换',
        icon: <Icon component={FanSvg}/>,
        route: '/Fanti',
        element: <Fanti/>
    },
    {
        label: '其他页面',
        icon: <SettingOutlined style={{fontSize: 20}}/>,
        children: [
            {
                label: '帮助',
                icon: <QuestionCircleOutlined style={{fontSize: 20}}/>,
                route: '/Other',
                element: <Other/>
            },
        ]
    },
];

export default list
