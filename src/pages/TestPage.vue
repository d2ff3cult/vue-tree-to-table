<template>
  <div class="test-page">
    <h2>测试页：折叠树表 + 额外列</h2>
    <p class="intro">
      示例数据以“负责人”为叶子节点，额外列展示指标；指标由叶子逐级向上汇总（平均类用加权平均，计数类用求和）。
    </p>

    <section class="card">
      <header class="card__header">
        <div>
          <div class="card__title">订单履约任务统计</div>
          <div class="card__desc">支持折叠查看，额外列随层级汇总。</div>
        </div>
      </header>

      <TableTree
        :origin-data="originData"
        :table-columns="tableColumns"
        :extra-column-obj="extraColumnObj"
        extra-column
        is-fold
      >
        <template v-slot:node="{ node }">
          <span v-if="node.nodeType === 'extra'">{{ renderExtraValue(node) }}</span>
          <span v-else>{{ node.nodeName }}</span>
        </template>
      </TableTree>
    </section>
  </div>
</template>

<script>
import TableTree from '../TableTree/index.vue'

export default {
  name: 'TestPage',
  components: { TableTree },
  data() {
    return {
      tableColumns: [
        [
          { id: 'col-month', nodeName: '月份', rowSpan: 1, colSpan: 1 },
          { id: 'col-task', nodeName: '任务名称', rowSpan: 1, colSpan: 1 },
          { id: 'col-order', nodeName: '订单类型', rowSpan: 1, colSpan: 1 },
          { id: 'col-dept', nodeName: '部门', rowSpan: 1, colSpan: 1 },
          { id: 'col-owner', nodeName: '负责人', rowSpan: 1, colSpan: 1 }
        ]
      ],
      metricColumns: [
        { id: 'avgTaskDuration', nodeName: '平均任务耗时', metricKey: 'avgTaskMinutes' },
        { id: 'avgDelay', nodeName: '平均延迟时间', metricKey: 'avgDelayMinutes' },
        { id: 'avgResponse', nodeName: '平均响应时间', metricKey: 'avgResponseMinutes' },
        { id: 'taskTotal', nodeName: '任务总数', metricKey: 'taskTotal' },
        { id: 'exceptionCount', nodeName: '发生异常任务数', metricKey: 'exceptionCount' },
        { id: 'alertCount', nodeName: '触发预警任务数', metricKey: 'alertCount' },
        { id: 'abnormalRate', nodeName: '异常率', metricKey: 'abnormalRate' },
        { id: 'alertRate', nodeName: '预警率', metricKey: 'alertRate' }
      ],
      originData: []
    }
  },
  computed: {
    leafPaths() {
      const paths = []
      const walk = (nodes, stack = []) => {
        nodes.forEach(node => {
          const next = [...stack, node]
          if (!node.chidrenList || node.chidrenList.length === 0) {
            paths.push(next)
          } else {
            walk(node.chidrenList, next)
          }
        })
      }
      walk(this.originData)
      return paths
    },
    extraColumnObj() {
      const columns = this.metricColumns.map(col => ({
        id: col.id,
        nodeName: col.nodeName,
        nodeType: 'extra',
        colSpan: 1,
        rowSpan: 1,
        metricKey: col.metricKey
      }))

      const list = this.leafPaths.map(path => {
        const leaf = path[path.length - 1]
        const metrics = leaf.metrics || {}
        return this.metricColumns.map(col => ({
          nodeType: 'extra',
          id: `${leaf.id}-${col.metricKey}`,
          metricKey: col.metricKey,
          value: metrics[col.metricKey] || 0
        }))
      })

      return {
        columns,
        list
      }
    }
  },
  created() {
    this.originData = this.buildTreeData()
  },
  methods: {
    buildTreeData() {
      const ownerMetrics = {
        'owner-jack': this.buildMetrics({
          avgTaskMinutes: 173, // 2h53m
          avgDelayMinutes: 42,
          avgResponseMinutes: 10,
          taskTotal: 254,
          exceptionCount: 1,
          alertCount: 3
        }),
        'owner-danni': this.buildMetrics({
          avgTaskMinutes: 173,
          avgDelayMinutes: 42,
          avgResponseMinutes: 10,
          taskTotal: 254,
          exceptionCount: 1,
          alertCount: 3
        }),
        'owner-emma': this.buildMetrics({
          avgTaskMinutes: 125,
          avgDelayMinutes: 25,
          avgResponseMinutes: 8,
          taskTotal: 180,
          exceptionCount: 2,
          alertCount: 4
        }),
        'owner-frank': this.buildMetrics({
          avgTaskMinutes: 210,
          avgDelayMinutes: 60,
          avgResponseMinutes: 12,
          taskTotal: 310,
          exceptionCount: 3,
          alertCount: 6
        }),
        'owner-grace': this.buildMetrics({
          avgTaskMinutes: 95,
          avgDelayMinutes: 18,
          avgResponseMinutes: 7,
          taskTotal: 140,
          exceptionCount: 0,
          alertCount: 2
        })
      }

      const buildDept = (id, name, ownerIds, parentId) => ({
        id,
        nodeLevel: 4,
        nodeName: name,
        step: 1,
        parentId,
        isChecked: false,
        editable: false,
        chidrenList: ownerIds.map(ownerId => ({
          id: ownerId,
          nodeLevel: 5,
          nodeName: ownerId.replace('owner-', '').replace(/^\w/, s => s.toUpperCase()),
          step: 1,
          parentId: id,
          isChecked: false,
          editable: false,
          metrics: ownerMetrics[ownerId],
          chidrenList: []
        }))
      })

      const tree = [
        {
          id: 'month-202501',
          nodeLevel: 1,
          nodeName: '2025-01',
          step: 1,
          parentId: null,
          isChecked: false,
          editable: false,
          chidrenList: [
            {
              id: 'task-booking',
              nodeLevel: 2,
              nodeName: '订舱',
              step: 1,
              parentId: 'month-202501',
              isChecked: false,
              editable: false,
              chidrenList: [
                {
                  id: 'order-sea-door',
                  nodeLevel: 3,
                  nodeName: '海运门到门',
                  step: 1,
                  parentId: 'task-booking',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-service-1', '客服一组', ['owner-jack', 'owner-danni'], 'order-sea-door'),
                    buildDept('dept-service-2', '客服二组', ['owner-emma'], 'order-sea-door')
                  ]
                },
                {
                  id: 'order-air-port',
                  nodeLevel: 3,
                  nodeName: '空运港到港',
                  step: 1,
                  parentId: 'task-booking',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-ops-1', '操作一组', ['owner-frank'], 'order-air-port')
                  ]
                }
              ]
            },
            {
              id: 'task-customs',
              nodeLevel: 2,
              nodeName: '报关',
              step: 1,
              parentId: 'month-202501',
              isChecked: false,
              editable: false,
              chidrenList: [
                {
                  id: 'order-rail',
                  nodeLevel: 3,
                  nodeName: '铁路到门',
                  step: 1,
                  parentId: 'task-customs',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-ops-2', '操作二组', ['owner-grace'], 'order-rail')
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'month-202502',
          nodeLevel: 1,
          nodeName: '2025-02',
          step: 1,
          parentId: null,
          isChecked: false,
          editable: false,
          chidrenList: [
            {
              id: 'task-dispatch',
              nodeLevel: 2,
              nodeName: '配送',
              step: 1,
              parentId: 'month-202502',
              isChecked: false,
              editable: false,
              chidrenList: [
                {
                  id: 'order-local',
                  nodeLevel: 3,
                  nodeName: '本地派送',
                  step: 1,
                  parentId: 'task-dispatch',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-dispatch-1', '配送一组', ['owner-jack', 'owner-grace'], 'order-local')
                  ]
                },
                {
                  id: 'order-warehouse',
                  nodeLevel: 3,
                  nodeName: '仓配一体',
                  step: 1,
                  parentId: 'task-dispatch',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-warehouse-1', '仓库一组', ['owner-danni', 'owner-emma'], 'order-warehouse')
                  ]
                }
              ]
            },
            {
              id: 'task-aftersale',
              nodeLevel: 2,
              nodeName: '售后',
              step: 1,
              parentId: 'month-202502',
              isChecked: false,
              editable: false,
              chidrenList: [
                {
                  id: 'order-claim',
                  nodeLevel: 3,
                  nodeName: '理赔处理',
                  step: 1,
                  parentId: 'task-aftersale',
                  isChecked: false,
                  editable: false,
                  chidrenList: [
                    buildDept('dept-claim-1', '理赔一组', ['owner-frank'], 'order-claim')
                  ]
                }
              ]
            }
          ]
        }
      ]
      this.aggregateTreeMetrics(tree)
      return tree
    },
    buildMetrics(payload) {
      const abnormalRate = payload.taskTotal ? Number((payload.exceptionCount / payload.taskTotal * 100).toFixed(2)) : 0
      const alertRate = payload.taskTotal ? Number((payload.alertCount / payload.taskTotal * 100).toFixed(2)) : 0
      return Object.assign({}, payload, {
        abnormalRate,
        alertRate
      })
    },
    // 将叶子指标向上汇总：计数求和，时间用任务数加权平均，率由聚合后再计算
    aggregateTreeMetrics(tree) {
      const dfs = node => {
        if (!node.chidrenList || node.chidrenList.length === 0) {
          return node.metrics || {}
        }
        const childMetrics = node.chidrenList.map(dfs)
        const sum = key => childMetrics.reduce((acc, cur) => acc + (Number(cur[key]) || 0), 0)
        const taskTotal = sum('taskTotal')
        const exceptionCount = sum('exceptionCount')
        const alertCount = sum('alertCount')
        const weightedAvg = key => {
          if (!taskTotal) return 0
          const total = childMetrics.reduce((acc, cur) => acc + (Number(cur[key]) || 0) * (Number(cur.taskTotal) || 0), 0)
          return Number((total / taskTotal).toFixed(2))
        }
        const metrics = {
          taskTotal,
          exceptionCount,
          alertCount,
          avgTaskMinutes: weightedAvg('avgTaskMinutes'),
          avgDelayMinutes: weightedAvg('avgDelayMinutes'),
          avgResponseMinutes: weightedAvg('avgResponseMinutes')
        }
        metrics.abnormalRate = taskTotal ? Number((metrics.exceptionCount / taskTotal * 100).toFixed(2)) : 0
        metrics.alertRate = taskTotal ? Number((metrics.alertCount / taskTotal * 100).toFixed(2)) : 0
        node.metrics = metrics
        return metrics
      }
      tree.forEach(dfs)
    },
    formatDuration(minutes) {
      const m = Number(minutes) || 0
      const h = Math.floor(m / 60)
      const rest = m % 60
      if (h <= 0) return `${rest}分钟`
      return `${h}小时${rest}分钟`
    },
    renderExtraValue(node) {
      const val = node.value
      if (['avgTaskMinutes', 'avgDelayMinutes', 'avgResponseMinutes'].includes(node.metricKey)) {
        return this.formatDuration(val)
      }
      if (['abnormalRate', 'alertRate'].includes(node.metricKey)) {
        return `${val}%`
      }
      return val
    }
  }
}
</script>

<style scoped>
.test-page {
  max-width: 1180px;
  margin: 0 auto;
  text-align: left;
}

.intro {
  color: #606266;
  margin: 6px 0 16px;
}

.card {
  background: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.card__title {
  font-size: 16px;
  font-weight: 600;
}

.card__desc {
  color: #909399;
  font-size: 13px;
}
</style>

