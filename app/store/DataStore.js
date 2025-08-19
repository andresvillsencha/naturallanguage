/**
 * App.store.DataStore
 * --------------------
 * This is a data store for user records in the application.
 * It defines the data fields and configures an Ajax proxy to load JSON data
 * from a backend endpoint (`/back/data.json`). It also specifies how to read the 
 * data from the server response and loads the data automatically on initialization.
 * Sample Query:
 * {
 *   "success": true,
 *   "count": 42,
 *   "data": [
 *     {
 *       "name": "Alice",
 *       "age": 30,
 *       "email": "alice@example.com",
 *       "status": "active",
 *       "created_at": "2025-06-12"
 *     }
 *     // More records...
 *   ]
 * }
 */

Ext.define('App.store.DataStore', {
  extend: 'Ext.data.Store',
  alias: 'store.data-store',

  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'email', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'country', type: 'string' },
    { name: 'last_month_sales', type: 'number' },
    { name: 'created_at', type: 'date' }
  ],

  remoteFilter: false,

  proxy: {
    type: 'ajax',                   // Use Ajax to fetch data from a backend endpoint
    url: '/server/data/data.json',
    reader: {
      type: 'json',
      rootProperty: 'data',         // The array of records is inside the `data` property
      totalProperty: 'count',       // Total number of records (used for pagination if needed)
      successProperty: 'success'    // Optional flag indicating successful response
    }
  },

  autoLoad: true
});