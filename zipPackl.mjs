import AdmZip from 'adm-zip'
import path from 'path'

console.log('正在打包')
// 在内存中创建新的zip文件
const zip = new AdmZip();
// 为zip添加本地文件夹
zip.addLocalFolder('./build')
// 生成zip文件
zip.writeZip('./build.zip');
console.log('打包完成')