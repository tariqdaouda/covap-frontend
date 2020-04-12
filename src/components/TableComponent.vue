<template>

  <div>
    
    <!-- Column visibility button + modal-->
    <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">Hide/Show Columns</button>
    <div id="modal-example" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Visible Columns:</h2>
            <ul>
              <li v-for="column in columns"  v-bind:key="column">
                <!--There is a bug here checkbox should be checked by default as hidden is set to false-->
                <input type="checkbox" v-model="column.hidden" ><label>{{column.title}}</label> 
              </li>
            </ul>
            <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Exit</button>
            </p>
        </div>
    </div>

    <!--Export table to CSV-->
    <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">Export to CSV</button>
    
    <!--Data Table-->
    <!--
    columns are being retrieved from config file at '@/assets/config/tableColumnsConfig.js'
    rows is the json data returned by the api
    per_page is binded to rowsPerPage that is the selected value of the combobox above
    -->
    <vk-datatable
        :columns="columns"
        :rows="rows"
        :per_page="rowsPerPage"
        defaultSort="Peptides.Score"
        >
    </vk-datatable>

    <!--Pagination-->
    <!--
      With the cursor batch query we can't know the amount of pages that may be returned
      The only way to get this information would be to do query sorted without limit args and returns 
      all rows associated in a range like 0-500 for page 1 and so on...
    -->
    <div>
      <ul class="uk-pagination" uk-margin>
          <li><a href="#"><span uk-pagination-previous></span></a></li>
          <li v-for="page in pageCount" v-bind:key="page" v-bind:class="{ 'uk-active': page === currentPage }"><a href="#">{{page}}</a></li>
          <li><a href="#"><span uk-pagination-next></span></a></li>
      </ul>

      <div>
          Rows per page: <multiselect v-model="selectedRowPerPageValue" :options="rowsPerPageOptions" @change="updateSelectedRowPerPageValue"></multiselect>       
      </div>
      {{getDataTableRange}}

    </div>

  </div>
</template>


<script>
  import config from '@/assets/config/tableConfig.js'
  import Multiselect from 'vue-multiselect'
  import VuiKitDatatable from 'vuikit-datatable'
  import Vue from 'vue'

  Vue.component('vk-datatable', VuiKitDatatable)
  Vue.component('Multiselect', Multiselect)

  export default {
    name: 'TableComponent',
    data() {
      return {
          // pagination
          pageCount: 1,
          currentPage: 1,
          selectedRowPerPageValue: 0,
          rowsPerPageOptions: [],
          // table props
          columns: [],
          rows: [],
          rowsPerPage: 5,
          loadingPropData: false,
          selectableRows: true
        }
    },
    computed: {
      getDataTableRange: function () {
        let lowerRange = (this.pageCount - 1) * this.selectedRowPerPageValue;
        let higherRange = lowerRange + this.selectedRowPerPageValue;
        return [lowerRange, higherRange]
      }
    },
    methods: {
      updateSelectedRowPerPageValue: function() {
        console.log('updateSelectedRowPerPageValue', this.selectedRowPerPageValue);
      }
    },
    mounted: function() {
      this.columns = config.tableColumnsConfig;
      this.rowsPerPageOptions = config.tableRowPerPageConfig;
      this.selectedRowPerPageValue = config.tableRowPerPageConfig[0];
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

/*

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

