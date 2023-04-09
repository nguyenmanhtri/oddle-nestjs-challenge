import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getCode } from 'country-list';

import { Users } from './users.entity';
import { CreateUserDTO } from './create-user.dto';
import { ConfigService } from 'src/config/config.service';
import { STRIPE_COUNTRIES } from './users.enum';
import { TEST_SECRET_API_KEY } from 'src/config/constants';

@Injectable()
export class UsersService {
  private stripe;
  private API_KEY: string;

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    configService: ConfigService,
  ) {
    this.API_KEY = configService.get(TEST_SECRET_API_KEY)
    this.stripe = new Stripe(this.API_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async createOne(object: CreateUserDTO): Promise<Users> {
    let stripeAccount: Stripe.Account;
    if (STRIPE_COUNTRIES.includes(object.country)) {
      const body = {
        type: 'custom',
        business_type: 'company',
        email: object.email,
        country: getCode(object.country),
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      }
      stripeAccount = await this.stripe.account.create(body);
    }

    const newUser = this.usersRepository.create({
      ...object,
      external_id: stripeAccount ? stripeAccount.id : null,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
