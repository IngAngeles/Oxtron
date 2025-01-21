import {useDictionary} from '@/hooks/shared/useDictionary'
import {z} from 'zod'

// --------------------------- Auth
export const UserFormValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(7)
    .max(15),
})
export type Login = z.infer<typeof UserFormValidation>

export const UserRegisterValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  organisationName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  typeLicense: z.coerce.number(),
  // active: z.string().min(1).max(1).default('1'),
  telephoneUser: z.string().min(10),
  timeZone: z.string().min(1),
  language: z.string().min(1),
  // idUSerType: z.number().positive().int().default(1),
})
export type UserRegister = z.infer<typeof UserRegisterValidation>

export const UserRegisterByCompanyIdValidation = z.object({
  idCompany: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  telephoneUser: z.string().min(10),
  timeZone: z.string().min(1),
  language: z.string().min(1),
})
export type UserRegisterByCompanyId = z.infer<typeof UserRegisterByCompanyIdValidation>;

export const ForgotPasswordValidation = z.object({
  email: z.string().email().min(1),
})

export const UpdatePasswordValidation = z.object({
  email: z.string().email().min(1),
  passwordOld: z.string().min(6),
  passwordNew: z.string().min(6),
  confirmPassword: z.string().min(6),
})
export type UpdatePassword = z.infer<typeof UpdatePasswordValidation>

export const UpdateUserValidation = z.object({
  idUSerControl: z.number().positive(),
  idCompany: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(6),
  active: z.string().min(1),
  idUSerType: z.number(),
  telephoneUser: z.string().min(1),
  timeZone: z.string().min(1),
  language: z.string().min(1),
})
export type UpdateUser = z.infer<typeof UpdateUserValidation>

// --------------------------- Measure

export const FacilityValidation = z.object({
  idControlFacility: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idFacility: z.string().min(1),
  propertyStatus: z.coerce.number().positive(),
  city: z.string().min(1),
  country: z.string().min(1),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Facility = z.infer<typeof FacilityValidation>;

export const FacilityDetailsValidation = z.object({
  idControlFacilityDetails: z.number().int().optional(),
  invoiceId: z.string().optional(),
  unit: z.string().optional(),
  typeEquipment: z.string().optional(),

  idControlFacility: z.number().int().min(1),
  idType: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("idType must be a valid number");
      return parsed;
    }),
  idEmissionFactor: z.number().int().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  idTypeDetails: z.number().int().min(1),
  amount: z.number().int().min(1),
  measureFugitive: z.number().int().min(1),
  purchased: z.number().min(1),
  delivered: z.number().min(1),
  returnsProducers: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("returnsProducers must be a valid number");
      return parsed;
    }),
  returnedUsers: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("returnedUsers must be a valid number");
      return parsed;
    }),
  returnedOffsiteRecycling: z.number().min(1),
  partialNAmeplateCharged: z.number().min(1),
  amountYearsBeginning: z.number().min(1),
  amountYearsEnd: z.number().min(1),
  chargedIntoEquipment: z.number().min(1),
  dontKnow: z.number().int().min(1),
  offSiteRecycling: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("offSiteRecycling must be a valid number");
      return parsed;
    }),
  offSiteDestruction: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("offSiteDestruction must be a valid number");
      return parsed;
    }),
  densityPressurePartial: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("densityPressurePartial must be a valid number");
      return parsed;
    }),
  densityPressureFull: z
    .string()
    .min(1)
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("densityPressureFull must be a valid number");
      return parsed;
    }),
  active: z.number().int().min(1),
});

export type FacilityDetails = z.infer<typeof FacilityDetailsValidation>;

export const FacilityDescriptionDetailsValidation = z.object({
  idControlFacilityDetails: z.number().int().optional(),
  idControlFacility: z.number().int().min(1),
  idType: z.union([z.string(), z.number()]).transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  idTypeDescription: z.string().optional(),
  idEmissionFactor: z.number().int().min(1),
  idEmissionFactorDescription: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  invoiceId: z.string().optional(),
  idTypeDetails: z.number().int().min(1),
  idTypeDetailsDescription: z.string().optional(),
  amount: z.number().int().min(1),
  unit: z.string().optional(),
  typeEquipment: z.string().optional(),
  measureFugitive: z.number().int().min(0),
  purchased: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  delivered: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  returnsProducers: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  returnedUsers: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  returnedOffsiteRecycling: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  partialNAmeplateCharged: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  amountYearsBeginning: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  amountYearsEnd: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  chargedIntoEquipment: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  dontKnow: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  offSiteRecycling: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  offSiteDestruction: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  densityPressurePartial: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  densityPressureFull: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  active: z.number().int().min(0),
  firstName: z.string().min(0),
})
export type FacilityDescriptionDetails = z.infer<typeof FacilityDescriptionDetailsValidation>;

export const VehicleValidation = z.object({
  idControlVehicle: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idStatus: z.coerce.number().positive(),
  name: z.string().optional(),
  idCboBrand: z.coerce.number().positive(),
  idCboModel: z.coerce.number().positive(),
  idCboType: z.coerce.number().positive(),
  licensePlate: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Vehicle = z.infer<typeof VehicleValidation>

export const VehicleDetailsValidation = z.object({
  idControlVehicleDetails: z
    .number()
    .int()
    .optional(),
  idControlVehicle: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z
    .string()
    .optional()
    .or(z.literal('')),
  idVehicleCboType: z
    .string()
    .transform((val) => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  amount: z
    .string()
    .transform((val) => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  unit: z
    .string()
    .optional(),
  active: z
    .number()
    .int(),
})
export type VehicleDetails = z.infer<typeof VehicleDetailsValidation>

export const VehicleDescriptionDetailsValidation = z.object({
  idControlVehicleDetails: z
    .number()
    .int()
    .optional(),
  idControlVehicle: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  idEmissionFactorDescription: z.string().min(1),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z
    .string()
    .optional()
    .or(z.literal('')),
  idVehicleCboType: z
    .string()
    .transform((val) => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  cboTypeDescription: z.string().min(1),
  amount: z
    .string()
    .transform((val) => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  unit: z
    .string()
    .optional(),
  active: z
    .number()
    .int(),
})
export type VehicleDescriptionDetails = z.infer<typeof VehicleDescriptionDetailsValidation>

export const TravelValidation = z.object({
  idControlTravel: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idTravel: z.string().min(1),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Travel = z.infer<typeof TravelValidation>

export const TravelDetailsValidation = z.object({
  idControlTravelDetails: z
    .number()
    .int()
    .optional(),
  idControlTravel: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z
    .string()
    .optional(),
  idTravelCboType: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) return 0
    return parsed
  }),
  origin: z
    .string()
    .optional(),
  destiny: z
    .string()
    .optional(),
  active: z
    .number()
    .int(),
})
export type TravelDetails = z.infer<typeof TravelDetailsValidation>;

export const TravelDescriptionDetailsValidation = z.object({
  idControlTravelDetails: z
    .number()
    .int()
    .optional(),
  idControlTravel: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  idEmissionFactorDescription: z.string().min(1),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z
    .string()
    .optional(),
  idTravelCboType: z
    .number()
    .int(),
  travelCboTypeDescription: z.string().min(1),
  origin: z
    .string()
    .optional(),
  destiny: z
    .string()
    .optional(),
  active: z
    .number()
    .int(),
})
export type TravelDescriptionDetails = z.infer<typeof TravelDescriptionDetailsValidation>;

export const FirstStepLogisticValidation = z.object({
  idControlLogistics: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  origin: z.string().min(1),
  destination: z.string().min(1),
  originzc: z.string().min(1),
  destinationzc: z.string().min(1),
  loadLogistic: z.string().optional(),
  client: z.string().optional(),
})

export const SecondStepLogisticValidation = z.object({
  idCboStatus: z.coerce.number().positive('This field is required'),
  name: z.string().optional(),
  idTravelCboType: z.coerce.number().positive('This field is required'),
  idCboModel: z.coerce.number().optional(),
  idCboBrand: z.coerce.number().optional(),
  licensePlate: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export const ThirdStepLogisticValidation = z.object({
  PropertyStatus: z.coerce.number().positive('This field is required'),
  idControlVehicle: z.coerce.number().positive('This field is required'),
})
export const LogisticValidation = FirstStepLogisticValidation.merge(SecondStepLogisticValidation).merge(ThirdStepLogisticValidation)
export type Logistic = z.infer<typeof LogisticValidation>

export const LogisticDetailsValidation = z.object({
  idControlLogisticsDetails: z
    .number()
    .int()
    .optional(),
  idControlLogistics: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  origin: z.string().optional(),
  destiny: z.string().optional(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z.string().optional(),
  idFuelType: z
    .string()
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  amount: z
    .string()
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) return 0
      return parsed
    }),
  unit: z.string().optional(),
  active: z
    .number()
    .int(),
})
export type LogisticDetails = z.infer<typeof LogisticDetailsValidation>

export const LogisticDescriptionDetailsValidation = z.object({
  idControlLogisticsDetails: z
    .number()
    .int()
    .optional(),
  idControlLogistics: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  idEmissionFactorDescription: z.string().optional(),
  origin: z.string().optional(),
  destiny: z.string().optional(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  invoiceId: z.string().optional(),
  idFuelType: z
    .union([z.string(), z.number()])
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    }),
  fuelTypeDescription: z.string().optional(),
  amount: z
    .union([z.string(), z.number()])
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    }),
  unit: z.union([z.string(), z.null()]).optional(),
  active: z
    .number()
    .int(),
})
export type LogisticDescriptionDetails = z.infer<typeof LogisticDescriptionDetailsValidation>

export const ManufacturingValidation = z.object({
  idControlManufacturing: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  process: z.string().min(1),
  idFacility: z.coerce.number().min(1),
  idTypeEquipment: z.number().positive('Type of equipment is required'),
  idTypeFuelUsed: z.number().positive('Type of fuel used is required'),
  idTypeEquipmentCode: z.number().positive('Type of equipment code is required'),
  active: z.number().max(1).min(0).default(1),
})
export type Manufacturing = z.infer<typeof ManufacturingValidation>

export const ManufacturingDetailsValidation = z.object({
  idControlManufacturingDetails: z
    .number()
    .int()
    .optional(),
  idControlManufacturing: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  invoiceId: z
    .string()
    .optional(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  amount: z
    .string().transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })
    .optional(),
  unit: z
    .string()
    .optional(),
  active: z
    .number()
    .int(),
})
export type ManufacturingDetails = z.infer<typeof ManufacturingDetailsValidation>

export const ManufacturingDescriptionDetailsValidation = z.object({
  idControlManufacturingDetails: z
    .number()
    .int()
    .optional(),
  idControlManufacturing: z
    .number()
    .int(),
  idEmissionFactor: z
    .number()
    .int(),
  idEmissionFactorDescription: z.string().optional(),
  invoiceId: z.string().optional(),
  startDate: z
    .string()
    .datetime(),
  endDate: z
    .string()
    .datetime(),
  amount: z
    .union([z.string(), z.number()])
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })
    .optional(),
  unit: z.string().optional(),
  active: z
    .number()
    .int(),
})
export type ManufacturingDescriptionDetails = z.infer<typeof ManufacturingDescriptionDetailsValidation>

export const CommutingValidation = z.object({
  idControlCommuting: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).optional(),
  idUserControl: z.number().optional(),
  idControlFacility: z.coerce.number().min(1),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Commuting = z.infer<typeof CommutingValidation>

export const CommutingDetailsValidation = z.object({
  idControlCommutingDetails: z
    .number()
    .int()
    .optional(),
  idControlCommuting: z
    .number()
    .int(),
  origin: z
    .string()
    .optional(),
  originZipCode: z
    .string()
    .optional(),
  destination: z
    .string()
    .optional(),
  distinationZipCode: z
    .string()
    .optional(),
  distance: z
    .string()
    .optional(),
  fuelEfficiency: z
    .string()
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
  active: z
    .number()
    .int()
    .default(1),
})
export type CommutingDetails = z.infer<typeof CommutingDetailsValidation>;

export const CommutingDescriptionDetailsValidation = z.object({
  idControlCommutingDetails: z
    .number()
    .int(),
  idControlCommuting: z
    .number()
    .int(),
  origin: z
    .string()
    .optional(),
  originZipCode: z
    .string()
    .optional(),
  destination: z
    .string()
    .optional(),
  distinationZipCode: z
    .string()
    .optional(),
  distance: z
    .string()
    .optional(),
  fuelEfficiency: z
    .string()
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
  active: z
    .number()
    .int()
    .default(1),
  idCommutingCboModeTransport: z.number().positive().int(),
  cboModeTransportDescription: z.string().min(1),
  activity: z.string().min(1),
  unit: z.string().min(1),
  status: z.string().min(1),
  idUserControl: z.string().min(1),
})
export type CommutingDescriptionDetails = z.infer<typeof CommutingDescriptionDetailsValidation>;

export const CompanyValidation = z.object({
  idCompany: z.number().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  organisatioName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  active: z.string().min(1),
  registrationDate: z.string().min(1),
  idTypeLicense: z.number(),
  address: z.string().min(1),
  telephoneCompany: z.string().min(1),
  size: z.string().min(1),
})
export type Company = z.infer<typeof CompanyValidation>;

// Communicate
export const ReportHeaderValidation = z.object({
  idControl: z.number().optional(),
  idUserControl: z.number().min(1),
  preparedBy: z.string().optional(),
  facilityId: z.string().optional(),
  idType: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  typeDescription: z.string().optional(),
  startDate: z.string().refine(value => !isNaN(Date.parse(value))),
  endDate: z.string().refine(value => !isNaN(Date.parse(value))),
  active: z.number().min(1).default(() => 1),
})
export type ReportHeader = z.infer<typeof ReportHeaderValidation>

export const ComboValidation = z.object({
  idControl: z.number(),
  description: z.string(),
  units: z.string(),
});
export type ComboType = z.infer<typeof ComboValidation>;

export function useFormValidation() {
  const { dictionary } = useDictionary();

  return {
    UserFormValidation: UserFormValidation.extend({
      email: z.string().email(dictionary?.validation?.userForm?.email || 'Invalid email'),
      password: z
        .string()
        .min(7, dictionary?.validation?.userForm?.password?.min || 'Password too short')
        .max(15, dictionary?.validation?.userForm?.password?.max || 'Password too long'),
    }),
    UserRegisterValidation: UserRegisterValidation.extend({
      firstName: z.string().min(1, dictionary?.validation?.userRegister.firstName),
      lastName: z.string().min(1, dictionary?.validation?.userRegister.lastName),
      role: z.string().min(1, dictionary?.validation?.userRegister.role || 'Role is required'),
      email: z.string()
        .email(dictionary?.validation?.userRegister.email.invalid)
        .min(1, dictionary?.validation?.userRegister.email.required || 'Email is required'),
      password: z.string().min(6, dictionary?.validation?.userRegister.password.min || 'Password must be at least 6 characters long'),
      confirmPassword: z.string().min(6, dictionary?.validation?.userRegister.password.confirm || 'Confirm password must be at least 6 characters long'),
      organisationName: z.string().min(1, dictionary?.validation?.userRegister.organisationName || 'Organisation name is required'),
      city: z.string().min(1, dictionary?.validation?.userRegister.city || 'City is required'),
      state: z.string().min(1, dictionary?.validation?.userRegister.state || 'State is required'),
      country: z.string().min(1, dictionary?.validation?.userRegister.country || 'Country is required'),
      postalCode: z.string().min(1, dictionary?.validation?.userRegister.postalCode || 'Postal code is required'),
      telephoneUser: z.string().min(10, dictionary?.validation?.userRegister.telephoneUser || 'Phone number is required'),
      timeZone: z.string().min(1, dictionary?.validation?.userRegister.timeZone || 'Time zone is required'),
      language: z.string().min(1, dictionary?.validation?.userRegister.language || 'Language is required'),
    }),
    UserRegisterByCompanyIdValidation: UserRegisterByCompanyIdValidation.extend({
      idCompany: z.number(),
      firstName: z.string().min(1, dictionary?.validation?.userRegisterByCompanyId.firstName),
      lastName: z.string().min(1, dictionary?.validation?.userRegisterByCompanyId.lastName),
      role: z.string().min(1, dictionary?.validation?.userRegisterByCompanyId.role),
      email: z.string().email(dictionary?.validation?.userRegisterByCompanyId.email.invalid).min(1, dictionary?.validation?.userRegisterByCompanyId.required),
      password: z.string().min(6, dictionary?.validation?.userRegisterByCompanyId.password.min),
      confirmPassword: z.string().min(6, dictionary?.validation?.userRegisterByCompanyId.password.confirm),
      telephoneUser: z.string().min(10, dictionary?.validation?.userRegisterByCompanyId.telephoneUser),
      timeZone: z.string().min(1, dictionary?.validation?.userRegisterByCompanyId.timeZone),
      language: z.string().min(1, dictionary?.validation?.userRegisterByCompanyId.language),
    }),
    ForgotPasswordValidation: ForgotPasswordValidation.extend({
      email: z.string().email(dictionary?.validation?.forgotPassword.email.invalid).nonempty(dictionary?.validation?.forgotPassword.email.required),
    }),
    UpdatePasswordValidation: UpdatePasswordValidation.extend({
      email: z.string().email(dictionary?.validation?.updatePassword.email.invalid).nonempty(dictionary?.validation?.updatePassword.email.required),
      passwordOld: z.string().min(6, dictionary?.validation?.updatePassword.passwordOld),
      passwordNew: z.string().min(6, dictionary?.validation?.updatePassword.passwordNew),
      confirmPassword: z.string().min(6, dictionary?.validation?.updatePassword.confirmPassword),
    }),
    UpdateUserValidation: UpdateUserValidation.extend({
      idUSerControl: z.number().positive(),
      idCompany: z.number({ message: dictionary?.validation?.updateUser.idCompany }),
      firstName: z.string().min(1, dictionary?.validation?.updateUser.firstName),
      lastName: z.string().min(1, dictionary?.validation?.updateUser.lastName),
      role: z.string().min(1, dictionary?.validation?.updateUser.role),
      email: z.string().min(1, dictionary?.validation?.updateUser.email),
      password: z.string().min(1, dictionary?.validation?.updateUser.password),
      confirmPassword: z.string().min(6, dictionary?.validation?.updateUser.confirmPassword),
      active: z.string().min(1, dictionary?.validation?.updateUser.active),
      idUSerType: z.number({ message: dictionary?.validation?.updateUser.idUSerType }),
      telephoneUser: z.string().min(1, dictionary?.validation?.updateUser.telephoneUser),
      timeZone: z.string().min(1, dictionary?.validation?.updateUser.timeZone),
      language: z.string().min(1, dictionary?.validation?.updateUser.language)
    }),
    CompanyValidation: CompanyValidation.extend({
      idCompany: z.number().optional(),
      firstName: z.string().min(1, dictionary?.validation?.companyV.firstName),
      lastName: z.string().min(1, dictionary?.validation?.companyV.lastName),
      role: z.string().min(1, dictionary?.validation?.companyV.role),
      email: z.string().min(1, dictionary?.validation?.companyV.email),
      password: z.string().min(1, dictionary?.validation?.companyV.password),
      organisatioName: z.string().min(1, dictionary?.validation?.companyV.organisatioName),
      city: z.string().min(1, dictionary?.validation?.companyV.city),
      state: z.string().min(1, dictionary?.validation?.companyV.state),
      country: z.string().min(1, dictionary?.validation?.companyV.country),
      postalCode: z.string().min(1, dictionary?.validation?.companyV.postalCode),
      active: z.string().min(1, dictionary?.validation?.companyV.active),
      registrationDate: z.string().min(1, dictionary?.validation?.companyV.registrationDate),
      idTypeLicense: z.number(),
      address: z.string().min(1, dictionary?.validation?.companyV.address),
      telephoneCompany: z.string().min(1, dictionary?.validation?.companyV.telephoneCompany),
      size: z.string().min(1, dictionary?.validation?.companyV.size),
    }),
    FacilityValidation: FacilityValidation.extend({
      idUserControl: z.number().nullable(),
      idFacility: z.string().min(1, dictionary?.validation?.facility.idFacility.required).nullable(),
      propertyStatus: z.number().positive(dictionary?.validation?.facility.propertyStatus.required),
      city: z.string().min(1, dictionary?.validation?.facility.city.required).nullable(),
      country: z.string().min(1, dictionary?.validation?.facility.country.required).nullable(),
      description: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),
    FacilityDetailsValidation: FacilityDetailsValidation.extend({
      idControlFacilityDetails: z.number().int().optional(),
      invoiceId: z.string().optional(),
      unit: z.string().optional(),
      typeEquipment: z.string().optional(),

      idControlFacility: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.idControlFacility.required }),
      idType: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.idType.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.idType.invalidNumber);
          return parsed;
        }),
      idEmissionFactor: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.idEmissionFactor.required }),
      startDate: z.string().nonempty({ message: dictionary?.validation?.facilityDetails.startDate.required }),
      endDate: z.string().nonempty({ message: dictionary?.validation?.facilityDetails.endDate.required }),
      idTypeDetails: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.idTypeDetails.required }),
      amount: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.amount.required }),
      measureFugitive: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.measureFugitive.required }),
      purchased: z.number().min(1, { message: dictionary?.validation?.facilityDetails.purchased.required }),
      delivered: z.number().min(1, { message: dictionary?.validation?.facilityDetails.delivered.required }),
      returnsProducers: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.returnsProducers.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.returnsProducers.invalidNumber);
          return parsed;
        }),
      returnedUsers: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.returnedUsers.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.returnedUsers.invalidNumber);
          return parsed;
        }),
      returnedOffsiteRecycling: z.number().min(1, { message: dictionary?.validation?.facilityDetails.returnedOffsiteRecycling.required }),
      partialNAmeplateCharged: z.number().min(1, { message: dictionary?.validation?.facilityDetails.partialNAmeplateCharged.required }),
      amountYearsBeginning: z.number().min(1, { message: dictionary?.validation?.facilityDetails.amountYearsBeginning.required }),
      amountYearsEnd: z.number().min(1, { message: dictionary?.validation?.facilityDetails.amountYearsEnd.required }),
      chargedIntoEquipment: z.number().min(1, { message: dictionary?.validation?.facilityDetails.amountYearsEnd.charged }),
      dontKnow: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.amountYearsEnd.dont }),
      offSiteRecycling: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.offSiteRecycling.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.offSiteRecycling.invalidNumber);
          return parsed;
        }),
      offSiteDestruction: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.offSiteDestruction.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.offSiteDestruction.valid);
          return parsed;
        }),
      densityPressurePartial: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.densityPressurePartial.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.densityPressurePartial.valid);
          return parsed;
        }),
      densityPressureFull: z
        .string()
        .nonempty({ message: dictionary?.validation?.facilityDetails.densityPressureFull.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.facilityDetails.densityPressureFull.valid);
          return parsed;
        }),
      active: z.number().int().min(1, { message: dictionary?.validation?.facilityDetails.active.required }),
    }),
    FacilityDescriptionDetailsValidation: FacilityDescriptionDetailsValidation.extend({
      idControlFacilityDetails: z.number().int().optional(),
      idControlFacility: z.number().int().min(1, dictionary?.validation?.facilityDescriptionDetails.idControlFacility.required),
      idType: z.union([z.string(), z.number()]).transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idTypeDescription: z.string().optional(),
      idEmissionFactor: z.number().int().min(1, dictionary?.validation?.facilityDescriptionDetails.idEmissionFactor.required),
      idEmissionFactorDescription: z.string().optional(),
      startDate: z.string().min(1, dictionary?.validation?.facilityDescriptionDetails.startDate.required),
      endDate: z.string().min(1, dictionary?.validation?.facilityDescriptionDetails.endDate.required),
      invoiceId: z.string().optional(),
      idTypeDetails: z.number().int().min(1, dictionary?.validation?.facilityDescriptionDetails.idTypeDetails.required),
      idTypeDetailsDescription: z.string().optional(),
      amount: z.number().int().min(1, dictionary?.validation?.facilityDescriptionDetails.amount.required),
      unit: z.string().optional(),
      typeEquipment: z.string().optional(),
      measureFugitive: z.number().int().min(0, dictionary?.validation?.facilityDescriptionDetails.fugitive.required),
      purchased: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      delivered: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnsProducers: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnedUsers: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnedOffsiteRecycling: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      partialNAmeplateCharged: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      amountYearsBeginning: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      amountYearsEnd: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      chargedIntoEquipment: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      dontKnow: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      offSiteRecycling: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      offSiteDestruction: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      densityPressurePartial: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      densityPressureFull: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      active: z.number().int().min(0, dictionary?.validation?.facilityDescriptionDetails.fugitive.active),
      firstName: z.string().min(0, dictionary?.validation?.facilityDescriptionDetails.fugitive.first),
    }),
    VehicleValidation: VehicleValidation.extend({
      idControlVehicle: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idStatus: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      name: z.string().optional(),
      idCboBrand: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idCboModel: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idCboType: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      licensePlate: z.string().optional(),
      active: z.number().max(1).min(0).default(1),
    }),
    VehicleDetailsValidation: VehicleDetailsValidation.extend({
      idControlVehicleDetails: z
        .number()
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer)
        .optional(),
      idControlVehicle: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.idControlVehicle.required })
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.vehicleDetails.idEmissionFactor.integer),
      startDate: z
        .string({ required_error: dictionary?.validation?.vehicleDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.vehicleDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.vehicleDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.vehicleDetails.endDate.datetime }),
      invoiceId: z
        .string()
        .optional()
        .or(z.literal('')),
      idVehicleCboType: z
        .string()
        .transform((val) => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      amount: z
        .string()
        .transform((val) => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      unit: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.endDate.active })
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer),
    }),
    VehicleDescriptionDetailsValidation: VehicleDescriptionDetailsValidation.extend({
      idControlVehicleDetails: z
        .number()
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer)
        .optional(),
      idControlVehicle: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.idControlVehicle.required })
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer),
      idEmissionFactorDescription: z.string().min(1),
      startDate: z
        .string({ required_error: dictionary?.validation?.vehicleDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.vehicleDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.vehicleDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.vehicleDetails.endDate.datetime }),
      invoiceId: z
        .string()
        .optional()
        .or(z.literal('')),
      idVehicleCboType: z
        .string()
        .transform((val) => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      cboTypeDescription: z.string().min(1),
      amount: z
        .string()
        .transform((val) => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      unit: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation?.vehicleDetails.endDate.active })
        .int(dictionary?.validation?.vehicleDetails.idControlVehicle.integer),
    }),
    TravelValidation: TravelValidation.extend({
      idControlTravel: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.travel.idControlTravel.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idTravel: z.string().min(1, dictionary?.validation?.travel.idTravel.required),
      description: z.string().optional(),
      active: z.number().max(1).min(0).default(1),
    }),
    TravelDetailsValidation: TravelDetailsValidation.extend({
      idControlTravelDetails: z
        .number()
        .int(dictionary?.validation?.travelDetails.idControlTravelDetails.integer)
        .optional(),
      idControlTravel: z
        .number({ required_error: dictionary?.validation?.travelDetails.idControlTravel.required })
        .int(dictionary?.validation?.travelDetails.idControlTravel.required),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.travelDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.travelDetails.idEmissionFactor.integer),
      startDate: z
        .string({ required_error: dictionary?.validation?.travelDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.travelDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.travelDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.travelDetails.endDate.datetime }),
      invoiceId: z
        .string()
        .optional(),
      idTravelCboType: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) return 0
        return parsed
      }),
      origin: z
        .string()
        .optional(),
      destiny: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation?.travelDetails.active.required })
        .int(dictionary?.validation?.travelDetails.integer),
    }),
    TravelDescriptionDetailsValidation: TravelDescriptionDetailsValidation.extend({
      idControlTravelDetails: z
        .number()
        .int(dictionary?.validation?.travelDescriptionDetails.idControlTravelDetails.integer)
        .optional(),
      idControlTravel: z
        .number({ required_error: dictionary?.validation?.travelDescriptionDetails.idControlTravel.required })
        .int(dictionary?.validation?.travelDescriptionDetails.idControlTravel.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.travelDescriptionDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.travelDescriptionDetails.idEmissionFactor.integer),
      idEmissionFactorDescription: z.string().min(1),
      startDate: z
        .string({ required_error: dictionary?.validation?.travelDescriptionDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.travelDescriptionDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.travelDescriptionDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.travelDescriptionDetails.endDate.datetime }),
      invoiceId: z
        .string()
        .optional(),
      idTravelCboType: z
        .number({ required_error: dictionary?.validation?.travelDescriptionDetails.idTravelCboType.required })
        .int(dictionary?.validation?.travelDescriptionDetails.idTravelCboType.integer),
      travelCboTypeDescription: z.string().min(1),
      origin: z
        .string()
        .optional(),
      destiny: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation?.travelDescriptionDetails.active.required })
        .int(dictionary?.validation?.travelDescriptionDetails.active.integer),
    }),
    LogisticValidation: LogisticValidation.extend({
      idControlLogistics: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.logistic.idControlLogistics.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      origin: z.string().nullable(),
      destination: z.string().nullable(),
      originzc: z.string().nullable(),
      destinationzc: z.string().nullable(),
      loadLogistic: z.string().nullable(),
      client: z.string().nullable(),
      idCboStatus: z.number().positive(dictionary?.validation?.logistic.idCboStatus.positive),
      name: z.string().nullable(),
      idTravelCboType: z.number().positive(dictionary?.validation?.logistic.idCboStatus.positive),
      idCboModel: z.number().positive(dictionary?.validation?.logistic.idCboStatus.positive),
      idCboBrand: z.number().positive(dictionary?.validation?.logistic.idCboStatus.positive),
      licensePlate: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),
    LogisticDetailsValidation: LogisticDetailsValidation.extend({
      idControlLogisticsDetails: z
        .number()
        .int(dictionary?.validation?.logisticDetails.idControlLogisticsDetails.integer)
        .optional(),
      idControlLogistics: z
        .number({ required_error: dictionary?.validation?.logisticDetails.idControlLogistics.required })
        .int(dictionary?.validation?.logisticDetails.idControlLogistics.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.logisticDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.logisticDetails.idEmissionFactor.integer),
      origin: z.string().optional(),
      destiny: z.string().optional(),
      startDate: z
        .string({ required_error: dictionary?.validation?.logisticDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.logisticDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.logisticDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.logisticDetails.endDate.datetime }),
      invoiceId: z.string().optional(),
      idFuelType: z
        .string()
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      amount: z
        .string()
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) return 0
          return parsed
        }),
      unit: z.string().optional(),
      active: z
        .number({ required_error: dictionary?.validation?.logisticDetails.active.required })
        .int(dictionary?.validation?.logisticDetails.active.integer),
    }),
    ManufacturingValidation: ManufacturingValidation.extend({
      idControlManufacturing: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.manufacturing.idControlManufacturing.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      process: z.string().min(1, dictionary?.validation?.manufacturing.process.minLength).nullable(),
      idFacility: z.string().min(1, dictionary?.validation?.manufacturing.idFacility.required),
      idTypeEquipment: z.number().positive(dictionary?.validation?.manufacturing.idTypeEquipment.positive),
      idTypeFuelUsed: z.number().positive(dictionary?.validation?.manufacturing.idTypeFuelUsed.positive),
      idTypeEquipmentCode: z.number().positive(dictionary?.validation?.manufacturing.idTypeEquipmentCode.positive),
      active: z.number().max(1).min(0).default(1),
    }),
    ManufacturingDetailsValidation: ManufacturingDetailsValidation.extend({
      idControlManufacturingDetails: z
        .number()
        .int(dictionary?.validation?.manufacturingDetails.idControlManufacturingDetails.integer)
        .optional(),
      idControlManufacturing: z
        .number({ required_error: dictionary?.validation?.manufacturingDetails.idControlManufacturing.required })
        .int(dictionary?.validation?.manufacturingDetails.idControlManufacturing.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.manufacturingDetails.idEmissionFactor.required })
        .int(dictionary?.validation?.manufacturingDetails.idEmissionFactor.integer),
      invoiceId: z
        .string()
        .optional(),
      startDate: z
        .string({ required_error: dictionary?.validation?.manufacturingDetails.startDate.required })
        .datetime({ message: dictionary?.validation?.manufacturingDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation?.manufacturingDetails.endDate.required })
        .datetime({ message: dictionary?.validation?.manufacturingDetails.endDate.datetime }),
      amount: z
        .string().transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.manufacturingDetails.amount.invalidNumber)
          return parsed
        })
        .optional(),
      unit: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation?.manufacturingDetails.active.required })
        .int(dictionary?.validation?.manufacturingDetails.active.integer),
    }),
    CommutingValidation: CommutingValidation.extend({
      idControlCommuting: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.commuting.facilityRequired)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idControlFacility: z.string().min(1, dictionary?.validation?.commuting.invalidNumber),
      description: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),
    CommutingDetailsValidation: CommutingDetailsValidation.extend({
      idControlCommutingDetails: z
        .number({ required_error: dictionary?.validation?.commutingDetails.control })
        .int(dictionary?.validation?.commutingDetails.integer)
        .optional(),
      idControlCommuting: z
        .number({ required_error: dictionary?.validation?.commutingDetails.required })
        .int(dictionary?.validation?.commutingDetails.integer),
      origin: z
        .string()
        .optional(),
      originZipCode: z
        .string()
        .optional(),
      destination: z
        .string()
        .optional(),
      distinationZipCode: z
        .string()
        .optional(),
      distance: z
        .string()
        .optional(),
      fuelEfficiency: z
        .string({ required_error: dictionary?.validation?.commutingDetails.fuel })
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.commutingDetails.number)
          return parsed
        })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
      active: z
        .number()
        .int(dictionary?.validation?.commutingDetails.integer)
        .default(1),
    }),
    CommutingDescriptionDetailsValidation: CommutingDescriptionDetailsValidation.extend({
      idControlCommutingDetails: z
        .number({ required_error: dictionary?.validation?.details.control })
        .int(dictionary?.validation?.details.mode),
      idControlCommuting: z
        .number({ required_error: dictionary?.validation?.details.commu })
        .int(dictionary?.validation?.details.mode),
      origin: z
        .string()
        .optional(),
      originZipCode: z
        .string()
        .optional(),
      destination: z
        .string()
        .optional(),
      distinationZipCode: z
        .string()
        .optional(),
      distance: z
        .string()
        .optional(),
      fuelEfficiency: z
        .string({ required_error: dictionary?.validation?.details.fuel })
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.details.number)
          return parsed
        })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
      active: z
        .number()
        .int(dictionary?.validation?.details.positive)
        .default(1),
      idCommutingCboModeTransport: z.number().positive().int(),
      cboModeTransportDescription: z.string().min(1),
      activity: z.string().min(1),
      unit: z.string().min(1),
      status: z.string().min(1),
      idUserControl: z.string().min(1),
    }),
    ReportHeaderValidation: ReportHeaderValidation.extend({
      idControl: z.number().optional(),
      idUserControl: z.number().min(1, dictionary?.validation?.report.id),
      preparedBy: z.string().optional(),
      facilityId: z.string().optional(),
      idType: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation?.report.number)
        return parsed
      }),
      typeDescription: z.string().optional(),
      startDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: dictionary?.validation?.report.start,
      }),
      endDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: dictionary?.validation?.report.end,
      }),
      active: z.number().min(1, dictionary?.validation?.report.active).default(() => 1),
    }), ComboValidation: ComboValidation.extend({
      idControl: z.number(),
      description: z.string(),
      units: z.string(),
    }), LogisticDescriptionDetailsValidation: LogisticDescriptionDetailsValidation.extend({
      idControlLogisticsDetails: z
        .number()
        .int(dictionary?.validation?.logistics.number)
        .optional(),
      idControlLogistics: z
        .number({ required_error: dictionary?.validation?.logistics.control })
        .int(dictionary?.validation?.logistics.number),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation?.logistics.emi })
        .int(dictionary?.validation?.logistics.number),
      idEmissionFactorDescription: z.string().optional(),
      origin: z.string().optional(),
      destiny: z.string().optional(),
      startDate: z
        .string({ required_error: dictionary?.validation?.logistics.start })
        .datetime({ message: dictionary?.validation?.logistics.date }),
      endDate: z
        .string({ required_error: dictionary?.validation?.logistics.end })
        .datetime({ message: dictionary?.validation?.logistics.date }),
      invoiceId: z.string().optional(),
      idFuelType: z
        .union([z.string(), z.number()])
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.logistics.in)
          return parsed
        }),
      fuelTypeDescription: z.string().optional(),
      amount: z
        .union([z.string(), z.number()])
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation?.logistics.in)
          return parsed
        }),
      unit: z.union([z.string(), z.null()]).optional(),
      active: z
        .number({ required_error: dictionary?.validation?.logistics.active })
        .int(dictionary?.validation?.logistics.number),
    }),
    ManufacturingDescriptionDetailsValidation: ManufacturingDescriptionDetailsValidation.extend({
        idControlManufacturingDetails: z
          .number()
          .int(dictionary?.validation?.logistics.number)
          .optional(),
        idControlManufacturing: z
          .number({ required_error: dictionary?.validation?.logistics.fac })
          .int(dictionary?.validation?.logistics.number),
        idEmissionFactor: z
          .number({ required_error: dictionary?.validation?.logistics.emi })
          .int(dictionary?.validation?.logistics.number),
        idEmissionFactorDescription: z.string().optional(),
        invoiceId: z.string().optional(),
        startDate: z
          .string({ required_error: dictionary?.validation?.logistics.start})
          .datetime({ message: dictionary?.validation?.logistics.date }),
        endDate: z
          .string({ required_error: dictionary?.validation?.logistics.end })
          .datetime({ message: dictionary?.validation?.logistics.date }),
        amount: z
          .union([z.string(), z.number()])
          .transform(val => {
            const parsed = Number(val)
            if (isNaN(parsed)) throw new Error(dictionary?.validation?.logistics.in)
            return parsed
          })
          .optional(),
        unit: z.string().optional(),
        active: z
          .number({ required_error: dictionary?.validation?.logistics.active })
          .int(dictionary?.validation?.logistics.number),
      }
    )
  }
}
