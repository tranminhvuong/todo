import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { Match } from "./validate";
@Entity('users')
export class UserRegist extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(5, 100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @Column()
  @Length(5, 100)
  @Match('password', {message: 'passwordConfirm not match'})
  passwordConfirm: string;

  @Column()
  @Length(5,100)
  fullName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  gender: boolean;

  @Column()
  agreeTerm: string;

  static findAccountByMail(text: string) {
    return this.createQueryBuilder('users')
      .where('users.email = :text', {text})
      .getOne();
  };
}
