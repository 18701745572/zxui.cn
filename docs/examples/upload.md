# 上传示例

上传（Upload）组件用于处理用户文件上传交互。ZXUI CN 提供了多种形式的上传组件，满足不同业务场景的需求。

## 基础上传

最基本的文件上传，点击按钮选择文件。

```vue
<template>
  <div class="basic-upload-demo">
    <zx-upload
      action="https://api.example.com/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      multiple
    >
      <zx-button type="primary">点击上传</zx-button>
      <template #tip>
        <div class="zx-upload-tip">
          支持多个文件上传，且不超过5MB
        </div>
      </template>
    </zx-upload>
  </div>
</template>

<script setup lang="ts">
const handleRemove = (file: any, fileList: any[]) => {
  console.log('移除文件', file, fileList)
}

const handlePreview = (file: any) => {
  console.log('预览文件', file)
}

const beforeUpload = (file: any) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  
  if (!isLt5M) {
    console.error('上传文件大小不能超过 5MB!')
    return false
  }
  
  return true
}
</script>
```

## 图片上传

专用于图片上传的组件，支持预览和缩略图展示。

```vue
<template>
  <div class="image-upload-demo">
    <zx-upload
      action="https://api.example.com/upload"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :limit="5"
      :on-exceed="handleExceed"
    >
      <i class="zx-icon-plus"></i>
    </zx-upload>
    
    <zx-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="预览图片" />
    </zx-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (file: any, fileList: any[]) => {
  console.log('移除图片', file, fileList)
}

const handlePreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleExceed = (files: any[], fileList: any[]) => {
  console.warn(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}

const beforeUpload = (file: any) => {
  const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(file.name)
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isImage) {
    console.error('上传文件只能是图片格式!')
    return false
  }
  
  if (!isLt2M) {
    console.error('上传图片大小不能超过 2MB!')
    return false
  }
  
  return true
}
</script>
```

## 拖拽上传

支持拖拽文件上传的组件。

```vue
<template>
  <div class="drag-upload-demo">
    <zx-upload
      action="https://api.example.com/upload"
      drag
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
    >
      <i class="zx-icon-upload"></i>
      <div class="zx-upload-drag-text">拖拽文件到此处或 <em>点击上传</em></div>
      <div class="zx-upload-tip">
        支持多个文件同时上传，单个文件不超过10MB
      </div>
    </zx-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

const handleRemove = (file: any, fileList: any[]) => {
  console.log('移除文件', file, fileList)
}

const handlePreview = (file: any) => {
  console.log('预览文件', file)
}

const handleSuccess = (response: any, file: any, fileList: any[]) => {
  console.log('上传成功', response, file, fileList)
}

const beforeUpload = (file: any) => {
  const isLt10M = file.size / 1024 / 1024 < 10
  
  if (!isLt10M) {
    console.error('上传文件大小不能超过 10MB!')
    return false
  }
  
  return true
}
</script>
```

## 手动上传

控制文件上传的时机，手动触发上传过程。

```vue
<template>
  <div class="manual-upload-demo">
    <zx-upload
      ref="uploadRef"
      action="https://api.example.com/upload"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      multiple
    >
      <template #trigger>
        <zx-button type="primary">选择文件</zx-button>
      </template>
      <template #tip>
        <div class="zx-upload-tip">
          请选择需要上传的文件，然后点击上传按钮开始上传
        </div>
      </template>
      <zx-button
        style="margin-left: 10px;"
        type="success"
        @click="submitUpload"
        :loading="uploading"
      >
        {{ uploading ? '上传中...' : '开始上传' }}
      </zx-button>
    </zx-upload>
    
    <div class="file-status" v-if="fileList.length > 0">
      <h3>已选择文件：</h3>
      <div class="file-list">
        <p v-for="(file, index) in fileList" :key="index">
          {{ file.name }} - {{ formatFileSize(file.size) }}
          {{ file.status === 'success' ? '(已上传)' : '' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const uploadRef = ref()
const fileList = ref([])
const uploading = ref(false)

const handleRemove = (file: any, files: any[]) => {
  console.log('移除文件', file, files)
}

const handlePreview = (file: any) => {
  console.log('预览文件', file)
}

const handleChange = (file: any, files: any[]) => {
  fileList.value = files
}

const submitUpload = () => {
  if (fileList.value.length === 0) {
    alert('请先选择文件')
    return
  }
  
  uploading.value = true
  uploadRef.value.submit()
  
  // 模拟上传完成
  setTimeout(() => {
    uploading.value = false
    // 更新文件状态
    fileList.value = fileList.value.map(file => {
      return { ...file, status: 'success' }
    })
  }, 2000)
}

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return size + ' B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  }
}
</script>

<style lang="scss" scoped>
.manual-upload-demo {
  .file-status {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid var(--zx-border-color-light);
    border-radius: var(--zx-border-radius-base);
    
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .file-list {
      p {
        margin: 5px 0;
      }
    }
  }
}
</style>
```

## 照片墙

以照片墙的形式展示图片上传组件。

```vue
<template>
  <div class="photo-wall-demo">
    <zx-upload
      action="https://api.example.com/upload"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :limit="9"
      :on-exceed="handleExceed"
    >
      <div v-if="fileList.length < 9">
        <i class="zx-icon-plus"></i>
        <div class="zx-upload-text">上传图片</div>
      </div>
    </zx-upload>
    
    <zx-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="预览图片" />
    </zx-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  {
    name: 'image1.jpg',
    url: 'https://example.com/images/image1.jpg'
  },
  {
    name: 'image2.jpg',
    url: 'https://example.com/images/image2.jpg'
  }
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (file: any, fileList: any[]) => {
  console.log('移除图片', file, fileList)
}

const handlePreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleExceed = (files: any, fileList: any[]) => {
  console.warn(`当前限制选择 9 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}

const beforeUpload = (file: any) => {
  const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(file.name)
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isImage) {
    console.error('上传文件只能是图片格式!')
    return false
  }
  
  if (!isLt2M) {
    console.error('上传图片大小不能超过 2MB!')
    return false
  }
  
  return true
}
</script>

<style lang="scss" scoped>
.photo-wall-demo {
  .zx-upload-text {
    margin-top: 8px;
    font-size: 12px;
    color: var(--zx-text-color-secondary);
  }
}
</style>
```

## 大文件分片上传

实现大文件分片上传的示例。

```vue
<template>
  <div class="chunk-upload-demo">
    <zx-upload
      ref="uploadRef"
      action=""
      :auto-upload="false"
      :on-change="handleChange"
      :http-request="customUpload"
      :file-list="fileList"
      :show-file-list="false"
    >
      <zx-button type="primary">选择大文件</zx-button>
    </zx-upload>
    
    <div class="file-status" v-if="currentFile">
      <h3>文件信息</h3>
      <p>文件名: {{ currentFile.name }}</p>
      <p>文件大小: {{ formatFileSize(currentFile.size) }}</p>
      <p>分片数量: {{ chunks.length }}</p>
      
      <div class="progress-container">
        <zx-progress 
          :percentage="uploadProgress" 
          :status="uploadStatus"
        />
        <span>{{ uploadProgress }}%</span>
      </div>
      
      <div class="action-buttons">
        <zx-button
          type="success"
          @click="startUpload"
          :disabled="isUploading || uploadProgress === 100"
        >
          开始上传
        </zx-button>
        
        <zx-button
          type="danger"
          @click="cancelUpload"
          :disabled="!isUploading"
        >
          取消上传
        </zx-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const uploadRef = ref()
const fileList = ref([])
const currentFile = ref(null)
const chunks = ref([])
const uploadedChunks = ref(0)
const isUploading = ref(false)
const uploadStatus = ref('') // success / exception

// 计算上传进度
const uploadProgress = computed(() => {
  if (!chunks.value.length) return 0
  return Math.floor((uploadedChunks.value / chunks.value.length) * 100)
})

// 文件改变时的处理
const handleChange = (file: any) => {
  if (file.status === 'ready') {
    currentFile.value = file.raw
    prepareChunks(file.raw)
  }
}

// 准备文件分片
const prepareChunks = (file: File) => {
  const chunkSize = 1024 * 1024 * 2 // 2MB 每片
  const fileSize = file.size
  const chunkCount = Math.ceil(fileSize / chunkSize)
  const fileChunks = []
  
  for (let i = 0; i < chunkCount; i++) {
    const start = i * chunkSize
    const end = Math.min(fileSize, start + chunkSize)
    const chunk = file.slice(start, end)
    
    fileChunks.push({
      file: chunk,
      filename: file.name,
      chunkIndex: i,
      chunkCount: chunkCount
    })
  }
  
  chunks.value = fileChunks
  uploadedChunks.value = 0
  uploadStatus.value = ''
}

// 开始上传
const startUpload = () => {
  if (!currentFile.value || chunks.value.length === 0) return
  
  isUploading.value = true
  uploadStatus.value = ''
  
  // 模拟顺序上传分片
  uploadNextChunk()
}

// 上传下一个分片
const uploadNextChunk = () => {
  if (uploadedChunks.value >= chunks.value.length) {
    // 所有分片上传完成
    isUploading.value = false
    uploadStatus.value = 'success'
    console.log('所有分片上传完成')
    // 请求合并文件
    mergeFileChunks()
    return
  }
  
  const chunk = chunks.value[uploadedChunks.value]
  
  // 模拟分片上传
  console.log(`上传分片 ${uploadedChunks.value + 1}/${chunks.value.length}`)
  
  // 模拟网络延迟
  setTimeout(() => {
    uploadedChunks.value++
    uploadNextChunk()
  }, 500)
}

// 合并文件分片
const mergeFileChunks = () => {
  console.log('请求服务器合并文件分片')
  // 实际应用中会发送请求给服务器，通知服务器合并文件分片
}

// 取消上传
const cancelUpload = () => {
  isUploading.value = false
  uploadStatus.value = 'exception'
  console.log('取消上传')
}

// 自定义上传方法
const customUpload = (options: any) => {
  // 这里不执行实际上传，而是通过分片上传来处理
  return { abort: () => {} }
}

// 格式化文件大小
const formatFileSize = (size: number) => {
  if (size < 1024) {
    return size + ' B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  }
}
</script>

<style lang="scss" scoped>
.chunk-upload-demo {
  .file-status {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid var(--zx-border-color-light);
    border-radius: var(--zx-border-radius-base);
    
    h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }
    
    p {
      margin: 5px 0;
    }
    
    .progress-container {
      margin: 20px 0;
      display: flex;
      align-items: center;
      
      .zx-progress {
        margin-right: 10px;
        width: calc(100% - 50px);
      }
    }
    
    .action-buttons {
      margin-top: 20px;
      
      .zx-button {
        margin-right: 10px;
      }
    }
  }
}
</style>
```

## 头像上传

用户头像上传示例，实现裁剪功能。

```vue
<template>
  <div class="avatar-upload-demo">
    <zx-upload
      class="avatar-uploader"
      action="https://api.example.com/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="zx-icon-plus avatar-uploader-icon"></i>
    </zx-upload>
    
    <div class="upload-tip">
      <p>点击上传头像</p>
      <p>只能上传 JPG/PNG 格式图片，且不超过 2MB</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageUrl = ref('')

const handleAvatarSuccess = (response: any, file: any) => {
  // 实际应用中应该使用服务器返回的URL
  imageUrl.value = URL.createObjectURL(file.raw)
}

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isJPG && !isPNG) {
    console.error('上传头像图片只能是 JPG 或 PNG 格式!')
    return false
  }
  
  if (!isLt2M) {
    console.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  
  return true
}
</script>

<style lang="scss" scoped>
.avatar-upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .avatar-uploader {
    border: 1px dashed var(--zx-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color 0.3s;
    
    &:hover {
      border-color: var(--zx-primary-color);
    }
    
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
      object-fit: cover;
    }
    
    .avatar-uploader-icon {
      font-size: 28px;
      color: var(--zx-text-color-secondary);
    }
  }
  
  .upload-tip {
    margin-top: 10px;
    text-align: center;
    
    p {
      margin: 5px 0;
      font-size: 14px;
      color: var(--zx-text-color-secondary);
    }
  }
}
</style>
```

以上示例展示了 ZXUI CN 上传组件的各种用法和场景，包括基础上传、图片上传、拖拽上传、手动上传、照片墙、大文件分片上传以及头像上传。你可以根据实际需求选择合适的上传类型和功能。 