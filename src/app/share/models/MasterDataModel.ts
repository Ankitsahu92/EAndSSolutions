export interface MasterData {
    id: number;
    name: string;
    type: number;
    createdBy: number;
    createdOn: Date;
    createdByIP?: any;
    modifiedBy?: any;
    modifiedOn?: any;
    modifiedByIP?: any;
    isActive: boolean;
}