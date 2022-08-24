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
