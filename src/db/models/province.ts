import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from './district'
import { Length } from 'class-validator'
@Entity('provinces')
export class Province extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(5, 100)
  name: string;

  @Column()
  code: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}
