Ext.define('HRIS.module.Presence.view.form.UploadForm',{
   extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title 		: 'Upload Data',
	iconCls 	: 'icon-page_excel',
	alias 		: 'widget.uploadform',
	id 			: 'uploadform',
	layout 		: 'fit',
    width       : 400,
    height      : 150,
	initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype           : 'form',
                border          : false,
                frame           : true,
                defaults		: {
                	anchor 		: '100%',
                	labelWidth	: 120
                },
                bodyPadding     : 5,
                items       	: [
                	{
                		xtype 		: 'datefield',
                		fieldLabel	: 'Tanggal Attendance',
                		name 		: 'dateatt',
                        id          : 'dateatt'
                	},
                	{
                		xtype		: 'filefield',
                		fieldLabel	: 'Pick CSV File',
                		name 		: 'csvfile',
                        id          : 'csvfile'
                	}
                ]
            }
        ];
        me.buttons = [
        	{
                text    : 'Upload',
                iconCls : 'icon-database_refresh',
                id      : 'dump',
                name    : 'dump',
                action  : 'dump',//Nantinya akan dicontrol menggunakan controller
            },
        ];
        me.callParent(arguments);
    }
});