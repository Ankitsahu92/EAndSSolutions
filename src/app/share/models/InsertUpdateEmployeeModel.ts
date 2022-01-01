
export interface InsertUpdateEmployeeModel {
    createdBy?: number;
    createdOn?: Date;
    createdByIP?: string;
    modifiedBy?: number;
    modifiedOn?: Date;
    modifiedByIP?: string;
    isActive: boolean;
    id: number;
    ssn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    cellPhone: string;
    homePhone: string;
    email: string;
    dateOfHire: Date;
    dateOfFirstCase: Date;
    employeeID: string;
    gender: string;
    hrSupervisor: string;
    ethnicity: string;
    city: string;
    county: string;
    state: string;
    zipCode: string;
    emergencyPhone: string;
    emergencyContact: string;
    maritalStatus: string;
    dob: Date;
}