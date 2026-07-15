export interface Device {

  _id?: string;

  assetTag: string;

  deviceName: string;

  category:
    | 'Laptop'
    | 'Desktop'
    | 'Printer'
    | 'Monitor'
    | 'Router'
    | 'Switch'
    | 'Server'
    | 'Other';

  brand: string;

  model: string;

  serialNumber: string;

  purchaseDate?: Date;

  warrantyExpiry?: Date;

  status:
    | 'Available'
    | 'Assigned'
    | 'Maintenance'
    | 'Retired';

  notes?: string;

  createdAt?: Date;

  updatedAt?: Date;

}