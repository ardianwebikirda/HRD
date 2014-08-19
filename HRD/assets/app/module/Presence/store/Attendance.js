Ext.define('HRIS.module.Presence.store.Attendance',{
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.Presence.model.Attendance',
    requires    : [
        'HRIS.module.Presence.model.Attendance'
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
            read    : BASE_URL + 'Presence/c_attendance/getAttendance'
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