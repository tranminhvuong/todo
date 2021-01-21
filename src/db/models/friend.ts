import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

// import {  } from 'class-validator'
@Entity('friends')
export class Friend extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  isOnline: boolean;

  @Column()
  friendId: number;
}
