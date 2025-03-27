import { App } from 'vue'
import Table from './Table.vue'
import TableColumn from './TableColumn.vue'

Table.install = (app: App) => {
  app.component('ZxTable', Table)
  app.component('ZxTableColumn', TableColumn)
}

export default Table
export { TableColumn } 