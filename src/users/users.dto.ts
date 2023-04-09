export class CreateUserDTO {
  name: string;
  display_name: string;
  email: string;
  business_type: string;
  phone_number: string;
  country: string;
  external_id: string;
  payout: number;
}

export class UpdateUserDTO {
  name: string;
  display_name: string;
  email: string;
  business_type: string;
  phone_number: string;
  subscription_start_date: string;
  country: string;
  external_id: string;
}
