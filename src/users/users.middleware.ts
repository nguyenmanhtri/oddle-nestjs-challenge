import Stripe from 'stripe';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getCode } from 'country-list';

import { ConfigService } from 'src/config/config.service';
import { TEST_SECRET_API_KEY } from 'src/config/constants';
import { STRIPE_COUNTRIES } from './users.enum';

@Injectable()
export class CreateStripeAccount implements NestMiddleware {
  private stripe;

  constructor(
    private configService: ConfigService,
  ) {
    const API_KEY = this.configService.get(TEST_SECRET_API_KEY)
    this.stripe = new Stripe(API_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    let stripeAccount: Stripe.Account;
    const {
      country,
      email,
    } = req.body;

    if (STRIPE_COUNTRIES.includes(country)) {
      const body = {
        type: 'custom',
        business_type: 'company',
        email,
        country: getCode(country),
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      }
      stripeAccount = await this.stripe.account.create(body);
      res.locals.stripeAccount = stripeAccount;
    }
    next();
  }
}
