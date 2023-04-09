import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import {
  BusinessType,
  Status,
  PayoutMethod,
} from './users.enum';

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
  external_id: string;

  @Column('timestamp')
  subscription_start_date: Date;

  @CreateDateColumn()
  created_on: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: string;

  @Column()
  payout: number;

  @Column({
    type: 'enum',
    enum: PayoutMethod,
  })
  payout_method: string;
}
