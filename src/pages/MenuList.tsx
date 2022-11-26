import React from 'react';
import {MenuProps} from "antd";
import {Link} from "react-router-dom";
import list from '@/router/List'

// 是否允许同时展开多个菜单 (仅在 mode=inline 下生效)
const openMultipleMenu = false
// 是否运行同时展开多个子菜单
const openMultipleSubMenu = true
const menuMap: any = {}

// 给菜单加上统一的key属性
const menuList: MenuProps['items'] = deepAddKey(list, '')

function deepAddKey(menuList: any, parentKey = '') {
    return menuList.map((item: any, index: number) => {
        item.title = item.label
        item.key = parentKey ? (parentKey + '-' + index.toString()) : index.toString()
        if (item.route !== undefined) {
            menuMap[item.route] = item;
            item.label = <Link to={item.route}>{item.label}</Link>
        }
        if (item.children) {
            deepAddKey(item.children, item.key)
        }
        return item
    })
}

export {
    menuMap,
    openMultipleMenu,
    openMultipleSubMenu,
}

export default menuList