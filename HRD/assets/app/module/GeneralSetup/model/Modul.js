Ext.define('HRIS.module.GeneralSetup.model.Modul', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'parent',
            type    : 'string'
        },
        {
            name    : 'icon',
            type    : 'string'

        },
        {
            name    : 'isactive',
            type    : 'string'
        },
        {
            name    : 'description',
            type    : 'string'

        }
    ]
});