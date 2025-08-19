Ext.define('App.view.ai.TestWindow', {
    extend: 'Ext.panel.Panel',
    xtype: 'ai-test-window',

    requires: [
        'App.view.ai.TestWindowController'
    ],

    bodyStyle: {
        backgroundColor: '#eee'
    },

    layout: 'center',

    controller: 'test-window',

    items: [{
        xtype: 'form',
        title: 'Prompt Test',
        width: 600,
        height: 600,
        border: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            reference: 'result',
            html: '',
            flex: 1,
            bodyPadding: 16,
            scrollable: true,
            bodyStyle: {
                fontFamily: 'monospace',
                fontSize: '13px',
                backgroundColor: "#2e2e2e", 
                color: '#f8f8f2',
            }
        }, {
            xtype: 'panel',
            height: 60,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                flex: 1,
                emptyText: 'Write a prompt',
                reference: 'prompt',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (me,e,eOpts) {
                        if (e.keyCode==13) {
                            me.up('ai-test-window').getController().SubmitPrompt();
                        }
                    }
                }
            }, {
                xtype: 'button',
                width: 120,
                text: 'Submit',
                handler: 'SubmitPrompt'
            }]
        }]
    }]
});