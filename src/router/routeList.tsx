import React from 'react'
import {RouteObject, Navigate} from 'react-router-dom';
import PageContainer from "@/pages";
import RouteList from '@/router/List'

const list: any = getRouteList(RouteList)
// 主路由
export const routeList: RouteObject[] = [
    {
        // 这里的pageContainer只是一个壳子,包含了公共的部分内容,子路由中的index才算真正首页
        path: '*', element: <PageContainer/>,
        children: [
            // 首页
            {
                index: true, element: <Navigate to="/Weibo"/>,
            },
            ...list,
            // 404页面
            // {
            //     path: '*', element: <Navigate to="/Installed"/>,
            // },
        ]
    },
];

function getRouteList(routes: any) {
    let newList: any = []
    loop(routes)
    return newList

    function loop(list: any) {
        list.forEach((item: any) => {
            if (item.element) {
                newList.push({
                    path: item.route.replace(/^\//, ''),
                    element: item.element,
                })
            } else {
                loop(item.children)
            }
        })
    }

}