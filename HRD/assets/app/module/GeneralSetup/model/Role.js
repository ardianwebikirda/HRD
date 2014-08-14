Ext.define('HRIS.module.GeneralSetup.model.Role', {
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
            name    : 'isactive',
            type    : 'string'
        },
        {
            name    : 'description',
            type    : 'string'

        }
    ]
});