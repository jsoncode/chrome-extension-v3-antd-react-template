import fs from 'fs'
import path from 'path'

/**
 * 由于项目不能对public下的文件进行热更新，所以这里自己实现一下热更新功能。
 */
const publicDir = path.resolve('./public')
const build = path.resolve('./build')
mkdir(build)
const fileList = deepGetFile(publicDir)

for (let item of fileList) {
    let toPath = item.replace(publicDir, build)
    mkdir(toPath)
    fs.copyFileSync(item, toPath)

    fs.watchFile(item, {
        persistent: true, // 监控之后是否继续进程，默认false
        interval: 1000, // 监听频率，毫秒
    }, () => {
        fs.copyFileSync(item, toPath)
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

function mkdir(dir) {
    let dirList = dir.replace(/^\//, '').split(/[\\\/]+/)
    dirList.pop()
    let pathStr = ''
    for (let index in dirList) {
        let item = dirList[index]
        if (index === '0') {
            pathStr = '/' + item
        } else {
            pathStr += '/' + item
        }

        if (pathStr && !fs.existsSync(pathStr)) {
            fs.mkdirSync(pathStr)
        }
    }
}
