### **项目名称:设备动态**

---
### **目录结构**
 | 名称           | 作用                                                 |
 | -------------- | ---------------------------------------------------- |
 | components    | 组件                                                 |
 | images         | 图片                                                 |
 | model          | 数据模型（用法见dva）                                |
 | page           | 页面                                                 |
 | services       | 网络服务                                             |
 | styles         | 封装样式                                             |
 | app.js         | 项目入口（引入dva,实例化小程序，获取open等基本功能） |
 | app.scss       | 初始化样式                                          |
 | dva.js         | 初始化dva                                            |
 | project.config | 小程序基本配置                                      |
 | package.json   | 项目命令，引入到npm,架构内容                         |

---

### **项目模块**

| 父模块 | 子模块            | 英文名            | 路径                        |
| ------ | ----------------- | ----------------- | --------------------------- |
|        | 注册              | registration      | src/pages/registration      |
| 首页   | 地图              | baiduMap          | src/components/baiduMap     |
| 首页   | 菜单              | siderMenu         | src/components/siderMenu    |
|        | 搜索              | search            | src/components/search       |
| 搜索   | 历史轨迹          | historyIndex      | src/pages/HistoryIndex      |
| 搜索   | 行驶轨迹          | traveIndex        | src/pages/traveIndex        |
| 搜索   | 行驶轨迹详情      | travelDetail      | src/pages/travelDetail      |
| 搜索   | 告警统计          | alarmIndex        | src/pages/alarmIndex        |
| 搜索   | 燃油洒水统计列表 | oilAndWaterIndex  | src/pages/oilAndWaterIndex  |
| 搜索   | 燃油洒水统计详情 | oilAndWaterDetail | src/pages/oilAndWaterDetail |
|        | 轨迹详情          | traceDetail       | src/pages/traceDetail       |

---

### **项目通用功能**
| 模块名称                | 作用                | 路径                            | 是否需要优化 |
| ----------------------- | ------------------- | ------------------------------- | ------------ |
| services                | 封装网路请求       | src/services                    | 是           |
| tools                  | 封装通用方法        | src/compoments/index           | 否           |
| wx_tools                | 封装微信自带工具api | src/compoments/tools/wx_tools  | 否           |
| baiduMap                | 封装百度地图        | src/compoments/baiduMap/index  | 是           |
| calendar                | 封装日历方法        | src/compoments/calendar/index  | 是           |
| dialog                  | 封装弹窗            | src/compoments/dialog/index    | 否           |
| websocket(暂时没有用到) | 封装weboscket       | src/compoments/websocket/index | 是           |
| template                | 封装统一模版        | src/compoments/template        | 是           |


---

### **基本命令**

1.  开发:npm run dev:weapp
2.  打包：npm run build:weapp
3.  
---

### **待优化**

1.	数据流优化，有些数据流模块还不是很清晰，待优化
2.	日历组件待优化（重复的状态，模版优化）
3.	echart 模块的封装（通过传入数据和类型可一键生成echart图）
4.	网络请求的封装优化（统一处理返回提示的判断需要优化）；前后台统一优化
5.	百度地图组件优化：markert图标优化，点击右下角按钮优化
6.	websocket需要提取到单独模块进行封装
7.	template模版到添加（暂无数据，请求失败）统一模版的提取

---
### **版本说明**

1.  测试版本
2.  线上版本

---

### **版本更新日志**
