# 文件预览

文件预览功能允许用户在网页中直接查看各种类型的文件，无需下载到本地。ZXUI CN 提供了多种文件预览组件，支持常见文档、图片和媒体文件的预览。

## 文档预览

支持常见文档格式的预览，包括 PDF、Word、Excel、PowerPoint 等。

```vue
<template>
  <div class="document-preview-demo">
    <zx-card title="文档预览">
      <div class="file-selector">
        <zx-radio-group v-model="selectedDocument" @change="handleDocChange">
          <zx-radio-button label="pdf">PDF 文档</zx-radio-button>
          <zx-radio-button label="word">Word 文档</zx-radio-button>
          <zx-radio-button label="excel">Excel 文档</zx-radio-button>
          <zx-radio-button label="ppt">PowerPoint 文档</zx-radio-button>
        </zx-radio-group>
      </div>
      
      <div class="preview-container">
        <!-- PDF 预览 -->
        <zx-pdf-preview
          v-if="selectedDocument === 'pdf'"
          :src="documentUrls.pdf"
          :page-number="currentPage"
          @page-change="handlePageChange"
        />
        
        <!-- Word 预览 -->
        <zx-word-preview
          v-if="selectedDocument === 'word'"
          :src="documentUrls.word"
          :loading="loading"
        />
        
        <!-- Excel 预览 -->
        <zx-excel-preview
          v-if="selectedDocument === 'excel'"
          :src="documentUrls.excel"
          :loading="loading"
        />
        
        <!-- PowerPoint 预览 -->
        <zx-powerpoint-preview
          v-if="selectedDocument === 'ppt'"
          :src="documentUrls.ppt"
          :loading="loading"
        />
      </div>
      
      <!-- PDF 分页控制 -->
      <div class="pagination-controls" v-if="selectedDocument === 'pdf' && totalPages > 0">
        <zx-space>
          <zx-button 
            icon="arrow-left" 
            :disabled="currentPage <= 1"
            @click="prevPage"
          >
            上一页
          </zx-button>
          <div class="page-info">{{ currentPage }} / {{ totalPages }}</div>
          <zx-button 
            icon="arrow-right" 
            icon-position="right"
            :disabled="currentPage >= totalPages"
            @click="nextPage"
          >
            下一页
          </zx-button>
          <zx-button type="primary" @click="downloadFile">下载文件</zx-button>
        </zx-space>
      </div>
      
      <!-- 其他文档的控制 -->
      <div class="action-controls" v-if="selectedDocument !== 'pdf'">
        <zx-button type="primary" @click="downloadFile">下载文件</zx-button>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDocument = ref('pdf')
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(10) // 假设PDF有10页

const documentUrls = {
  pdf: 'https://example.com/sample-document.pdf',
  word: 'https://example.com/sample-document.docx',
  excel: 'https://example.com/sample-document.xlsx',
  ppt: 'https://example.com/sample-document.pptx'
}

const handleDocChange = () => {
  loading.value = true
  
  // 模拟加载过程
  setTimeout(() => {
    loading.value = false
  }, 1000)
  
  if (selectedDocument.value === 'pdf') {
    currentPage.value = 1
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const downloadFile = () => {
  const url = documentUrls[selectedDocument.value]
  
  // 创建一个隐藏的a标签
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.download = `sample-document.${selectedDocument.value}`
  
  // 触发点击事件下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style lang="scss" scoped>
.document-preview-demo {
  .file-selector {
    margin-bottom: 20px;
  }
  
  .preview-container {
    height: 500px;
    overflow: auto;
    border: 1px solid var(--zx-border-color-light);
    background-color: var(--zx-background-color-light);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pagination-controls, .action-controls {
    display: flex;
    justify-content: center;
    
    .page-info {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
  }
  
  // PDF 预览样式
  :deep(.zx-pdf-preview) {
    height: 100%;
    width: 100%;
  }
  
  // Word 预览样式
  :deep(.zx-word-preview) {
    height: 100%;
    width: 100%;
  }
  
  // Excel 预览样式
  :deep(.zx-excel-preview) {
    height: 100%;
    width: 100%;
  }
  
  // PowerPoint 预览样式
  :deep(.zx-powerpoint-preview) {
    height: 100%;
    width: 100%;
  }
}
</style>
```

## 图片预览

支持多种图片格式的预览，包括 JPEG、PNG、GIF、SVG 等，带有缩放、旋转等功能。

```vue
<template>
  <div class="image-preview-demo">
    <zx-card title="图片预览">
      <div class="image-gallery">
        <div 
          v-for="(image, index) in images"
          :key="index"
          class="image-item"
          @click="previewImage(index)"
        >
          <div class="image-container">
            <img :src="image.thumbnail" :alt="image.name" />
          </div>
          <div class="image-name">{{ image.name }}</div>
        </div>
      </div>
      
      <zx-image-preview
        v-model:visible="previewVisible"
        :initial-index="currentImageIndex"
        :images="images.map(img => img.url)"
        :on-close="handleClose"
        :zoom-rate="1.2"
      />
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const previewVisible = ref(false)
const currentImageIndex = ref(0)

// 假设的图片数据
const images = [
  {
    name: '风景图片 1',
    thumbnail: 'https://example.com/thumbnails/landscape-1.jpg',
    url: 'https://example.com/images/landscape-1.jpg'
  },
  {
    name: '风景图片 2',
    thumbnail: 'https://example.com/thumbnails/landscape-2.jpg',
    url: 'https://example.com/images/landscape-2.jpg'
  },
  {
    name: '城市图片 1',
    thumbnail: 'https://example.com/thumbnails/city-1.jpg',
    url: 'https://example.com/images/city-1.jpg'
  },
  {
    name: '城市图片 2',
    thumbnail: 'https://example.com/thumbnails/city-2.jpg',
    url: 'https://example.com/images/city-2.jpg'
  },
  {
    name: '自然图片 1',
    thumbnail: 'https://example.com/thumbnails/nature-1.jpg',
    url: 'https://example.com/images/nature-1.jpg'
  },
  {
    name: '自然图片 2',
    thumbnail: 'https://example.com/thumbnails/nature-2.jpg',
    url: 'https://example.com/images/nature-2.jpg'
  }
]

const previewImage = (index: number) => {
  currentImageIndex.value = index
  previewVisible.value = true
}

const handleClose = () => {
  previewVisible.value = false
}
</script>

<style lang="scss" scoped>
.image-preview-demo {
  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    
    .image-item {
      cursor: pointer;
      border-radius: var(--zx-border-radius-base);
      overflow: hidden;
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      .image-container {
        height: 150px;
        overflow: hidden;
        border: 1px solid var(--zx-border-color-light);
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
      }
      
      .image-name {
        padding: 8px 0;
        text-align: center;
        font-size: 14px;
        color: var(--zx-text-color-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
```

## 视频预览

视频播放器组件，支持常见的视频格式，带有播放控制、全屏等功能。

```vue
<template>
  <div class="video-preview-demo">
    <zx-card title="视频预览">
      <div class="video-selector">
        <zx-tabs v-model="activeTab">
          <zx-tab-pane name="local" label="本地视频">
            <div class="local-video">
              <zx-video-player
                :src="localVideoUrl"
                :poster="localVideoPoster"
                :title="localVideoTitle"
                :autoplay="false"
                :controls="true"
              />
              
              <div class="video-info">
                <h3>{{ localVideoTitle }}</h3>
                <p>{{ localVideoDescription }}</p>
              </div>
            </div>
          </zx-tab-pane>
          
          <zx-tab-pane name="online" label="在线视频">
            <div class="online-videos">
              <div class="video-list">
                <div 
                  v-for="(video, index) in onlineVideos"
                  :key="index"
                  class="video-item"
                  :class="{ active: currentVideo === index }"
                  @click="playVideo(index)"
                >
                  <div class="video-thumbnail">
                    <img :src="video.thumbnail" :alt="video.title" />
                    <div class="play-icon">
                      <zx-icon name="play" />
                    </div>
                  </div>
                  <div class="video-title">{{ video.title }}</div>
                  <div class="video-duration">{{ video.duration }}</div>
                </div>
              </div>
              
              <div class="video-player">
                <zx-video-player
                  v-if="onlineVideos.length > 0"
                  :src="onlineVideos[currentVideo].url"
                  :poster="onlineVideos[currentVideo].thumbnail"
                  :title="onlineVideos[currentVideo].title"
                  :autoplay="false"
                  :controls="true"
                />
                
                <div class="video-info">
                  <h3>{{ onlineVideos[currentVideo]?.title }}</h3>
                  <p>{{ onlineVideos[currentVideo]?.description }}</p>
                </div>
              </div>
            </div>
          </zx-tab-pane>
          
          <zx-tab-pane name="live" label="直播流">
            <div class="live-stream">
              <zx-video-player
                :src="liveStreamUrl"
                :poster="liveStreamPoster"
                :title="liveStreamTitle"
                :autoplay="true"
                :controls="true"
                :live="true"
              />
              
              <div class="video-info">
                <div class="live-header">
                  <h3>{{ liveStreamTitle }}</h3>
                  <zx-tag type="danger">直播中</zx-tag>
                </div>
                <p>{{ liveStreamDescription }}</p>
                <div class="live-stats">
                  <span>观看人数: {{ liveViewers }}</span>
                  <span>开始时间: {{ liveStartTime }}</span>
                </div>
              </div>
            </div>
          </zx-tab-pane>
        </zx-tabs>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('local')
const currentVideo = ref(0)

// 本地视频数据
const localVideoUrl = 'https://example.com/videos/local-video.mp4'
const localVideoPoster = 'https://example.com/thumbnails/local-video.jpg'
const localVideoTitle = '产品演示视频'
const localVideoDescription = '这是一个展示我们产品功能和特性的详细演示视频。通过观看本视频，您可以全面了解产品的使用方法和优势。'

// 在线视频数据
const onlineVideos = [
  {
    title: '如何使用 ZXUI 组件库',
    description: '本视频详细介绍了如何在你的项目中集成和使用 ZXUI 组件库，包括安装、配置和基本用法。',
    url: 'https://example.com/videos/tutorial-1.mp4',
    thumbnail: 'https://example.com/thumbnails/tutorial-1.jpg',
    duration: '15:20'
  },
  {
    title: 'ZXUI 高级组件使用指南',
    description: '深入探讨 ZXUI 中的高级组件，如何在复杂场景中灵活运用这些组件，实现更强大的功能。',
    url: 'https://example.com/videos/tutorial-2.mp4',
    thumbnail: 'https://example.com/thumbnails/tutorial-2.jpg',
    duration: '23:45'
  },
  {
    title: '响应式布局最佳实践',
    description: '学习如何使用 ZXUI 的布局组件，轻松创建响应式界面，适应不同屏幕尺寸。',
    url: 'https://example.com/videos/tutorial-3.mp4',
    thumbnail: 'https://example.com/thumbnails/tutorial-3.jpg',
    duration: '18:30'
  },
  {
    title: '主题定制与样式覆盖',
    description: '详细讲解如何根据品牌需求定制 ZXUI 的主题，覆盖默认样式，打造独特的视觉体验。',
    url: 'https://example.com/videos/tutorial-4.mp4',
    thumbnail: 'https://example.com/thumbnails/tutorial-4.jpg',
    duration: '20:15'
  }
]

// 直播流数据
const liveStreamUrl = 'https://example.com/live/stream.m3u8'
const liveStreamPoster = 'https://example.com/thumbnails/live-stream.jpg'
const liveStreamTitle = '技术大会直播'
const liveStreamDescription = '正在直播最新的技术大会，包括前沿技术分享、产品发布和专家问答环节。'
const liveViewers = '3,245'
const liveStartTime = '2023-09-15 09:00'

const playVideo = (index: number) => {
  currentVideo.value = index
}
</script>

<style lang="scss" scoped>
.video-preview-demo {
  .video-selector {
    .local-video {
      margin-top: 20px;
      
      .video-info {
        margin-top: 15px;
        
        h3 {
          margin-bottom: 10px;
        }
      }
    }
    
    .online-videos {
      margin-top: 20px;
      display: flex;
      gap: 20px;
      
      .video-list {
        width: 300px;
        overflow-y: auto;
        max-height: 500px;
        
        .video-item {
          margin-bottom: 15px;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: var(--zx-border-radius-base);
          overflow: hidden;
          
          &.active, &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          }
          
          .video-thumbnail {
            position: relative;
            height: 150px;
            overflow: hidden;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .play-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0.8;
              transition: opacity 0.3s;
              
              i {
                font-size: 24px;
                color: white;
              }
            }
            
            &:hover .play-icon {
              opacity: 1;
            }
          }
          
          .video-title {
            padding: 10px;
            font-weight: bold;
          }
          
          .video-duration {
            padding: 0 10px 10px;
            font-size: 12px;
            color: var(--zx-text-color-secondary);
          }
        }
      }
      
      .video-player {
        flex: 1;
        
        .video-info {
          margin-top: 15px;
          
          h3 {
            margin-bottom: 10px;
          }
        }
      }
    }
    
    .live-stream {
      margin-top: 20px;
      
      .video-info {
        margin-top: 15px;
        
        .live-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          
          h3 {
            margin-right: 10px;
            margin-bottom: 0;
          }
        }
        
        .live-stats {
          margin-top: 15px;
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: var(--zx-text-color-secondary);
        }
      }
    }
  }
  
  // 视频播放器样式
  :deep(.zx-video-player) {
    width: 100%;
    height: 400px;
    background-color: #000;
  }
}
</style>
```

## 音频预览

音频播放器组件，支持 MP3、WAV、OGG 等常见格式，带有波形显示、播放控制等功能。

```vue
<template>
  <div class="audio-preview-demo">
    <zx-card title="音频预览">
      <div class="audio-list">
        <div 
          v-for="(audio, index) in audioTracks"
          :key="index"
          class="audio-item"
          :class="{ active: currentTrack === index }"
          @click="playTrack(index)"
        >
          <div class="audio-cover">
            <img :src="audio.cover" :alt="audio.title" />
            <div class="play-status">
              <zx-icon 
                :name="currentTrack === index && isPlaying ? 'pause' : 'play'" 
                size="24"
              />
            </div>
          </div>
          <div class="audio-info">
            <div class="audio-title">{{ audio.title }}</div>
            <div class="audio-artist">{{ audio.artist }}</div>
          </div>
          <div class="audio-duration">{{ audio.duration }}</div>
        </div>
      </div>
      
      <div class="audio-player" v-if="audioTracks.length > 0">
        <zx-audio-player
          ref="audioPlayer"
          :src="audioTracks[currentTrack].url"
          :title="audioTracks[currentTrack].title"
          :artist="audioTracks[currentTrack].artist"
          :cover="audioTracks[currentTrack].cover"
          :show-playlist="false"
          @play="onPlay"
          @pause="onPause"
          @ended="onEnded"
        />
        
        <div class="player-controls">
          <zx-button 
            icon="step-backward" 
            circle 
            @click="prevTrack"
            :disabled="currentTrack <= 0"
          />
          <zx-button 
            :icon="isPlaying ? 'pause' : 'play'" 
            circle 
            type="primary"
            @click="togglePlay"
          />
          <zx-button 
            icon="step-forward" 
            circle 
            @click="nextTrack"
            :disabled="currentTrack >= audioTracks.length - 1"
          />
        </div>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioPlayer = ref(null)
const currentTrack = ref(0)
const isPlaying = ref(false)

// 音频数据
const audioTracks = [
  {
    title: '春天的旋律',
    artist: '自然音乐',
    cover: 'https://example.com/covers/spring-melody.jpg',
    url: 'https://example.com/audio/spring-melody.mp3',
    duration: '3:45'
  },
  {
    title: '雨中漫步',
    artist: '环境音效',
    cover: 'https://example.com/covers/walking-in-rain.jpg',
    url: 'https://example.com/audio/walking-in-rain.mp3',
    duration: '4:20'
  },
  {
    title: '夏日微风',
    artist: '自然音乐',
    cover: 'https://example.com/covers/summer-breeze.jpg',
    url: 'https://example.com/audio/summer-breeze.mp3',
    duration: '2:55'
  },
  {
    title: '森林之声',
    artist: '环境音效',
    cover: 'https://example.com/covers/forest-sounds.jpg',
    url: 'https://example.com/audio/forest-sounds.mp3',
    duration: '5:10'
  },
  {
    title: '海浪轻抚',
    artist: '自然音乐',
    cover: 'https://example.com/covers/ocean-waves.jpg',
    url: 'https://example.com/audio/ocean-waves.mp3',
    duration: '4:35'
  }
]

const playTrack = (index: number) => {
  if (currentTrack.value === index) {
    togglePlay()
  } else {
    currentTrack.value = index
    setTimeout(() => {
      if (audioPlayer.value) {
        audioPlayer.value.play()
      }
    }, 0)
  }
}

const togglePlay = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
    }
  }
}

const prevTrack = () => {
  if (currentTrack.value > 0) {
    currentTrack.value--
    setTimeout(() => {
      if (audioPlayer.value) {
        audioPlayer.value.play()
      }
    }, 0)
  }
}

const nextTrack = () => {
  if (currentTrack.value < audioTracks.length - 1) {
    currentTrack.value++
    setTimeout(() => {
      if (audioPlayer.value) {
        audioPlayer.value.play()
      }
    }, 0)
  }
}

const onPlay = () => {
  isPlaying.value = true
}

const onPause = () => {
  isPlaying.value = false
}

const onEnded = () => {
  if (currentTrack.value < audioTracks.length - 1) {
    nextTrack()
  } else {
    isPlaying.value = false
  }
}
</script>

<style lang="scss" scoped>
.audio-preview-demo {
  .audio-list {
    margin-bottom: 30px;
    
    .audio-item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      border-radius: var(--zx-border-radius-base);
      transition: background-color 0.3s;
      
      &:hover, &.active {
        background-color: var(--zx-background-color-light);
      }
      
      .audio-cover {
        width: 60px;
        height: 60px;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .play-status {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          
          i {
            color: white;
          }
        }
        
        &:hover .play-status {
          opacity: 1;
        }
      }
      
      &.active .audio-cover .play-status {
        opacity: 1;
      }
      
      .audio-info {
        flex: 1;
        margin-left: 15px;
        
        .audio-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .audio-artist {
          font-size: 14px;
          color: var(--zx-text-color-secondary);
        }
      }
      
      .audio-duration {
        color: var(--zx-text-color-secondary);
        font-size: 14px;
      }
    }
  }
  
  .audio-player {
    .player-controls {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }
  }
  
  // 音频播放器样式
  :deep(.zx-audio-player) {
    width: 100%;
  }
}
</style>
```

以上示例展示了 ZXUI CN 文件预览组件的各种用法和场景，包括文档预览、图片预览、视频预览以及音频预览。这些组件能够满足各种文件预览需求，提升用户体验。 