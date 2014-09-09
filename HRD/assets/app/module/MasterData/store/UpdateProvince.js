Ext.define('HRIS.module.MasterData.store.UpdateProvince', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterData.model.Province',
    requires    : [
        'HRIS.module.MasterData.model.Province'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type    : 'ajax',
        api     : {
            read    : BASE_URL + 'MasterData/c_province/chainProvince2'
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