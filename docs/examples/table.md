# 表格示例

表格（Table）是展示和操作结构化数据的核心组件。ZXUI CN 提供了功能强大且高度可定制的表格组件，满足各种数据展示需求。

## 基础表格

最基本的表格示例，展示简单的数据列表。

```vue
<template>
  <div class="basic-table-demo">
    <zx-table :data="tableData">
      <zx-table-column prop="id" label="ID" width="80" />
      <zx-table-column prop="name" label="姓名" width="120" />
      <zx-table-column prop="age" label="年龄" width="80" />
      <zx-table-column prop="address" label="地址" />
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区芍药居'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区陆家嘴'
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区天河路'
  },
  {
    id: 4,
    name: '赵六',
    age: 30,
    address: '深圳市南山区高新园'
  }
])
</script>
```

## 带操作的表格

带有编辑、删除等操作按钮的表格示例。

```vue
<template>
  <div class="actions-table-demo">
    <zx-table :data="tableData">
      <zx-table-column prop="id" label="ID" width="80" />
      <zx-table-column prop="name" label="姓名" width="120" />
      <zx-table-column prop="age" label="年龄" width="80" />
      <zx-table-column prop="address" label="地址" />
      <zx-table-column label="操作" width="180">
        <template #default="scope">
          <zx-button 
            type="primary" 
            size="small" 
            @click="handleEdit(scope.row)"
          >
            编辑
          </zx-button>
          <zx-button 
            type="danger" 
            size="small" 
            @click="handleDelete(scope.row)"
          >
            删除
          </zx-button>
        </template>
      </zx-table-column>
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区芍药居'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区陆家嘴'
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区天河路'
  },
  {
    id: 4,
    name: '赵六',
    age: 30,
    address: '深圳市南山区高新园'
  }
])

const handleEdit = (row: any) => {
  console.log('编辑行:', row)
  // 实现编辑逻辑
}

const handleDelete = (row: any) => {
  console.log('删除行:', row)
  // 实现删除逻辑
}
</script>

<style lang="scss" scoped>
.actions-table-demo {
  .zx-button {
    margin-right: 5px;
  }
}
</style>
```

## 可选择表格

带有选择功能的表格，可以选择多行数据。

```vue
<template>
  <div class="selectable-table-demo">
    <div class="table-actions">
      <zx-button 
        type="danger" 
        :disabled="selection.length === 0"
        @click="handleBatchDelete"
      >
        批量删除
      </zx-button>
    </div>
    
    <zx-table 
      :data="tableData" 
      @selection-change="handleSelectionChange"
    >
      <zx-table-column type="selection" width="55" />
      <zx-table-column prop="id" label="ID" width="80" />
      <zx-table-column prop="name" label="姓名" width="120" />
      <zx-table-column prop="age" label="年龄" width="80" />
      <zx-table-column prop="address" label="地址" />
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区芍药居'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区陆家嘴'
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区天河路'
  },
  {
    id: 4,
    name: '赵六',
    age: 30,
    address: '深圳市南山区高新园'
  }
])

const selection = ref([])

const handleSelectionChange = (val: any[]) => {
  selection.value = val
}

const handleBatchDelete = () => {
  console.log('批量删除:', selection.value)
  // 实现批量删除逻辑
}
</script>

<style lang="scss" scoped>
.selectable-table-demo {
  .table-actions {
    margin-bottom: 15px;
  }
}
</style>
```

## 排序和筛选

支持排序和筛选功能的表格示例。

```vue
<template>
  <div class="sort-filter-table-demo">
    <zx-table :data="filteredData">
      <zx-table-column 
        prop="id" 
        label="ID" 
        width="80" 
        sortable
      />
      <zx-table-column 
        prop="name" 
        label="姓名" 
        width="120"
      />
      <zx-table-column 
        prop="age" 
        label="年龄" 
        width="100" 
        sortable
      />
      <zx-table-column 
        prop="city" 
        label="城市" 
        width="120"
        :filters="cityFilters"
        :filter-method="filterCity"
        filter-placement="bottom-end"
      />
      <zx-table-column prop="address" label="详细地址" />
      <zx-table-column 
        prop="status" 
        label="状态" 
        width="120"
        :filters="statusFilters"
        :filter-method="filterStatus"
      >
        <template #default="scope">
          <zx-tag 
            :type="scope.row.status === 'active' ? 'success' : 
                  scope.row.status === 'pending' ? 'warning' : 'danger'"
          >
            {{ statusMap[scope.row.status] }}
          </zx-tag>
        </template>
      </zx-table-column>
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tableData = [
  {
    id: 1,
    name: '张三',
    age: 28,
    city: '北京',
    address: '朝阳区芍药居',
    status: 'active'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    city: '上海',
    address: '浦东新区陆家嘴',
    status: 'pending'
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    city: '广州',
    address: '天河区天河路',
    status: 'inactive'
  },
  {
    id: 4,
    name: '赵六',
    age: 30,
    city: '深圳',
    address: '南山区高新园',
    status: 'active'
  },
  {
    id: 5,
    name: '钱七',
    age: 26,
    city: '北京',
    address: '海淀区西二旗',
    status: 'pending'
  }
]

const statusMap = {
  active: '正常',
  pending: '待处理',
  inactive: '禁用'
}

const cityFilters = [
  { text: '北京', value: '北京' },
  { text: '上海', value: '上海' },
  { text: '广州', value: '广州' },
  { text: '深圳', value: '深圳' }
]

const statusFilters = [
  { text: '正常', value: 'active' },
  { text: '待处理', value: 'pending' },
  { text: '禁用', value: 'inactive' }
]

const filteredData = ref(tableData)

const filterCity = (value: string, row: any) => {
  return row.city === value
}

const filterStatus = (value: string, row: any) => {
  return row.status === value
}
</script>
```

## 可展开行

支持展开行显示更多信息的表格示例。

```vue
<template>
  <div class="expandable-table-demo">
    <zx-table :data="tableData">
      <zx-table-column type="expand">
        <template #default="props">
          <div class="expanded-row">
            <p><strong>详细信息：</strong></p>
            <p><strong>创建时间：</strong>{{ props.row.createTime }}</p>
            <p><strong>更新时间：</strong>{{ props.row.updateTime }}</p>
            <p><strong>备注：</strong>{{ props.row.remark }}</p>
          </div>
        </template>
      </zx-table-column>
      <zx-table-column prop="id" label="ID" width="80" />
      <zx-table-column prop="name" label="姓名" width="120" />
      <zx-table-column prop="age" label="年龄" width="80" />
      <zx-table-column prop="address" label="地址" />
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区芍药居',
    createTime: '2023-01-15 10:30:00',
    updateTime: '2023-05-20 15:45:00',
    remark: '这是一条关于张三的备注信息，包含了一些额外的描述内容。'
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区陆家嘴',
    createTime: '2023-02-18 09:20:00',
    updateTime: '2023-06-12 11:30:00',
    remark: '这是一条关于李四的备注信息，包含了一些额外的描述内容。'
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区天河路',
    createTime: '2023-03-22 14:50:00',
    updateTime: '2023-07-05 16:20:00',
    remark: '这是一条关于王五的备注信息，包含了一些额外的描述内容。'
  }
])
</script>

<style lang="scss" scoped>
.expandable-table-demo {
  .expanded-row {
    padding: 15px;
    
    p {
      margin: 8px 0;
    }
  }
}
</style>
```

## 分页表格

包含分页功能的表格示例。

```vue
<template>
  <div class="pagination-table-demo">
    <zx-table 
      :data="paginatedData" 
      style="width: 100%"
      border
    >
      <zx-table-column prop="id" label="ID" width="80" />
      <zx-table-column prop="name" label="姓名" width="120" />
      <zx-table-column prop="gender" label="性别" width="80">
        <template #default="scope">
          {{ scope.row.gender === 'male' ? '男' : '女' }}
        </template>
      </zx-table-column>
      <zx-table-column prop="age" label="年龄" width="80" />
      <zx-table-column prop="email" label="邮箱" width="180" />
      <zx-table-column prop="address" label="地址" />
    </zx-table>
    
    <div class="pagination-container">
      <zx-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="totalItems"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 模拟大量数据
const allData = []
for (let i = 1; i <= 95; i++) {
  allData.push({
    id: i,
    name: `用户${i}`,
    gender: i % 3 === 0 ? 'female' : 'male',
    age: 20 + (i % 30),
    email: `user${i}@example.com`,
    address: `示例地址 ${i} 号`
  })
}

const totalItems = allData.length
const currentPage = ref(1)
const pageSize = ref(10)

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return allData.slice(startIndex, endIndex)
})

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}
</script>

<style lang="scss" scoped>
.pagination-table-demo {
  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
```

## 固定表头和列

固定表头和列的表格示例，适用于大量数据展示。

```vue
<template>
  <div class="fixed-table-demo">
    <zx-table
      :data="tableData"
      style="width: 100%"
      height="400"
      border
    >
      <zx-table-column
        fixed
        prop="id"
        label="ID"
        width="80"
      />
      <zx-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <zx-table-column
        prop="age"
        label="年龄"
        width="80"
      />
      <zx-table-column
        prop="province"
        label="省份"
        width="120"
      />
      <zx-table-column
        prop="city"
        label="市区"
        width="120"
      />
      <zx-table-column
        prop="address"
        label="地址"
        width="300"
      />
      <zx-table-column
        prop="zip"
        label="邮编"
        width="120"
      />
      <zx-table-column
        prop="email"
        label="邮箱"
        width="180"
      />
      <zx-table-column
        prop="phone"
        label="电话"
        width="150"
      />
      <zx-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template #default="scope">
          <zx-button
            type="text"
            @click="handleClick(scope.row)"
          >
            查看
          </zx-button>
          <zx-button
            type="text"
            @click="handleEdit(scope.row)"
          >
            编辑
          </zx-button>
        </template>
      </zx-table-column>
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 生成模拟数据
const tableData = ref(Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    name: `用户${index + 1}`,
    age: 20 + (index % 30),
    province: '浙江省',
    city: '杭州市',
    address: `西湖区文三路 ${500 + index} 号`,
    zip: `31000${index}`,
    email: `user${index + 1}@example.com`,
    phone: `1381234${5678 + index}`
  }
}))

const handleClick = (row: any) => {
  console.log('查看行:', row)
}

const handleEdit = (row: any) => {
  console.log('编辑行:', row)
}
</script>
```

## 树形数据表格

展示具有父子层级关系的树形数据表格。

```vue
<template>
  <div class="tree-table-demo">
    <zx-table
      :data="treeData"
      row-key="id"
      border
      default-expand-all
    >
      <zx-table-column
        prop="name"
        label="部门名称"
        width="180"
      />
      <zx-table-column
        prop="leader"
        label="负责人"
        width="120"
      />
      <zx-table-column
        prop="memberCount"
        label="成员数量"
        width="100"
      />
      <zx-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      />
      <zx-table-column
        prop="description"
        label="描述"
      />
    </zx-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    name: '技术中心',
    leader: '张经理',
    memberCount: 148,
    createTime: '2020-01-01',
    description: '负责公司所有技术研发工作',
    children: [
      {
        id: 11,
        name: '研发部',
        leader: '李主管',
        memberCount: 65,
        createTime: '2020-01-15',
        description: '负责产品研发',
        children: [
          {
            id: 111,
            name: '前端组',
            leader: '王组长',
            memberCount: 25,
            createTime: '2020-02-01',
            description: '负责前端开发'
          },
          {
            id: 112,
            name: '后端组',
            leader: '赵组长',
            memberCount: 30,
            createTime: '2020-02-01',
            description: '负责后端开发'
          },
          {
            id: 113,
            name: '测试组',
            leader: '钱组长',
            memberCount: 10,
            createTime: '2020-02-05',
            description: '负责产品测试'
          }
        ]
      },
      {
        id: 12,
        name: '产品部',
        leader: '孙主管',
        memberCount: 28,
        createTime: '2020-01-20',
        description: '负责产品设计与规划',
        children: [
          {
            id: 121,
            name: 'UI设计组',
            leader: '周组长',
            memberCount: 15,
            createTime: '2020-02-10',
            description: '负责产品UI设计'
          },
          {
            id: 122,
            name: '产品规划组',
            leader: '吴组长',
            memberCount: 13,
            createTime: '2020-02-12',
            description: '负责产品规划'
          }
        ]
      },
      {
        id: 13,
        name: '运维部',
        leader: '郑主管',
        memberCount: 55,
        createTime: '2020-01-22',
        description: '负责系统运维'
      }
    ]
  },
  {
    id: 2,
    name: '市场中心',
    leader: '刘经理',
    memberCount: 65,
    createTime: '2020-01-05',
    description: '负责公司市场营销工作',
    children: [
      {
        id: 21,
        name: '营销部',
        leader: '陈主管',
        memberCount: 35,
        createTime: '2020-01-25',
        description: '负责市场营销'
      },
      {
        id: 22,
        name: '销售部',
        leader: '杨主管',
        memberCount: 30,
        createTime: '2020-01-28',
        description: '负责产品销售'
      }
    ]
  }
])
</script>
```

以上示例展示了 ZXUI CN 表格组件的各种用法和场景，包括基础表格、带操作的表格、可选择表格、排序和筛选、可展开行、分页表格、固定表头和列以及树形数据表格。你可以根据实际需求选择合适的表格类型和功能。 