# vue-tree-to-table
[Online Demo](https://a869057476.github.io/vue-tree-to-table/)
## Introduce
> Default show
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/2.png)
> checkbox
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/3.png)
> slot
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/6.png)
> fold
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/8.png)
> hide head
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/10.png)
> fixed height
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/11.png)
> extra column
![vue-tree-to-table Screenshot](https://github.com/a869057476/huangwei.github.io/blob/master/15.png)

## Features

- Tree data to table view
- checkbox, supporting relevance and independence
- Folding, supporting themselves and specified level
- Extra column
- Node and head slot
- Head hide
- Fixed height
- Etc in project

# API
### Important!(All the example how to use in this repository, you can download and reference it.)
 
| Parameters | Description | Type | Optional value |Default value |
|---------- |-------- |---------- |---------- |---------- |
| tableColumns | Dynamic header | Array | Y |	[] |
| originData | Tree data | Array | Y | [] |
| isFold | Whether the folding | Boolean | - | false | 
| foldNum | Folding level,  effected only if foldNum is true, to a certain level the child can fully deployed, the default is one layer | Number | - | 0 |
| showCheckbox | Whether to display the check box | Boolean | - | false |
| showCheckboxAndSlot | Whether to display both check boxes and slot, only if showCheckBox is true | Boolean | - | false |
| checkStrictly | Whether to strictly follow the parent-child correlation, only if showCheckbox is true | Boolean | - | false |
| trueCheckLabel | Alias for checkbox checked, only if showCheckbox is true | Boolean | - | false |
| falseCheckLabel | Alias for checkbox unchecked, only if showCheckbox is true | Boolean | - | false |
| trueEditLabel | Alias for checkbox disabled, only if showCheckbox is true | Boolean | - | false |
| falseEditLabel | Alias for checkbox not disabled, only if showCheckbox is true | Boolean | - | false |
| disabledCheckboxNodeLevel | The first few levels of the disabled checkbox, only if showCheckbox is true | Number | - | 0 |
| disabledCheckboxLevels | The level of the disabled checkbox, only if showCheckbox is true | Array | - | [] |
| disabledCheckboxIds | Disabled the IDS of the checkbox, only if showCheckbox is true | Array | - | [] |
| isShowTableHead | Whether to display the header | Boolean | - | false |
| height | Table height | String, Number | - | 'auto' |
| extraColumn | Whether there is additional fixed column concatenation behind it | Boolean | - | false |
| extraColumnObj | Data for additional columns, only if extraColumn is true | Object | - | 	{columns: [], list: []} |

# methods
### Important!(All the example how to use in this repository, you can download and reference it.)
 
| name | Description | parameter |
|----------|----------|----------|
| getTreeData() | Gets the data for the tree | - |
| getCheckedNodeList() | Gets all selected nodes | - |
| resetCheckedNode(list) | Reset the node checkbox status | list: Array |
| changeNodeValue(list, key, value) | Modify the value of the node attribute | - |
| getExtraNodeList() | 	Gets the node data for the additional columns | - |

## Getting started

```bash
# clone the project
git clone https://github.com/a869057476/vue-tree-to-table.git

# enter the project directory
cd vue-tree-to-table

# install dependency
npm install

# develop
npm run start
```

This will automatically open http://localhost:8080

# Build
npm run build

## Usage in project
npm install vue-tree-to-table --save

`vue`
```

## 本地示例（折叠树表 + 额外列）
测试页已内置汇总逻辑（计数求和，时间加权平均，率二次计算），折叠/展开的额外列数据保持一致。

### 运行
```bash
npm install
npm run start
# 浏览 http://localhost:8080/#/test
```

### 配置示例
```js
// 额外列定义（按负责人最细颗粒）
const metricColumns = [
  { id: 'avgTaskDuration', nodeName: '平均任务耗时', metricKey: 'avgTaskMinutes' },
  { id: 'avgDelay', nodeName: '平均延迟时间', metricKey: 'avgDelayMinutes' },
  { id: 'avgResponse', nodeName: '平均响应时间', metricKey: 'avgResponseMinutes' },
  { id: 'taskTotal', nodeName: '任务总数', metricKey: 'taskTotal' },
  { id: 'exceptionCount', nodeName: '发生异常任务数', metricKey: 'exceptionCount' },
  { id: 'alertCount', nodeName: '触发预警任务数', metricKey: 'alertCount' },
  { id: 'abnormalRate', nodeName: '异常率', metricKey: 'abnormalRate' },
  { id: 'alertRate', nodeName: '预警率', metricKey: 'alertRate' }
]
// 表头（树节点列）
const tableColumns = [[
  { id: 'col-month', nodeName: '月份', rowSpan: 1, colSpan: 1 },
  { id: 'col-task', nodeName: '任务名称', rowSpan: 1, colSpan: 1 },
  { id: 'col-order', nodeName: '订单类型', rowSpan: 1, colSpan: 1 },
  { id: 'col-dept', nodeName: '部门', rowSpan: 1, colSpan: 1 },
  { id: 'col-owner', nodeName: '负责人', rowSpan: 1, colSpan: 1 }
]]
```

### 假数据示例（片段）
```js
// 每个负责人是叶子节点，metrics 为该负责人指标；父级会自动向上汇总
originData = [
  {
    id: 'month-202501', nodeLevel: 1, nodeName: '2025-01', step: 1, parentId: null,
    chidrenList: [
      {
        id: 'task-booking', nodeLevel: 2, nodeName: '订舱', step: 1, parentId: 'month-202501',
        chidrenList: [
          {
            id: 'order-sea-door', nodeLevel: 3, nodeName: '海运门到门', step: 1, parentId: 'task-booking',
            chidrenList: [
              {
                id: 'dept-service-1', nodeLevel: 4, nodeName: '客服一组', step: 1, parentId: 'order-sea-door',
                chidrenList: [
                  { id: 'owner-jack', nodeLevel: 5, nodeName: 'Jack', step: 1, parentId: 'dept-service-1', metrics: { avgTaskMinutes: 173, avgDelayMinutes: 42, avgResponseMinutes: 10, taskTotal: 254, exceptionCount: 1, alertCount: 3 }, chidrenList: [] },
                  { id: 'owner-danni', nodeLevel: 5, nodeName: 'Danni', step: 1, parentId: 'dept-service-1', metrics: { avgTaskMinutes: 173, avgDelayMinutes: 42, avgResponseMinutes: 10, taskTotal: 254, exceptionCount: 1, alertCount: 3 }, chidrenList: [] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'month-202502', nodeLevel: 1, nodeName: '2025-02', step: 1, parentId: null,
    chidrenList: [
      {
        id: 'task-dispatch', nodeLevel: 2, nodeName: '配送', step: 1, parentId: 'month-202502',
        chidrenList: [
          {
            id: 'order-local', nodeLevel: 3, nodeName: '本地派送', step: 1, parentId: 'task-dispatch',
            chidrenList: [
              { id: 'dept-dispatch-1', nodeLevel: 4, nodeName: '配送一组', step: 1, parentId: 'order-local',
                chidrenList: [
                  { id: 'owner-jack', nodeLevel: 5, nodeName: 'Jack', step: 1, parentId: 'dept-dispatch-1', metrics: { avgTaskMinutes: 173, avgDelayMinutes: 42, avgResponseMinutes: 10, taskTotal: 254, exceptionCount: 1, alertCount: 3 }, chidrenList: [] },
                  { id: 'owner-grace', nodeLevel: 5, nodeName: 'Grace', step: 1, parentId: 'dept-dispatch-1', metrics: { avgTaskMinutes: 95, avgDelayMinutes: 18, avgResponseMinutes: 7, taskTotal: 140, exceptionCount: 0, alertCount: 2 }, chidrenList: [] }
                ] }
            ]
          }
        ]
      }
    ]
  }
]
```
<template>
  <div id="app">
    <VueTreeToTable
      :origin-data="originData"
      :table-columns="tableColumns"
    />
    <VueTreeToTable
      :origin-data="originData"
      :table-columns="tableColumns"
      show-checkbox
    />
  </div>
</template>

<script>
import VueTreeToTable from 'vue-tree-to-table'

export default {
  name: 'App',
  components: {
    VueTreeToTable
  },
  data() {
    return {
      originData: [],
      tableColumns: []
    }
  },
  created() {
    this.tableColumns = [
      [
        {
          id: 'head1',
          nodeName: '表头1',
          rowSpan: 2,
          colSpan: 1
        },
        {
          id: 'head2',
          nodeName: '表头2',
          rowSpan: 2,
          colSpan: 1
        },
        {
          id: 'head3',
          nodeName: '表头3',
          rowSpan: 1,
          colSpan: 4
        }
      ],
      [
        {
          id: 'head4',
          nodeName: '表头4',
          rowSpan: 1,
          colSpan: 1
        },
        {
          id: 'head5',
          nodeName: '表头5',
          rowSpan: 1,
          colSpan: 3
        }
      ]
    ]
    this.originData = [
      {
        id: 'body1',
        nodeLevel: 1,
        nodeName: '节点1',
        step: 1,
        parentId: null,
        isChecked: false,
        editable: false,
        chidrenList: [
          {
            id: 'body1-1',
            nodeLevel: 2,
            nodeName: '节点1-1',
            step: 1,
            parentId: 'body1',
            isChecked: false,
            editable: false,
            chidrenList: [
              {
                id: 'body1-1-1',
                nodeLevel: 3,
                nodeName: '节点1-1-1',
                step: 1,
                parentId: 'body1-1',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body1-1-1-1',
                    nodeLevel: 4,
                    nodeName: '节点1-1-1-1',
                    step: 1,
                    parentId: 'body1-1-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body1-1-1-1-1',
                        nodeLevel: 5,
                        nodeName: '节点1-1-1-1-1',
                        step: 1,
                        parentId: 'body1-1-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [
                          {
                            id: 'body1-1-1-1-1-1',
                            nodeLevel: 6,
                            nodeName: '节点1-1-1-1-1-1',
                            step: 1,
                            parentId: 'body1-1-1-1-1',
                            isChecked: false,
                            editable: false,
                            chidrenList: [
                              
                            ]
                          },
                          {
                            id: 'body1-1-1-1-1-2',
                            nodeLevel: 6,
                            nodeName: '节点1-1-1-1-1-2',
                            step: 1,
                            parentId: 'body1-1-1-1-1',
                            isChecked: false,
                            editable: false,
                            chidrenList: [
                              
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'body1-1-1-2',
                    nodeLevel: 4,
                    nodeName: '节点1-1-1-2',
                    step: 1,
                    parentId: 'body1-1-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: []
                  },
                  {
                    id: 'body1-1-1-3',
                    nodeLevel: 4,
                    nodeName: '节点1-1-1-3',
                    step: 1,
                    parentId: 'body1-1-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body1-1-1-3-1',
                        nodeLevel: 5,
                        nodeName: '节点1-1-1-3-1',
                        step: 1,
                        parentId: 'body1-1-1-3',
                        isChecked: false,
                        editable: false,
                        chidrenList: []
                      },
                      {
                        id: 'body1-1-1-3-2',
                        nodeLevel: 5,
                        nodeName: '节点1-1-1-3-2',
                        step: 2,
                        parentId: 'body1-1-1-3',
                        isChecked: false,
                        editable: false,
                        chidrenList: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 'body1-1-2',
                nodeLevel: 3,
                nodeName: '节点1-1-2',
                step: 1,
                parentId: 'body1-1',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body1-1-2-1',
                    nodeLevel: 4,
                    nodeName: '节点1-1-2-1',
                    step: 1,
                    parentId: 'body1-1-2',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body1-1-2-1-1',
                        nodeLevel: 5,
                        nodeName: '节点1-1-2-1-1',
                        step: 1,
                        parentId: 'body1-1-2-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [
                          {
                            id: 'body1-1-2-1-1-1',
                            nodeLevel: 6,
                            nodeName: '节点1-1-2-1-1-1',
                            step: 1,
                            parentId: 'body1-1-2-1-1',
                            isChecked: false,
                            editable: false,
                            chidrenList: [
                              
                            ]
                          },
                          {
                            id: 'body1-1-2-1-1-2',
                            nodeLevel: 6,
                            nodeName: '节点1-1-2-1-1-2',
                            step: 1,
                            parentId: 'body1-1-2-1-1',
                            isChecked: false,
                            editable: false,
                            chidrenList: [
                              
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'body2',
        nodeLevel: 1,
        nodeName: '节点2',
        step: 1,
        parentId: null,
        isChecked: false,
        editable: false,
        chidrenList: [
          {
            id: 'body2-1',
            nodeLevel: 2,
            nodeName: '节点2-1',
            step: 1,
            parentId: 'body2',
            isChecked: false,
            editable: false,
            chidrenList: [
              {
                id: 'body2-1-1',
                nodeLevel: 3,
                nodeName: '节点2-1-1',
                step: 1,
                parentId: 'body2-1',
                isChecked: false,
                editable: false,
                chidrenList: [

                ]
              },
              {
                id: 'body2-1-2',
                nodeLevel: 3,
                nodeName: '节点2-1-2',
                step: 1,
                parentId: 'body2-1',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body2-1-2-1',
                    nodeLevel: 4,
                    nodeName: '节点2-1-2-1',
                    step: 1,
                    parentId: 'body2-1-2',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body2-1-2-1-1',
                        nodeLevel: 5,
                        nodeName: '节点2-1-2-1-1',
                        step: 1,
                        parentId: 'body2-1-2-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [
                          {
                            id: 'body2-1-2-1-1-1',
                            nodeLevel: 6,
                            nodeName: '节点2-1-2-1-1-1',
                            step: 1,
                            parentId: 'body2-1-2-1-1',
                            isChecked: false,
                            editable: false,
                            chidrenList: [
                              
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'body3',
        nodeLevel: 1,
        nodeName: '节点3',
        step: 1,
        parentId: null,
        isChecked: false,
        editable: false,
        chidrenList: []
      },
      {
        id: 'body4',
        nodeLevel: 1,
        nodeName: '节点4',
        step: 1,
        parentId: null,
        isChecked: false,
        editable: false,
        chidrenList: [
          {
            id: 'body4-1',
            nodeLevel: 2,
            nodeName: '节点4-1',
            step: 1,
            parentId: 'body4',
            isChecked: false,
            editable: false,
            chidrenList: []
          }
        ]
      }
    ]
  }
}
</script>
```


