### 名称:

与  预制厂

---

### 产品说明

集成 pc 端和移动端的 h5 页面

---

## 依赖 npm 包:

| 名字      | 中文说明   |
| --------- | ---------- |
| axios     | 网络请求   |
| moment    | 时间格式化 |
| echarts   | 图表       |
| md5       | 加密       |
| js-cookie | 浏览器缓存 |

---

### **页面清单**

#### pc 页面

| 英文名 | 中文说明     | 路径                   |
| ------ | ------------ | ---------------------- |
| item9  | 生产情况     | views/Board/item9.vue  |
| item0  | 制梁进度     | views/Board/item0.vue  |
| item11 | 梁场介绍     | views/Board/item11.vue |
| item4  | 计划实际对比 | views/Board/item4.vue  |
| item2  | 梁安装比率   | views/Board/item2.vue  |
| item10 | 生产照片     | views/Board/item10.vue |

---

#### 移动端页面

| 英文名 | 中文说明     | 路径                    |
| ------ | ------------ | ----------------------- |
| header | 头部         | views/mobile/header.vue |
| item1  | 制梁进度     | views/mobile/item1.vue  |
| item2  | 生产情况     | views/mobile/item2.vue  |
| item3  | 梁安装比率   | views/mobile/item3.vue  |
| item4  | 计划实际对比 | views/mobile/item4.vue  |
| item5  | 梁场介绍     | views/mobile/item5.vue  |
| item6  | 生产照片     | views/mobile/item6.vue  |

| item10 | 生产照片 |views/mobile/item10.vue |

---

### 复杂业务逻辑(主要技术)设计
1.pc端和移动端统一使用一个页面来实现，通过js判断环境不同渲染不同的组件，主要实现方式见入口文件(pages/board/board.js) 

