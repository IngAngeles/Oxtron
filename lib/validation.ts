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
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  role: z.string().nonempty('Role is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  organisationName: z.string().nonempty('Organisation name is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
  country: z.string().nonempty('Country is required'),
  postalCode: z.string().nonempty('Postal code is required'),
  typeLicense: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  telephoneUser: z.string().min(10, 'You must enter your phone number'),
  timeZone: z.string().min(1, 'You must enter your phone time zone'),
  language: z.string().min(1, 'Language is required'),
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
}).refine((data) => data.password === data.confirmPassword, {
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
  idControlFacility: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
  idFacility: z.string().min(1, 'Facility ID is required').nullable(),
  propertyStatus: z.number().positive('Property status is required'),
  city: z.string().min(1, 'City is required').nullable(),
  country: z.string().min(1, 'Country is required').nullable(),
  description: z.string().nullable(),
  active: z.number().max(1).min(0).default(1),
})
export type Facility = z.infer<typeof FacilityValidation>;

export const FacilityDetailsValidation = z.object({
  idControlFacilityDetails: z.number().int().optional(),
  idControlFacility: z.number().int().min(1, 'idControlFacility is required'),
  idType: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  idEmissionFactor: z.number().int().min(1, 'idEmissionFactor is required'),
  startDate: z.string().min(1, 'startDate is required'),
  endDate: z.string().min(1, 'endDate is required'),
  invoiceId: z.string().optional(),
  idTypeDetails: z.number().int().min(1, 'idTypeDetails is required'),
  amount: z.number().int().min(1, 'amount is required'),
  unit: z.string().optional(),
  typeEquipment: z.string().optional(),
  measureFugitive: z.number().int().min(1, 'measureFugitive is required'),
  purchased: z.number().min(1, 'purchased is required'),
  delivered: z.number().min(1, 'delivered is required'),
  returnsProducers: z.number().min(1, 'returnsProducers is required'),
  returnedUsers: z.number().min(1, 'returnedUsers is required'),
  returnedOffsiteRecycling: z.number().min(1, 'returnedOffsiteRecycling is required'),
  partialNAmeplateCharged: z.number().min(1, 'partialNAmeplateCharged is required'),
  amountYearsBeginning: z.number().min(1, 'amountYearsBeginning is required'),
  amountYearsEnd: z.number().min(1, 'amountYearsEnd is required'),
  chargedIntoEquipment: z.number().min(1, 'chargedIntoEquipment is required'),
  dontKnow: z.number().int().min(1, 'dontKnow is required'),
  offSiteRecycling: z.number().min(1, 'offSiteRecycling is required'),
  offSiteDestruction: z.number().min(1, 'offSiteDestruction is required'),
  densityPressurePartial: z.number().min(1, 'densityPressurePartial is required'),
  densityPressureFull: z.number().min(1, 'densityPressureFull is required'),
  active: z.number().int().min(1, 'active is required'),
})
export type FacilityDetails = z.infer<typeof FacilityDetailsValidation>;

export const VehicleValidation = z.object({
  idControlVehicle: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
  idStatus: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  name: z.string().optional(),
  idCboBrand: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  idCboModel: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
  idCboType: z.string().transform((val) => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }),
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
    .number({ required_error: 'El campo \'idVehicleCboType\' es requerido.' })
    .int('Debe ser un número entero.'),
  amount: z
    .number({ required_error: 'El campo \'amount\' es requerido.' })
    .positive('Debe ser un número positivo.'),
  unit: z
    .string()
    .optional(),
  active: z
    .number({ required_error: 'El campo \'active\' es requerido.' })
    .int('Debe ser un número entero.'),
})
export type VehicleDetails = z.infer<typeof VehicleDetailsValidation>

export const TravelValidation = z.object({
  idControlTravel: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
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
  idTravelCboType: z
    .number({ required_error: 'El campo \'idTravelCboType\' es requerido.' })
    .int('Debe ser un número entero.'),
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

export const LogisticValidation = z.object({
  idControlLogistics: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
  origin: z.string().nullable(),
  destination: z.string().nullable(),
  originzc: z.string().nullable(),
  destinationzc: z.string().nullable(),
  loadLogistic: z.string().nullable(),
  client: z.string().nullable(),
  idCboStatus: z.number().positive('This field is required'),
  name: z.string().nullable(),
  idTravelCboType: z.number().positive('This field is required'),
  idCboModel: z.number().positive('This field is required'),
  idCboBrand: z.number().positive('This field is required'),
  licensePlate: z.string().nullable(),
  active: z.number().max(1).min(0).default(1),
  propertyStatus: z.string().max(1).min(0).default('1'),
  selectVehicle: z.string().max(1).min(0).default('1'),
})
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
    .number({ required_error: 'el campo \'idFuelType\' es requerido.' })
    .int('debe ser un número entero.'),
  amount: z.number().optional(),
  unit: z.string().optional(),
  active: z
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type LogisticDetails = z.infer<typeof LogisticDetailsValidation>

export const ManufacturingValidation = z.object({
  idControlManufacturing: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
  process: z.string().min(1, 'Process must be at least 1 character long').nullable(),
  idFacility: z.string().min(1, 'Facility is required'),
  idTypeEquipment: z.number().positive('This field is required'),
  idTypeFuelUsed: z.number().positive('This field is required'),
  idTypeEquipmentCode: z.number().positive('This field is required'),
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
    .number()
    .optional(),
  unit: z
    .string()
    .optional(),
  active: z
    .number({ required_error: 'el campo \'active\' es requerido.' })
    .int('debe ser un número entero.'),
})
export type ManufacturingDetails = z.infer<typeof ManufacturingDetailsValidation>

export const CommutingValidation = z.object({
  idControlCommuting: z.string().transform(val => {
    const parsed = Number(val)
    if (isNaN(parsed)) throw new Error('Invalid number')
    return parsed
  }).nullable(),
  idUserControl: z.number().nullable(),
  idControlFacility: z.string().min(1, 'Facility is required'),
  description: z.string().nullable(),
  active: z.number().max(1).min(0).default(1),
})
export type Commuting = z.infer<typeof CommutingValidation>

export const CommutingDetailsValidation = z.object({
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
    .number({ required_error: 'El campo \'fuelEfficiency\' es requerido.' })
    .positive('Debe ser un número positivo.'),
  active: z
    .number()
    .int('Debe ser un número entero.')
    .default(1),
})
export type CommutingDetails = z.infer<typeof CommutingDetailsValidation>;

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
