export interface MensureIn {
    image: string; 
    custumer_code: string;
    measure_datetime: string; 
    measure_type: "WATER" | "GAS";
  }

  export interface MensureOut{
    image_url: string,
    measure_value:number,
    measure_uuid: string
  }

  export interface MensureSave{
    customerCode:string,
    measureDatetime: Date,
    measureType:  'WATER' | 'GAS';
    imageUrl:      string,
    measureValue:   string
  }