Ext.define('HRIS.module.MasterHR.store.JobTitle', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterHR.model.JobTitle',
    requires    : [
        'HRIS.module.MasterHR.model.JobTitle'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'MasterHR/c_jobtitle/getJobTitle'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});