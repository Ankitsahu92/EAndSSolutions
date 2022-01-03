
export interface InsertUpdateClientModel {
    createdBy?: number;
    createdOn?: Date;
    createdByIP?: string;
    modifiedBy?: number;
    modifiedOn?: Date;
    modifiedByIP?: string;
    isActive: boolean;
    id: number;
    billTo: string;
    firstName: string;
    middleName: string;
    lastName: string;
    cellPhone: string;
    ethnicity: string;
    email: string;
    insurenceID: string;
    noOfChildren: string;
    ssn: string;
    clientID: string;
    gender: string;
    nurse: string;
    caseCoordinator: string;
    maritalStatus: string;
    city: string;
    county: string;
    state: string;
    zipCode: string;
    referredBy: string;
    caseWorkerPhone: string;
    emergencyContact: string;
    caseWorkerEmail: string;
}