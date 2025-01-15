import { z } from 'zod'

// --------------------------- Auth

export const UserFormValidation = z.object({
  email: z.string().email('Wrong email'),
  password: z
    .string()
    .min(7, 'The password must be at least 7 characters')
    .max(15, 'The password must be less than 15 characters'),
})
export type Login = z.infer<typeof UserFormValidation>

export const UserRegisterValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  organisationName: z.string().min(1, 'Organisation name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  typeLicense: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  // active: z.string().min(1).max(1).default('1'),
  telephoneUser: z.string().min(10, 'You must enter your phone number'),
  timeZone: z.string().min(1, 'You must enter your phone time zone'),
  language: z.string().min(1, 'Language is required'),
  // idUSerType: z.number().positive().int().default(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})
export type UserRegister = z.infer<typeof UserRegisterValidation>

export const UserRegisterByCompanyIdValidation = z.object({
  idCompany: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  telephoneUser: z.string().min(10, 'You must enter your phone number'),
  timeZone: z.string().min(1, 'You must enter your phone time zone'),
  language: z.string().min(1, 'Language is required'),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})
export type UserRegisterByCompanyId = z.infer<typeof UserRegisterByCompanyIdValidation>;

export const ForgotPasswordValidation = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
})

export const UpdatePasswordValidation = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  passwordOld: z.string().min(6, 'Current password is required'),
  passwordNew: z.string().min(6, 'New password is required'),
  confirmPassword: z.string().min(6, 'Please confirm your new password'),
}).refine((data) => data.passwordNew === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'], // Aplica el mensaje de error al campo confirmPassword
})
export type UpdatePassword = z.infer<typeof UpdatePasswordValidation>

export const UpdateUserValidation = z.object({
  idUSerControl: z.number().positive(),
  idCompany: z.number({ message: 'idCompany is required' }),
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
  role: z.string().min(1, 'role is required'),
  email: z.string().min(1, 'email is required'),
  password: z.string().min(1, 'password is required'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  active: z.string().min(1, 'active is required'),
  idUSerType: z.number({ message: 'idUSerTyp is required' }),
  telephoneUser: z.string().min(1, 'telephoneUser is required'),
  timeZone: z.string().min(1, 'timeZone is required'),
  language: z.string().min(1, 'languag is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})
export type UpdateUser = z.infer<typeof UpdateUserValidation>

// --------------------------- Measure

export const FacilityValidation = z.object({
  idControlFacility: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idFacility: z.string().min(1, 'Facility ID is required'),
  propertyStatus: z.coerce.number().positive('Property status is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Facility = z.infer<typeof FacilityValidation>;

export const FacilityDetailsValidation = z.object({
  idControlFacilityDetails: z.number().int().optional(),
  invoiceId: z.string().optional(),
  unit: z.string().optional(),
  typeEquipment: z.string().optional(),

  idControlFacility: z.number().int().min(1, { message: "idControlFacility is required" }),
  idType: z
    .string()
    .nonempty({ message: "idType is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("idType must be a valid number");
      return parsed;
    }),
  idEmissionFactor: z.number().int().min(1, { message: "idEmissionFactor is required" }),
  startDate: z.string().nonempty({ message: "startDate is required" }),
  endDate: z.string().nonempty({ message: "endDate is required" }),
  idTypeDetails: z.number().int().min(1, { message: "idTypeDetails is required" }),
  amount: z.number().int().min(1, { message: "amount is required" }),
  measureFugitive: z.number().int().min(1, { message: "measureFugitive is required" }),
  purchased: z.number().min(1, { message: "purchased is required" }),
  delivered: z.number().min(1, { message: "delivered is required" }),
  returnsProducers: z
    .string()
    .nonempty({ message: "returnsProducers is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("returnsProducers must be a valid number");
      return parsed;
    }),
  returnedUsers: z
    .string()
    .nonempty({ message: "returnedUsers is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("returnedUsers must be a valid number");
      return parsed;
    }),
  returnedOffsiteRecycling: z.number().min(1, { message: "returnedOffsiteRecycling is required" }),
  partialNAmeplateCharged: z.number().min(1, { message: "partialNAmeplateCharged is required" }),
  amountYearsBeginning: z.number().min(1, { message: "amountYearsBeginning is required" }),
  amountYearsEnd: z.number().min(1, { message: "amountYearsEnd is required" }),
  chargedIntoEquipment: z.number().min(1, { message: "chargedIntoEquipment is required" }),
  dontKnow: z.number().int().min(1, { message: "dontKnow is required" }),
  offSiteRecycling: z
    .string()
    .nonempty({ message: "offSiteRecycling is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("offSiteRecycling must be a valid number");
      return parsed;
    }),
  offSiteDestruction: z
    .string()
    .nonempty({ message: "offSiteDestruction is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("offSiteDestruction must be a valid number");
      return parsed;
    }),
  densityPressurePartial: z
    .string()
    .nonempty({ message: "densityPressurePartial is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("densityPressurePartial must be a valid number");
      return parsed;
    }),
  densityPressureFull: z
    .string()
    .nonempty({ message: "densityPressureFull is required" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) throw new Error("densityPressureFull must be a valid number");
      return parsed;
    }),
  active: z.number().int().min(1, { message: "active is required" }),
});

export type FacilityDetails = z.infer<typeof FacilityDetailsValidation>;

export const FacilityDescriptionDetailsValidation = z.object({
  idControlFacilityDetails: z.number().int().optional(),
  idControlFacility: z.number().int().min(1, 'idControlFacility is required'),
  idType: z.union([z.string(), z.number()]).transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  idTypeDescription: z.string().optional(),
  idEmissionFactor: z.number().int().min(1, 'idEmissionFactor is required'),
  idEmissionFactorDescription: z.string().optional(),
  startDate: z.string().min(1, 'startDate is required'),
  endDate: z.string().min(1, 'endDate is required'),
  invoiceId: z.string().optional(),
  idTypeDetails: z.number().int().min(1, 'idTypeDetails is required'),
  idTypeDetailsDescription: z.string().optional(),
  amount: z.number().int().min(1, 'amount is required'),
  unit: z.string().optional(),
  typeEquipment: z.string().optional(),
  measureFugitive: z.number().int().min(0, 'measureFugitive is required'),
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
  active: z.number().int().min(0, 'active is required'),
  firstName: z.string().min(0, 'first name is required'),
})
export type FacilityDescriptionDetails = z.infer<typeof FacilityDescriptionDetailsValidation>;

export const VehicleValidation = z.object({
  idControlVehicle: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idStatus: z.coerce.number().positive('Status is required'),
  name: z.string().optional(),
  idCboBrand: z.coerce.number().positive('Brand is required'),
  idCboModel: z.coerce.number().positive('Model is required'),
  idCboType: z.coerce.number().positive('Type is required'),
  licensePlate: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Vehicle = z.infer<typeof VehicleValidation>

export const VehicleDetailsValidation = z.object({
  idControlVehicleDetails: z
    .number()
    .int('Debe ser un número entero.')
    .optional(),
  idControlVehicle: z
    .number({ required_error: 'El campo \'idControlVehicle\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'El campo \'idEmissionFactor\' es requerido.' })
    .int('Debe ser un número entero.'),
  startDate: z
    .string({ required_error: 'El campo \'startDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'El campo \'endDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'El campo \'active\' es requerido.' })
    .int('Debe ser un número entero.'),
})
export type VehicleDetails = z.infer<typeof VehicleDetailsValidation>

export const VehicleDescriptionDetailsValidation = z.object({
  idControlVehicleDetails: z
    .number()
    .int('Debe ser un número entero.')
    .optional(),
  idControlVehicle: z
    .number({ required_error: 'El campo \'idControlVehicle\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'El campo \'idEmissionFactor\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactorDescription: z.string().min(1),
  startDate: z
    .string({ required_error: 'El campo \'startDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'El campo \'endDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'El campo \'active\' es requerido.' })
    .int('Debe ser un número entero.'),
})
export type VehicleDescriptionDetails = z.infer<typeof VehicleDescriptionDetailsValidation>

export const TravelValidation = z.object({
  idControlTravel: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  idTravel: z.string().min(1, 'Travel ID is required'),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Travel = z.infer<typeof TravelValidation>

export const TravelDetailsValidation = z.object({
  idControlTravelDetails: z
    .number()
    .int('Debe ser un número entero.')
    .optional(),
  idControlTravel: z
    .number({ required_error: 'El campo \'idControlTravel\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'El campo \'idEmissionFactor\' es requerido.' })
    .int('Debe ser un número entero.'),
  startDate: z
    .string({ required_error: 'El campo \'startDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'El campo \'endDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'El campo \'active\' es requerido.' })
    .int('Debe ser un número entero.'),
})
export type TravelDetails = z.infer<typeof TravelDetailsValidation>;

export const TravelDescriptionDetailsValidation = z.object({
  idControlTravelDetails: z
    .number()
    .int('Debe ser un número entero.')
    .optional(),
  idControlTravel: z
    .number({ required_error: 'El campo \'idControlTravel\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'El campo \'idEmissionFactor\' es requerido.' })
    .int('Debe ser un número entero.'),
  idEmissionFactorDescription: z.string().min(1),
  startDate: z
    .string({ required_error: 'El campo \'startDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'El campo \'endDate\' es requerido.' })
    .datetime({ message: 'Debe ser una fecha válida en formato ISO 8601.' }),
  invoiceId: z
    .string()
    .optional(),
  idTravelCboType: z
    .number({ required_error: 'El campo \'idTravelCboType\' es requerido.' })
    .int('Debe ser un número entero.'),
  travelCboTypeDescription: z.string().min(1),
  origin: z
    .string()
    .optional(),
  destiny: z
    .string()
    .optional(),
  active: z
    .number({ required_error: 'El campo \'active\' es requerido.' })
    .int('Debe ser un número entero.'),
})
export type TravelDescriptionDetails = z.infer<typeof TravelDescriptionDetailsValidation>;

export const FirstStepLogisticValidation = z.object({
  idControlLogistics: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  origin: z.string().min(1, 'This field is required'),
  destination: z.string().min(1, 'This field is required'),
  originzc: z.string().min(1, 'This field is required'),
  destinationzc: z.string().min(1, 'This field is required'),
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
export const LogisticValidation = FirstStepLogisticValidation.merge(SecondStepLogisticValidation)
export type Logistic = z.infer<typeof LogisticValidation>

export const LogisticDetailsValidation = z.object({
  idControlLogisticsDetails: z
    .number()
    .int('debe ser un número entero.')
    .optional(),
  idControlLogistics: z
    .number({ required_error: 'el campo \'idControlLogistics\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'el campo \'idEmissionFactor\' es requerido.' })
    .int('debe ser un número entero.'),
  origin: z.string().optional(),
  destiny: z.string().optional(),
  startDate: z
    .string({ required_error: 'el campo \'startDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'el campo \'endDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type LogisticDetails = z.infer<typeof LogisticDetailsValidation>

export const LogisticDescriptionDetailsValidation = z.object({
  idControlLogisticsDetails: z
    .number()
    .int('debe ser un número entero.')
    .optional(),
  idControlLogistics: z
    .number({ required_error: 'el campo \'idControlLogistics\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'el campo \'idEmissionFactor\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactorDescription: z.string().optional(),
  origin: z.string().optional(),
  destiny: z.string().optional(),
  startDate: z
    .string({ required_error: 'el campo \'startDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'el campo \'endDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type LogisticDescriptionDetails = z.infer<typeof LogisticDescriptionDetailsValidation>

export const ManufacturingValidation = z.object({
  idControlManufacturing: z.coerce.number().optional(),
  idUserControl: z.number().optional(),
  process: z.string().min(1, 'Process is required'),
  idFacility: z.coerce.number().min(1, 'Facility is required'),
  idTypeEquipment: z.number().positive('Type of equipment is required'),
  idTypeFuelUsed: z.number().positive('Type of fuel used is required'),
  idTypeEquipmentCode: z.number().positive('Type of equipment code is required'),
  active: z.number().max(1).min(0).default(1),
})
export type Manufacturing = z.infer<typeof ManufacturingValidation>

export const ManufacturingDetailsValidation = z.object({
  idControlManufacturingDetails: z
    .number()
    .int('debe ser un número entero.')
    .optional(),
  idControlManufacturing: z
    .number({ required_error: 'el campo \'idControlManufacturing\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'el campo \'idEmissionFactor\' es requerido.' })
    .int('debe ser un número entero.'),
  invoiceId: z
    .string()
    .optional(),
  startDate: z
    .string({ required_error: 'el campo \'startDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'el campo \'endDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type ManufacturingDetails = z.infer<typeof ManufacturingDetailsValidation>

export const ManufacturingDescriptionDetailsValidation = z.object({
  idControlManufacturingDetails: z
    .number()
    .int('debe ser un número entero.')
    .optional(),
  idControlManufacturing: z
    .number({ required_error: 'el campo \'idControlManufacturing\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactor: z
    .number({ required_error: 'el campo \'idEmissionFactor\' es requerido.' })
    .int('debe ser un número entero.'),
  idEmissionFactorDescription: z.string().optional(),
  invoiceId: z.string().optional(),
  startDate: z
    .string({ required_error: 'el campo \'startDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
  endDate: z
    .string({ required_error: 'el campo \'endDate\' es requerido.' })
    .datetime({ message: 'debe ser una fecha válida en formato ISO 8601.' }),
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
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type ManufacturingDescriptionDetails = z.infer<typeof ManufacturingDescriptionDetailsValidation>

export const CommutingValidation = z.object({
  idControlCommuting: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).optional(),
  idUserControl: z.number().optional(),
  idControlFacility: z.coerce.number().min(1, 'Facility is required'),
  description: z.string().optional(),
  active: z.number().max(1).min(0).default(1),
})
export type Commuting = z.infer<typeof CommutingValidation>

export const CommutingDetailsValidation = z.object({
  idControlCommutingDetails: z
    .number({ required_error: 'El campo \'idControlCommutingDetails\' es requerido.' })
    .int('Debe ser un número entero.')
    .optional(),
  idControlCommuting: z
    .number({ required_error: 'El campo \'idControlCommuting\' es requerido.' })
    .int('Debe ser un número entero.'),
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
    .string({ required_error: 'El campo \'fuelEfficiency\' es requerido.' })
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
  active: z
    .number()
    .int('Debe ser un número entero.')
    .default(1),
})
export type CommutingDetails = z.infer<typeof CommutingDetailsValidation>;

export const CommutingDescriptionDetailsValidation = z.object({
  idControlCommutingDetails: z
    .number({ required_error: 'El campo \'idControlCommutingDetails\' es requerido.' })
    .int('Debe ser un número entero.'),
  idControlCommuting: z
    .number({ required_error: 'El campo \'idControlCommuting\' es requerido.' })
    .int('Debe ser un número entero.'),
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
    .string({ required_error: 'El campo \'fuelEfficiency\' es requerido.' })
    .transform(val => {
      const parsed = Number(val)
      if (isNaN(parsed)) throw new Error('Invalid number')
      return parsed
    })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
  active: z
    .number()
    .int('Debe ser un número entero.')
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
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
  role: z.string().min(1, 'role is required'),
  email: z.string().min(1, 'email is required'),
  password: z.string().min(1, 'password is required'),
  organisatioName: z.string().min(1, 'organisatioName is required'),
  city: z.string().min(1, 'city is required'),
  state: z.string().min(1, 'state is required'),
  country: z.string().min(1, 'country is required'),
  postalCode: z.string().min(1, 'postalCode is required'),
  active: z.string().min(1, 'active is required'),
  registrationDate: z.string().min(1, 'registrationDate is required'),
  idTypeLicense: z.number(),
  address: z.string().min(1, 'address is required'),
  telephoneCompany: z.string().min(1, 'telephoneCompany is required'),
  size: z.string().min(1, 'size is required'),
})
export type Company = z.infer<typeof CompanyValidation>;

// Communicate
export const ReportHeaderValidation = z.object({
  idControl: z.number().optional(),
  idUserControl: z.number().min(1, 'ID is required'),
  preparedBy: z.string().optional(),
  facilityId: z.string().optional(),
  idType: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  typeDescription: z.string().optional(),
  startDate: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid start date',
  }),
  endDate: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid end date',
  }),
  active: z.number().min(1, 'Active is required').default(() => 1),
})
export type ReportHeader = z.infer<typeof ReportHeaderValidation>

export const ComboValidation = z.object({
  idControl: z.number(),
  description: z.string(),
  units: z.string(),
});
export type ComboType = z.infer<typeof ComboValidation>;
