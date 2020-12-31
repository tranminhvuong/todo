import {
  BaseEntity,
  Column,
  Entity,
  Like,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsDate, isPhoneNumber, Length } from 'class-validator'
@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(5, 100)
  userName: string;

  @Column()
  @Length(5, 100)
  passwordDigest: string;

  @Column()
  confirmCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Length(5,100)
  fullName: string;

  @Column()
  accessToken: string;

  @Column()
  email: string;

  @Column()
  @IsDate()
  birthDay: string;

  @Column()
  activeToken: string;

  @Column()
  gender: boolean;

  @Column()
  isActive: boolean;

  @Column()
  resetToken: string;

  static findAccountByIdMailPhone(text: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :text', {text})
      .orWhere('users.phoneNumber = :text', {text})
      .orWhere('users.id = :text', {text})
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
}
