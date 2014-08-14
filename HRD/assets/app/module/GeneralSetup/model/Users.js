Ext.define('HRIS.module.GeneralSetup.model.Users', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'username',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'role',
            type    : 'string'
        },
        {
            name    : 'firstname',
            type    : 'string'
        },
        {
            name    : 'lastname',
            type    : 'string'
        },
        {
            name    : 'description',
            type    : 'string'
        },
        {
            name    : 'email',
            type    : 'string'
        },
        {
            name    : 'phone',
            type    : 'string'
        },
        {
            name    : 'mobile',
            type    : 'string'
        },
        {
            name    : 'isactive',
            type    : 'string'
        }
    ]
});