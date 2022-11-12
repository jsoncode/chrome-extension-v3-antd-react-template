import React from 'react'
import {RouteObject, Navigate} from 'react-router-dom';
import PageContainer from "@/pages";
import Helper from '@/pages/Helper';
import Other from '@/pages/Other';

// 主路由
export const routeList: RouteObject[] = [
    {
        // 这里的pageContainer只是一个壳子,包含了公共的部分内容,子路由中的index才算真正首页
        path: '*', element: <PageContainer/>,
        children: [
            // 首页
            {
                index: true, element: <Navigate to="/Helper"/>,
            },
            {
                path: 'Helper', element: <Helper/>,
            },
            {
                path: 'Other', element: <Other/>,
            },
            // 404页面
            // {
            //     path: '*', element: <Navigate to="/Installed"/>,
            // },
        ]
    },
];
