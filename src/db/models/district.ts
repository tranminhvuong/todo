import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Province} from './province'
import { IsDate, isPhoneNumber, Length } from 'class-validator'
@Entity('districts')
export class District extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(5, 100)
  name: string;

  @Column()
  @Length(5, 100)
  prefix: string;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn()
  province: Province;
}
