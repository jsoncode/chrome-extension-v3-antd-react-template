import {fant, jian} from "@/const/fanti";
import {MarsMap} from "@/const/mars";

/**
 * 获取本地缓存
 * @param name
 */
export async function getStorage(name: string) {
    if (chrome.storage) {
        return chrome.storage.local.get(name)
    }
    return {}
}


/**
 * 设置本地缓存
 * @param value
 */
export async function setStorage(value: any) {
    if (chrome.storage) {
        // chrome.storage.local.set({testKey: any})
        return chrome.storage.local.set(value)
    }
}

export function translateHuoxing(txt: string) {
    return txt.split('').map(i => {
        let val = MarsMap[i];
        if (val) {
            let random: number = Math.floor(Math.random() * val.length)
            return val[random]
        } else {
            return i
        }
    }).join('')
}

export function translateFanti(txt: string) {
    return txt.split('').map((i: string) => {
        let index = jian.indexOf(i);
        if (index > -1) {
            return fant[index]
        } else {
            return i
        }
    }).join('')
}

export function translateJianti(txt: string) {
    return txt.split('').map((i: string) => {
        let index = fant.indexOf(i);
        if (index > -1) {
            return jian[index]
        } else {
            return i
        }
    }).join('')
}