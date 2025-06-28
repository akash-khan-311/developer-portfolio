import { BloodGroupEnumType, CountryEnumType } from '../constant';

export type TPersonalInfo = {
  email: string;
  phone: string;
  country: CountryEnumType;
  bloodGroup: BloodGroupEnumType;
  languages: string[];
  dob: string;
  bio: string;
};
