import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import bcrypt from 'bcrypt';
import { IsISO8601, IsNotEmpty, Length } from 'class-validator';
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

  @Column({type: 'date'})
  @IsISO8601({strict: true})
  birthDay: string;

  @Column()
  activeToken: string;

  @Column()
  gender: boolean;

  @Column()
  isActive: boolean;

  @Column()
  avatarUrl: string;

  @Column()
  resetToken: string;

  @Column()
  districtId: number;

  // friend
  @OneToMany(() => User, (user) => user.friends)
  @JoinTable({
    name: 'friends',
    joinColumn: {
      name: 'friend_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  frienders: Promise<User[]>

  @ManyToMany(() => User, (user) => user.frienders)
  friends: Promise<User[]>;

  // follow
  @OneToMany(() => User, (user) => user.followings)
  @JoinTable({
    name: 'follows',
    joinColumn: {
      name: 'following_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  followers: Promise<User[]>

  @ManyToMany(() => User, (user) => user.followers)
  followings: Promise<User[]>;

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
