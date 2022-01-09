export function isNumberFn(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

export function findDdlObjectFn(item: any[], id?: string): any {
    if (!id) {
        return null;
    }
    const ddlId = +id;
    const data = item.find(f => f.id == ddlId);
    return data ? data : null;
}

export function StringToDateFn(date?: string | Date): any {
    if (!date) {
        return null;
    }
    return new Date(date)
}