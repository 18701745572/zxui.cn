<template>
  <div class="component-demo">
    <h1>Avatar 头像</h1>
    <p class="component-description">用来代表用户或事物，支持图片、图标或字符展示。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="demo-row">
          <zx-avatar src="https://picsum.photos/200" />
          <zx-avatar>用户</zx-avatar>
          <zx-avatar />
        </div>
      </div>
      <div class="demo-block-description">
        支持三种类型：图片头像、文字头像和图标头像。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="demo-row">
          <zx-avatar size="small" src="https://picsum.photos/200" />
          <zx-avatar src="https://picsum.photos/200" />
          <zx-avatar size="large" src="https://picsum.photos/200" />
          <zx-avatar :size="60" src="https://picsum.photos/200" />
        </div>
      </div>
      <div class="demo-block-description">
        支持三种预设尺寸：small、default、large，也支持自定义尺寸。
      </div>
    </div>

    <h2>不同形状</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="demo-row">
          <zx-avatar shape="circle" src="https://picsum.photos/200" />
          <zx-avatar shape="square" src="https://picsum.photos/200" />
        </div>
      </div>
      <div class="demo-block-description">
        支持两种形状：circle（圆形）、square（方形）。
      </div>
    </div>

    <h2>适应容器</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="demo-row">
          <zx-avatar fit="fill" src="https://picsum.photos/200" />
          <zx-avatar fit="contain" src="https://picsum.photos/200" />
          <zx-avatar fit="cover" src="https://picsum.photos/200" />
          <zx-avatar fit="none" src="https://picsum.photos/200" />
          <zx-avatar fit="scale-down" src="https://picsum.photos/200" />
        </div>
      </div>
      <div class="demo-block-description">
        当展示类型为图片时，支持多种适应容器的方式：fill、contain、cover、none、scale-down。
      </div>
    </div>

    <h2>属性</h2>
    <table class="props-table">
      <thead>
        <tr>
          <th>属性名</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>size</td>
          <td>头像大小</td>
          <td>string / number</td>
          <td>small / default / large / 数字值</td>
          <td>default</td>
        </tr>
        <tr>
          <td>shape</td>
          <td>头像形状</td>
          <td>string</td>
          <td>circle / square</td>
          <td>circle</td>
        </tr>
        <tr>
          <td>src</td>
          <td>图片头像的资源地址</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>alt</td>
          <td>图片头像无法显示时的替代文本</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>fit</td>
          <td>图片如何适应容器</td>
          <td>string</td>
          <td>fill / contain / cover / none / scale-down</td>
          <td>cover</td>
        </tr>
      </tbody>
    </table>

    <h2>插槽</h2>
    <table class="props-table">
      <thead>
        <tr>
          <th>插槽名</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td>自定义头像展示内容</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.component-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.component-description {
  margin-bottom: 30px;
  font-size: 16px;
  color: #606266;
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 500;
  color: #303133;
}

h2 {
  margin: 45px 0 15px;
  font-size: 22px;
  font-weight: 500;
  color: #303133;
}

.demo-block {
  margin-bottom: 30px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  transition: .2s;
}

.demo-block-content {
  padding: 24px;
  border-bottom: 1px solid #e4e7ed;
}

.demo-block-description {
  padding: 18px 24px;
  background-color: #fafafa;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
}

.props-table th,
.props-table td {
  text-align: left;
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
}

.props-table th {
  background-color: #fafafa;
  color: #303133;
  font-weight: 500;
}

.props-table td {
  color: #606266;
}
</style>