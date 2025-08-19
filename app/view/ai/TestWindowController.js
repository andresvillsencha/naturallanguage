Ext.define('App.view.ai.TestWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.test-window',

    SubmitPrompt: function () {
        let me=this;
        let view=this.getView();
        let references=this.getReferences();
        let query = references.prompt.getValue();
        
        if (query.length > 0) {
            view.mask('Loading...');

            Ext.Ajax.request({
                url: 'http://ai.sencha.local:3000/api/interpret-prompt',
                method: 'POST',
                jsonData: { query: query },
                success: function (response) {
                    view.unmask();
                    let result = Ext.decode(response.responseText);
                    result = JSON.stringify(result, null, 4);
                    result = me.syntaxHighlight(result);

                    references.result.setHtml('<pre>'+result+'</pre>');
                },
                failure: function () {
                    view.unmask();
                    Ext.Msg.alert('Error', 'Could not process your query, try again.');
                }
            });
        }
    },


    syntaxHighlight: function (json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b[\d.eE+-]+\b)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
});