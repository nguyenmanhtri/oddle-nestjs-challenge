import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum BusinessType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export enum Status {

}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  display_name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: BusinessType,
  })
  business_type: string;

  @Column()
  phone_number: string;

  @Column()
  country: string;

  @Column()
  external_id: number;

  @Column('timestamp')
  subscription_start_date: Date;

  @CreateDateColumn()
  created_on: Date;

  @Column()
  status: string;

  @Column()
  payout: number;

  @Column()
  payout_method: string;
}
