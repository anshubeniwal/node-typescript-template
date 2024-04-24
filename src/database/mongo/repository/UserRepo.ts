import User, { UserModel } from '../model/User';
import { Types } from 'mongoose';

export default class UserRepo {
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true }).lean<User>().exec();
  }
}
