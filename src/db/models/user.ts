import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from 'bcrypt';
import { IsDate, IsNotEmpty, isPhoneNumber, Length, ValidatePromise } from 'class-validator';
@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(6, 20)
  userName: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 20)
  passwordDigest: string;

  @Column()
  confirmCode: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 20)
  phoneNumber: string;

  @Column()
  fullName: string;

  @Column()
  accessToken: string;

  @Column()
  email: string;

  @Column()
  birthDay: string;

  @Column()
  activeToken: string;

  @Column()
  gender: boolean;

  @Column()
  isActive: boolean;

  @Column()
  resetToken: string;

  static findAccountByEmail(email: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :email', {email})
      .getOne();
  }

  static findAccountByLoginId(email: string, phone: string, userName: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :email', {email})
      .orWhere('users.phoneNumber = :phone', {phone})
      .orWhere('users.userName = :userName', {userName})
      .getOne();
  };

  static findAccountByActiveToken(text: string) {
    return this.createQueryBuilder('users')
      .where('users.activeToken = :text', {text})
      .getOne();
  };

  static findAccountByAccessToken(text: string) {
    return this.createQueryBuilder('users')
      .where('users.accessToken = :text', {text})
      .getOne();
  };

  static findAccountByResetToken(text: string) {
    return this.createQueryBuilder('users')
      .where('users.resetToken = :text', {text})
      .getOne();
  };

  public async verifyPassword(password: string) {
    const check = await bcrypt.compare(password, this.passwordDigest);
    return check;
  }
}
