import { Document, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'customerAssetData';
export const COLLECTION_NAME = 'customerAssetData';

export default interface CustomerAssetData extends Document {
  userId: number;
  leadId: number;
  shakey: string;
  customerAsset: any;
}

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.Number,
      required: true,
    },
    leadId: {
      type: Schema.Types.Number,
      required: true,
    },
    shakey: {
      type: Schema.Types.String,
      required: true,
      maxlength: 40,
    },
    customerAsset: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export const CustomerAssetDataModel = model<CustomerAssetData>(DOCUMENT_NAME, schema, COLLECTION_NAME);
