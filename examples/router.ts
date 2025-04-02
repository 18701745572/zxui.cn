import { createRouter, createWebHistory } from 'vue-router'
import Basic from './basic/index.vue'
import Theme from './theme/index.vue'
import Alert from './components/Alert.vue'
import Avatar from './components/Avatar.vue'
import Audio from './components/Audio.vue'
import Badge from './components/Badge.vue'
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Cascader from './components/Cascader.vue'
import Checkbox from './components/Checkbox.vue'
import ColorPicker from './components/ColorPicker.vue'
import Csv from './components/Csv.vue'
import DatePicker from './components/DatePicker.vue'
import DateTimePicker from './components/DateTimePicker.vue'
import Drawer from './components/Drawer.vue'
import Excel from './components/Excel.vue'
import Form from './components/Form.vue'
import Html from './components/Html.vue'
import Image from './components/Image.vue'
import Input from './components/Input.vue'
import InputNumber from './components/InputNumber.vue'
import Json from './components/Json.vue'
import Markdown from './components/Markdown.vue'
import Message from './components/Message.vue'
import Modal from './components/Modal.vue'
import Pdf from './components/Pdf.vue'
import PowerPoint from './components/PowerPoint.vue'
import Progress from './components/Progress.vue'
import Radio from './components/Radio.vue'
import Rate from './components/Rate.vue'
import Select from './components/Select.vue'
import Skeleton from './components/Skeleton.vue'
import Slider from './components/Slider.vue'
import Steps from './components/Steps.vue'
import Switch from './components/Switch.vue'
import Table from './components/Table.vue'
import Tabs from './components/Tabs.vue'
import Tag from './components/Tag.vue'
import TimePicker from './components/TimePicker.vue'
import Timeline from './components/Timeline.vue'
import Tooltip from './components/Tooltip.vue'
import Transfer from './components/Transfer.vue'
import Tree from './components/Tree.vue'
import Txt from './components/Txt.vue'
import Upload from './components/Upload.vue'
import Video from './components/Video.vue'
import Webview from './components/Webview.vue'
import Word from './components/Word.vue'
import Xml from './components/Xml.vue'
import Xlsx from './components/Xlsx.vue'
import Yaml from './components/Yaml.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/ds/basic'
    },
    {
      path: '/ds/basic',
      component: Basic,
      alias: '/'
    },
    {
      path: '/ds/theme',
      component: Theme
    },
    {
      path: '/ds/alert',
      component: Alert
    },
    {
      path: '/ds/avatar',
      component: Avatar
    },
    {
      path: '/ds/audio',
      component: Audio
    },
    {
      path: '/ds/badge',
      component: Badge
    },
    {
      path: '/ds/button',
      component: Button
    },
    {
      path: '/ds/card',
      component: Card
    },
    {
      path: '/ds/cascader',
      component: Cascader
    },
    {
      path: '/ds/checkbox',
      component: Checkbox
    },
    {
      path: '/ds/color-picker',
      component: ColorPicker
    },
    {
      path: '/ds/csv',
      component: Csv
    },
    {
      path: '/ds/date-picker',
      component: DatePicker
    },
    {
      path: '/ds/date-time-picker',
      component: DateTimePicker
    },
    {
      path: '/ds/drawer',
      component: Drawer
    },
    {
      path: '/ds/excel',
      component: Excel
    },
    {
      path: '/ds/form',
      component: Form
    },
    {
      path: '/ds/html',
      component: Html
    },
    {
      path: '/ds/image',
      component: Image
    },
    {
      path: '/ds/input',
      component: Input
    },
    {
      path: '/ds/input-number',
      component: InputNumber
    },
    {
      path: '/ds/json',
      component: Json
    },
    {
      path: '/ds/markdown',
      component: Markdown
    },
    {
      path: '/ds/message',
      component: Message
    },
    {
      path: '/ds/modal',
      component: Modal
    },
    {
      path: '/ds/pdf',
      component: Pdf
    },
    {
      path: '/ds/power-point',
      component: PowerPoint
    },
    {
      path: '/ds/progress',
      component: Progress
    },
    {
      path: '/ds/radio',
      component: Radio
    },
    {
      path: '/ds/rate',
      component: Rate
    },
    {
      path: '/ds/select',
      component: Select
    },
    {
      path: '/ds/skeleton',
      component: Skeleton
    },
    {
      path: '/ds/slider',
      component: Slider
    },
    {
      path: '/ds/steps',
      component: Steps
    },
    {
      path: '/ds/switch',
      component: Switch
    },
    {
      path: '/ds/table',
      component: Table
    },
    {
      path: '/ds/tabs',
      component: Tabs
    },
    {
      path: '/ds/tag',
      component: Tag
    },
    {
      path: '/ds/time-picker',
      component: TimePicker
    },
    {
      path: '/ds/timeline',
      component: Timeline
    },
    {
      path: '/ds/tooltip',
      component: Tooltip
    },
    {
      path: '/ds/transfer',
      component: Transfer
    },
    {
      path: '/ds/tree',
      component: Tree
    },
    {
      path: '/ds/txt',
      component: Txt
    },
    {
      path: '/ds/upload',
      component: Upload
    },
    {
      path: '/ds/video',
      component: Video
    },
    {
      path: '/ds/webview',
      component: Webview
    },
    {
      path: '/ds/word',
      component: Word
    },
    {
      path: '/ds/xml',
      component: Xml
    },
    {
      path: '/ds/xlsx',
      component: Xlsx
    },
    {
      path: '/ds/yaml',
      component: Yaml
    }
  ]
})

export default router 