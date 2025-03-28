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
      redirect: '/basic'
    },
    {
      path: '/basic',
      component: Basic
    },
    {
      path: '/theme',
      component: Theme
    },
    {
      path: '/alert',
      component: Alert
    },
    {
      path: '/avatar',
      component: Avatar
    },
    {
      path: '/audio',
      component: Audio
    },
    {
      path: '/badge',
      component: Badge
    },
    {
      path: '/button',
      component: Button
    },
    {
      path: '/card',
      component: Card
    },
    {
      path: '/cascader',
      component: Cascader
    },
    {
      path: '/checkbox',
      component: Checkbox
    },
    {
      path: '/color-picker',
      component: ColorPicker
    },
    {
      path: '/csv',
      component: Csv
    },
    {
      path: '/date-picker',
      component: DatePicker
    },
    {
      path: '/date-time-picker',
      component: DateTimePicker
    },
    {
      path: '/drawer',
      component: Drawer
    },
    {
      path: '/excel',
      component: Excel
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/html',
      component: Html
    },
    {
      path: '/image',
      component: Image
    },
    {
      path: '/input',
      component: Input
    },
    {
      path: '/input-number',
      component: InputNumber
    },
    {
      path: '/json',
      component: Json
    },
    {
      path: '/markdown',
      component: Markdown
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/modal',
      component: Modal
    },
    {
      path: '/pdf',
      component: Pdf
    },
    {
      path: '/power-point',
      component: PowerPoint
    },
    {
      path: '/progress',
      component: Progress
    },
    {
      path: '/radio',
      component: Radio
    },
    {
      path: '/rate',
      component: Rate
    },
    {
      path: '/select',
      component: Select
    },
    {
      path: '/skeleton',
      component: Skeleton
    },
    {
      path: '/slider',
      component: Slider
    },
    {
      path: '/steps',
      component: Steps
    },
    {
      path: '/switch',
      component: Switch
    },
    {
      path: '/table',
      component: Table
    },
    {
      path: '/tabs',
      component: Tabs
    },
    {
      path: '/tag',
      component: Tag
    },
    {
      path: '/time-picker',
      component: TimePicker
    },
    {
      path: '/timeline',
      component: Timeline
    },
    {
      path: '/tooltip',
      component: Tooltip
    },
    {
      path: '/transfer',
      component: Transfer
    },
    {
      path: '/tree',
      component: Tree
    },
    {
      path: '/txt',
      component: Txt
    },
    {
      path: '/upload',
      component: Upload
    },
    {
      path: '/video',
      component: Video
    },
    {
      path: '/webview',
      component: Webview
    },
    {
      path: '/word',
      component: Word
    },
    {
      path: '/xml',
      component: Xml
    },
    {
      path: '/xlsx',
      component: Xlsx
    },
    {
      path: '/yaml',
      component: Yaml
    }
  ]
})

export default router 