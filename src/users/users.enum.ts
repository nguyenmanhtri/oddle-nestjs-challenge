export enum BusinessType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export enum Status {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
}

export enum PayoutMethod {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

export const STRIPE_COUNTRIES = ['Singapore', 'Hong Kong'];
