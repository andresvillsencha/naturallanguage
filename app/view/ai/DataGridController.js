Ext.define('App.view.ai.DataGridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.datagridcontroller',


  onClearFiltersClick: function (btn) {
    let grid = btn.up('grid');
    let filters = grid.getPlugin('gridfilters');
    filters.clearFilters();
  },

  onQueryEnter: function (field, e) {
    if (e.getKey() === e.ENTER) {
      let query = field.getValue();
      let grid = field.up('grid');
      this.applyNaturalLanguageFilter(grid, query);
    }
  },

  applyNaturalLanguageFilter: function (grid, query) {
    let plugin = grid.getPlugin('gridfilters');
    let store = grid.getStore();

    grid.mask('Loading...');

    Ext.Ajax.request({
      url: 'http://ai.sencha.local:3000/api/interpret-prompt',
      method: 'POST',
      jsonData: { query: query },

      success: function (response) {
        grid.unmask();
        let result = Ext.decode(response.responseText);

        if (result.filters) {
          plugin.clearFilters();

          Ext.Array.forEach(result.filters, function (filter) {
            
            if (filter.type==="date") {
                if (filter.value.gt!==undefined) filter.value.gt=new Date(filter.value.gt);
                if (filter.value.lt!==undefined) filter.value.lt=new Date(filter.value.lt);
                if (filter.value.eq!==undefined) filter.value.eq=new Date(filter.value.eq);
            }
            
            plugin.addFilter([{
              dataIndex: filter.property,
              type: filter.type,
              operator: filter.operator,
              value: filter.value
            }]);
          });
        }

        if (result.sorters) {
          store.sort(result.sorters);
        }
        
      },

      failure: function () {
        grid.unmask();
        Ext.Msg.alert('Error', 'Could not process your query, try again.');
      }


    });
  }

});
