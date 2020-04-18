const tableColumnsConfig = [
  {
    "title": "Score",
    "field": "Peptides.Score",
    "sortable": true,
    "visible": true,
  },
  {
    "title": "Sequence",
    "field": "Peptides.Sequence",
    "sortable": true,
    "visible": true,
  }
];

// default column title used to sort result and order
const sortColumn = "Score";
const sortOrder = "descending";

// API max returned results limit
const maxRows = 5000;

// Max displayed pages at a time
// before showing up ...
const maxDisplayedPages = 6;

// Rows per page options values
const tableRowPerPageConfig = [1,50,500,5000];

export default { 
  tableColumnsConfig,
  tableRowPerPageConfig,
  maxRows,
  sortColumn,
  sortOrder,
  maxDisplayedPages
};
