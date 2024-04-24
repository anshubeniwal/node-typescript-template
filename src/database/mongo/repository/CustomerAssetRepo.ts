import CustomerAssetData, { CustomerAssetDataModel } from '../model/CustomerAssetData';

export default class CustomerAssetRepo {
  public static insert(data): Promise<CustomerAssetData | null> {
    return new CustomerAssetDataModel(data).save();
  }
}
