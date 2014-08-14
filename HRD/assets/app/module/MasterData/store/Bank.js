Ext.define('HRIS.module.MasterData.store.Bank', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterData.model.Bank',
    requires    : [
        'HRIS.module.MasterData.model.Bank'
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
            read    : BASE_URL + 'MasterData/c_bank/getBank'
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