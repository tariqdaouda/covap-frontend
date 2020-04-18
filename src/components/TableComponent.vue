<template>
  <div class="uk-text-center uk-margin-auto">

    <div>
      <!-- options buttons-->
      <!-- Column visibility button + modal-->
      <button class="uk-button uk-button-default uk-margin-small-right uk-button-primary" type="button" uk-toggle="target: #modal-columnOptions">Hide/Show Columns</button>
      <div id="modal-columnOptions" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <h5 class="uk-modal-header">Visible Columns:</h5>
          <ul class="uk-text-center">
            <li v-for="(column, index) in tableColumnsConfig" v-bind:key="index" id="index" style="list-style-type: none;">
              <input type="checkbox" v-model="column.visible" ><label>{{column.title}}</label> 
            </li>
          </ul>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Exit</button>
          </p>
        </div>
      </div>

      <!--Export table-->
      <button class="uk-button uk-button-default uk-margin-small-right uk-button-primary" type="button" v-on:click="downloadCSV()">Export Table To CSV</button>
    </div>

    <!--Max Row warning-->
    <div class="uk-alert-warning" uk-alert v-show="rows.length === maxRows">
        <p>
          <span uk-icon="warning"></span>
          Your query was too broad and has been capped to {{maxRows}} results.
        </p>
    </div>


    <!--Data Table-->
    <div class="uk-row uk-flex-center">
      <table class="uk-table uk-overflow-container">
        <thead>
          <tr>
            <th v-for="column in columns" v-bind:key="column.title" class="uk-text-center" v-on:click="sortTable(column)">
              {{column.title}}
              <span uk-icon="icon: triangle-down;" v-show=" column.sortable && column.title == sortColumn && sortOrder === 'descending'"></span>
              <span uk-icon="icon: triangle-up;" v-show="column.sortable && column.title == sortColumn && sortOrder === 'ascending'"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in dataTableRange" v-bind:key="index">
            <td v-for="column in columns" v-bind:key="column.field">
              {{row[column.field]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <!--Pagination-->
    <div class="uk-flex-center">
      <ul class="uk-pagination uk-flex-center" uk-margin>
        <!--Previous-->
        <li>
          <a @click="updateSelectedPage(currentPage-1)" v-bind:class="{ 'uk-disabled': currentPage === 1 }">
            <span uk-pagination-previous></span>
          </a>
        </li>

        <li class="uk-disabled" v-show="currentPage - maxDisplayedPages/2 > 1"><span>...</span></li>

        <!--Pages-->
        <li v-for="idx in paginationList" v-bind:key="idx"  >
          <a @click="updateSelectedPage(idx+1)" v-bind:class="{ 'uk-text-bolder': idx+1 === currentPage , 'uk-text-primary': idx+1 === currentPage}">
            {{idx+1}}
          </a>
        </li>

        <li class="uk-disabled"  v-show="currentPage + maxDisplayedPages/2 < pageCount"><span>...</span></li>

        <!--Next-->
        <li>
          <a @click="updateSelectedPage(currentPage+1)" v-bind:class="{ 'uk-disabled': currentPage === pageCount }">
            <span uk-pagination-next></span>
          </a>
        </li>
      </ul>

      <div class="uk-row">
        <p>
          Rows Per Page:
          <span>
            <multiselect 
              v-model="selectedRowPerPageValue"
              :options="rowsPerPageOptions">
            </multiselect>
          </span>
        </p>
      </div>     
    </div>
  </div>
</template>


<script>
  import config from '@/assets/config/tableConfig.js'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'TableComponent',
    components: {
      Multiselect
    },
    props: ['datas'],
    data() {
      return {

          // original column order
          tableColumnsConfig: null,
          rows: this.datas,

          // pagination
          currentPage: null,
          selectedRowPerPageValue: null,
          rowsPerPageOptions: [],
          maxRows: null,
          maxDisplayedPages: null, // pagination

          // sort
          sortColumn: null,
          sortOrder: null
        }
    },
    computed: {
      columns: function() {
        return this.tableColumnsConfig ? this.tableColumnsConfig.filter( function(elt) { return elt.visible }) : [];
      },
      pageCount: function(){
        return Math.ceil(this.rows.length/this.selectedRowPerPageValue);
      },
      paginationList: function () {
        let lowEnd = this.currentPage - this.maxDisplayedPages/2 > 0 ? Math.floor(this.currentPage - this.maxDisplayedPages/2) - 1 : 0;
        let highEnd = this.currentPage + this.maxDisplayedPages/2 < this.pageCount ? Math.ceil(this.currentPage + this.maxDisplayedPages/2) : this.pageCount;
        
        var list = [];
        for (var i = lowEnd; i < highEnd; i++) {
            list.push(i);
        }

        return list;
      },
      dataTableRange: function () {
        let lowerRange = (this.currentPage - 1) * this.selectedRowPerPageValue;
        let higherRange = lowerRange + this.selectedRowPerPageValue;
        return this.rows.slice(lowerRange, higherRange)
      }
    },
    methods: {
      updateSelectedPage: function(index) {
        if (index != 0 &&  index != this.pageCount + 1) {
          this.currentPage = index;
        }
      },
      sortTable: function(column) {
        // reverse sort order if column is already
        // the sort column else sort normaly
        if (column.sortable === false) {
          return 0
        } else if (this.sortColumn === column.title) {
          this.sortOrder = this.sortOrder === "descending" ? "ascending" : "descending";
        } else {
          this.sortOrder = "descending";
          this.sortColumn = column.title;
        }

        // sort rows
        var sortOrder = this.sortOrder;
        this.rows.sort(function(a, b) {
            if (a[column.field] > b[column.field]) {
              return sortOrder === "ascending" ? 1 : -1
            } else if (a[column.field] < b[column.field]) {
              return sortOrder === "ascending" ? -1 : 1
            }
            return 0;
          }
        )

        // dirty swap
        let a = this.rows;
        this.rows = [];
        this.rows = a;
      },
      JsonToCSV: function (){
        
        // create columns row
        var csvStr = this.columns.map(function(elt){return elt.title}).join(",") + "\n";

        // iterate over each rows and populate csv
        this.rows.forEach(row => {
            this.columns.forEach(column => {
              csvStr += row[column.field] + ','
            })
            csvStr += "\n";
          })
        return csvStr;
      },
      downloadCSV: function () {
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.JsonToCSV());
        hiddenElement.target = '_blank';
        hiddenElement.download = 'epitopes.csv';
        hiddenElement.click();
      }
    },
    mounted: function() {

      // storing config to be able
      // to reset it later on if needed
      this.tableColumnsConfig = config.tableColumnsConfig;

      // pagination
      this.maxDisplayedPages = config.maxDisplayedPages; 
      this.rowsPerPageOptions = config.tableRowPerPageConfig;
      this.selectedRowPerPageValue = config.tableRowPerPageConfig[0];
      this.updateSelectedPage(1);
      this.maxRows = config.maxRows;

      // default sort column/order
      this.sortColumn = config.sortColumn;
      this.sortOrder =  config.sortOrder;
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
