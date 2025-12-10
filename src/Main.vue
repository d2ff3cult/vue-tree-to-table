<template>
  <div id="app" class="layout">
    <header class="layout__header">
      <div class="layout__brand">
        <span class="layout__title">vue-tree-to-table</span>
        <span class="layout__tag">dev</span>
      </div>
      <nav class="layout__nav">
        <router-link to="/docs" exact-active-class="is-active">文档页</router-link>
        <router-link to="/test" exact-active-class="is-active">测试页</router-link>
      </nav>
    </header>
    <main class="layout__content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
  color: #2c3e50;
}

.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.layout__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.layout__title {
  font-size: 18px;
  font-weight: 600;
}

.layout__tag {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  background: #ecf5ff;
  color: #409eff;
}

.layout__nav {
  display: flex;
  gap: 12px;
}

.layout__nav a {
  color: #606266;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.layout__nav a:hover {
  background: #f0f2f5;
  color: #303133;
}

.layout__nav .is-active {
  background: #409eff;
  color: #ffffff;
}

.layout__content {
  flex: 1;
  padding: 16px 24px 32px;
}
</style>

