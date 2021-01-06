import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
@Entity('users')
export class UserLogin extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(5, 100)
  password: string;

  @Column()
  @Length(5, 100)
  loginId: string;
}
