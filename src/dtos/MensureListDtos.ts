export enum MeasureType {
    WATER = "WATER",
    GAS = "GAS"
  }
  
  export interface MeasureList {
    measureType?: MeasureType;
    customerCode: string;
  }
  