# vue-tree-view-table

> A table (with tree-grid) component for Vue.js 2.0. (Its style extends [vue-table-with-tree-grid](https://github.com/MisterTaki/vue-table-with-tree-grid))

## Installation

Use npm:

```shell
npm i vue-tree-view-table -S
```

Or use yarn:

```shell
yarn add vue-tree-view-table
```

## Usage

```javascript
import Vue from 'vue'
import SafeTreeview from 'vue-tree-view-table'

Vue.use(SafeTreeview)
```

Or

```javascript
import Vue from 'vue'
import SafeTreeview from 'vue-tree-view-table'

Vue.component(SafeTreeview.name, SafeTreeview)
```

### Table Attributes

| Atributo | Descripción | tipo | Parametro | Valor por defecto |
| ---- | ---- | ---- | ---- | ---- |
| data | datos a mostrar | Array | - | [] |
| empty-text | texto a mostrar cuando no tiene datos | String | - | 'Aun no hay datos' |
| columns | configuracion de las columnas de la tabla（ver abajo：Columns Configs） | Array | - | [] |
| show-header | si se muestra el encabezado | Boolean | - | true |
| show-index | si se muestra el indice de datos | Boolean | - | false |
| index-text | nombre del indice de datos | String | - | 'index' |
| show-summary | si se muestra el final total de la tabla | Boolean | - | false |
| sum-text | suma total de la primera fila  | String | - | 'total' |
| summary-method | Método de calculo de suma | Function | data, column, columnIndex | - |
| max-height | Tamaño maximo de la tabla | [String, Number] | - | 'auto' |
| stripe | si se muestra el color en intervalo de las filas | Boolean | - | false |
| border | si la tabla tiene bordes | Boolean | - | false |
| show-row-hover | si se colorea cuando pase el cursor por encima | Boolean | - | true |
| tree-type | si es tipo árbol o no | Boolean | - | false |
| children-prop | nombre de la propiedad que contiene los hijos | String | - | 'children' |
| is-fold | si se muestra plegado | Boolean | - | true |
| expand-type | 是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽), 它可以获取到 row, rowIndex) | Boolean | - | false |
| selection-type | 是否为多选类型表格 | Boolean | - | false |
| row-key | 行数据的 Key，用来优化 Table 的渲染 | Function | row, rowIndex | rowIndex |
| row-class-name | 额外的表格行的类名 | String, Function | row, rowIndex | - |
| cell-class-name | 额外的表格行的类名 | String, Function | row, rowIndex, column, columnIndex | - |
| row-style | 额外的表格行的样式 | Object, Function | row, rowIndex | - |
| cell-style | 额外的表格单元格的样式 | Object, Function | row, rowIndex, column, columnIndex | - |

### Columns Configs

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | 列标题名称 | String | '' |
| prop | 对应列内容的属性名 | String | '' |
| align | 对应列内容的对齐方式，可选值有 'center', 'right' | String | 'left' |
| headerAlign | 对应列标题的对齐方式，可选值有 'center', 'right' | String | 'left' |
| width | 列宽度 | [String, Number] | 'auto' |
| minWidth | 列最小宽度 | [String, Number] | '80px' |
| type | 列类型，可选值有 'template'(自定义列模板) | String | '' |
| template | 列类型为 'template'(自定义列模板) 时，对应的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽)（它可以获取到 row, rowIndex, column, columnIndex）名称 | String | '' |

### Table Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| cell-contextmenu | 在某一单元格上点击鼠标右键 | row, rowIndex, column, columnIndex, $event  |
| row-click | 单击某一行 | row, rowIndex, $event |
| row-contextmenu | 在某一行上点击鼠标右键 | row, rowIndex, $event |
| tree-icon-click | 鼠标单击树形icon | row, rowIndex, $event |
| expand-cell-click | 鼠标单击展开单元格 | row, rowIndex, $event |

### Table Methods

| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| getCheckedProp | 当表格为多选类型表格时，用于获取当前所选项的属性，返回一个数组；属性默认为'index'。 | prop |
