declare module '*.module.less' {
    const classes: {
        readonly [key: string]: string
    }
    export default classes
}

//在typscript中无法识别非代码资源, 需要主动的去声明这些module
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'eslint-browser'

declare global {
    window: any;
}