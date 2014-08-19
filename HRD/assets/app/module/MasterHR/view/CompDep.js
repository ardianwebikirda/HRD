Ext.define('HRIS.module.MasterHR.view.CompDep', {
    extend   : 'Ext.form.Panel',
    title    : 'Company Detail',
    alias    : 'widget.compdep',
    id       : 'compdep',
    layout   : 'fit',
    requires : [
        'HRIS.module.MasterHR.view.form.FormCompany',
        'HRIS.module.MasterHR.view.grid.GridDepartment2'
    ],
    height      : 250,
    width       : 1000,
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },
    items       : [ 
        {xtype   : 'formcompany', flex : 1},
        {xtype   : 'griddepartment2', flex : 2}         
    ]
});