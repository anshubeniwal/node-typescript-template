import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  public mobile: string;

  @IsString()
  public name: string;
  public isVerified: boolean;
  public isEdit: boolean;
  public dob: string;
  public verifiedAt: string;
  public createdAt: string;
  public emailid: string;
  public address: string;
  public userId: string;
  public status?: boolean;
  public userType?: string;
  public loggedinuser?: string;
  public companyname?: string;
  public pincode?: number;
  public city?: string;
  public createdBy?: string;
  public usertype?: number;
  username: any;
}
