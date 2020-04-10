<template>
  <!--
  <vk-datatable
      :columns="columns"
      :rows="data"
      :per_page="5"
      :actions="actions"
      v-on:row_click="rowClick"
      v-on:row_delete="rowDelete"
      v-on:row_edit="rowEdit"
      defaultSort="" // the default column to sort by
      loadingPropData="" // boolean to show table loader
      selectableRows="" // multiple rows can be selected
      v-on:rowsSelected="" // callback for when a row is selected
      >
  </vk-datatable>
  -->

    <vk-datatable
      :columns="columns"
      :rows="rows"
      :per_page="rowsPerPage"
      :defaultSort="defaultSort"
      :loadingPropData="loadingPropData"
      :selectableRows="selectableRows"
      >
  </vk-datatable>


</template>


<script>

  import VuiKitDatatable from 'vuikit-datatable'
  import Vue from 'vue'
  Vue.component('vk-datatable', VuiKitDatatable)

  export default {
    name: 'TableComponent',
    data() {
      return {
          columns: [
              {
                title: 'Name', // The title of the column
                field: 'name', // the field name in the data array\
                hidden: false , // hide this field
                search: true,  // is field searchable
                filter: true , // is filtererable
                sortable: true,  // field is sortable
                type: '', // field type, see bellow for options
                smallField: true, // if true will add uk-table-shrink to the column
              },
          ],
          rows: [
            {name:'logan'},
            {name: 'tariq'}
          ],
          rowsPerPage: 5,
          defaultSort: 'name',
          loadingPropData: false,
          selectableRows: true
        }
    }
  }

/*
          // input format for column
          columns: [
              {
                title: '', // The title of the column
                field: '', // the field name in the data array\
                hidden: true|false , // hide this field
                search: true|false,  // is field searchable
                filter: true|false , // is filtererable
                sortable: true|false,  // field is sortable
                type: '', // field type, see bellow for options
                prefix:'', // text before the value in the cell
                suffix: '' // text after the value in the cell
                inputsettings: {} // takes values used for number and text input fields,
                onchange: function (row) {}, // callback for input field value changes
                smallField: true|false // if true will add uk-table-shrink to the column
              },
          ],
          // input format for data
          data: [],
          // define actions for row
          actions: [
              {title: 'Edit Post', event: 'edit', icon: 'pencil'}, // creates an row_edit event
              {title: 'Delete Post', event: 'delete', icon: 'trash'}, // creates an row_delete event
          ],

Available column types are
VALUE   Description
''  Text only field
'array_implode'   Imploded array of values comma seperated
'date_diff'   uses moment differece for humans to return the difference between the given data and today
'number'  numeric field used for sorting
'boolean'   Turns a true or false value into a yes or no
'image_url'   Shows a 30x30px thumbnail
'string_array'  Outputs an array of strings with each value on a new line
'textinput'   Shows a text input and calls a callback on value change. available settings (placeholder)
'numberinput'   Shows a numer input and calls a callback on value change. available settings (placeholder, min, max)

*/


</script>