Ext.define('App.view.ai.DataGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'ai-data-grid',
  controller: 'datagridcontroller',
  title: 'Data Grid',

  requires: [
    'App.store.DataStore',
    'App.view.ai.DataGridController'
  ],

  plugins: {
    gridfilters: true // Enables column filter UI
  },

  store: {
    type: 'data-store' // Connects to defined UserStore
  },


  columns: [
    { 
      text: 'Name',
      dataIndex: 'name', 
      flex: 1, 
      filter: 'string' 
    },
    { 
      text: 'Age', 
      dataIndex: 'age', 
      width: 80, 
      filter: 'number' 
    },
    { 
      text: 'Email', 
      dataIndex: 'email', 
      flex: 1, 
      filter: 'string' 
    },
    {
      text: 'Status', 
      dataIndex: 'status', 
      width: 100, 
      filter: {
          type: 'list',
          options: ['active', 'inactive', 'pending']
      },
      renderer: function (value, metaData) {
        let colors={
          "active": "#396",
          "inactive": "#900",
          "pending": "#990"
        };
        metaData.tdStyle = 'color:' + colors[value];
        return value;
      }
    },
    { 
      text: 'Country', 
      dataIndex: 'country', 
      width: 120, 
      filter: 'string' 
    },
    { 
      text: 'Sales (USD)',
      dataIndex: 'last_month_sales', 
      width: 120, 
      filter: 'number', 
      formatter: 'usMoney' 
    },
    { 
      xtype: 'datecolumn', 
      text: 'Created At', 
      dataIndex: 'created_at', 
      width: 120, 
      filter: 'date', 
      formatter: 'date("Y-m-d")', 
    }

  ],

  tbar: [
    'Search:',
    {
      xtype: 'textfield',
      emptyText: 'e.g. show active users under 30',
      width: 350,
      listeners: {
        specialkey: 'onQueryEnter' // handled in controller
      }
    },
    '->',
    {
      xtype: 'button',
      text: 'Clear Filters',
      handler: 'onClearFiltersClick'
    },
  ]
});
