1: 安装ts-node跟typescript。https://www.npmjs.com/package/ts-node
    Installation
    # Locally in your project. 
    npm install -D ts-node
    npm install -D typescript
    
    # Or globally with TypeScript. 
    npm install -g ts-node
    npm install -g typescript
2：安装提示文件，https://www.npmjs.com/package/@types/node
    Installation
    npm install --save @types/node
3：配置launch.json,按F5可直接运行配置好的脚本。https://segmentfault.com/a/1190000010605261
    {
        // 使用 IntelliSense 了解相关属性。 
        // 悬停以查看现有属性的描述。
        // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [{
            "name": "Launch Program",
            "type": "node",
            "request": "launch",
            "args": [
                "${workspaceRoot}/ts-test.ts" // 入口文件
                //"${relativeFile}"//当前文件
            ],
            "runtimeArgs": [
                "--nolazy",
                "-r",
                "ts-node/register"
            ],
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "protocol": "inspector",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }]
    }
4:调试面板运行制定脚本：node ***.ts 即可（类有问题？？？？）
