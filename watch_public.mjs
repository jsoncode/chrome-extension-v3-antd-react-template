import fs from 'fs'
import path from 'path'

/**
 * 由于项目不能对public下的文件进行热更新，所以这里自己实现一下热更新功能。
 */
const publicDir = path.resolve('./public')
const build = path.resolve('./build')

const fileList = deepGetFile(publicDir)

for (let item of fileList) {
    fs.copyFileSync(item, item.replace(publicDir, build))

    fs.watchFile(item, {
        persistent: true, // 监控之后是否继续进程，默认false
        interval: 1000, // 监听频率，毫秒
    }, () => {
        fs.copyFileSync(item, item.replace(publicDir, build))
        console.log('public文件复制成功')
    })
}
console.log('已开启手动监听public文件夹下的文件')

function deepGetFile(dir) {
    let backList = []
    let list = fs.readdirSync(dir)

    for (let index in list) {
        let item = path.resolve(dir, list[index])
        if (fs.statSync(item).isDirectory()) {
            backList = backList.concat(deepGetFile(item))
        } else {
            backList.push(item)
        }
    }
    return backList
}