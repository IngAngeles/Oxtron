"use client";
import { z } from "zod";
import { useDictionary } from "@/hooks/shared/useDictionary";

const {
  FacilityValidation,
  FacilityDetailsValidation,
  FacilityDescriptionDetailsValidation,
  ComboValidation,
  VehicleValidation,
  VehicleDetailsValidation,
  VehicleDescriptionDetailsValidation,
  TravelValidation,
  TravelDetailsValidation,
  TravelDescriptionDetailsValidation,
  LogisticValidation,
  LogisticDetailsValidation,
  ManufacturingValidation,
  ManufacturingDetailsValidation,
  CommutingValidation,
  CommutingDetailsValidation,
  CommutingDescriptionDetailsValidation,
  CompanyValidation,
  ReportHeaderValidation,
  UpdateUserValidation,
  LogisticDescriptionDetailsValidation,
  ManufacturingDescriptionDetailsValidation,
// eslint-disable-next-line react-hooks/rules-of-hooks
} = useFormValidation()

  export type Facility = z.infer<typeof FacilityValidation>;
  export type FacilityDetails = z.infer<typeof FacilityDetailsValidation>;
  export type FacilityDescriptionDetails = z.infer<typeof FacilityDescriptionDetailsValidation>;
  export type ComboType = z.infer<typeof ComboValidation>;
  export type Vehicle = z.infer<typeof VehicleValidation>
  export type VehicleDetails = z.infer<typeof VehicleDetailsValidation>
  export type VehicleDescriptionDetails = z.infer<typeof VehicleDescriptionDetailsValidation>
  export type Travel = z.infer<typeof TravelValidation>
  export type TravelDetails = z.infer<typeof TravelDetailsValidation>;
  export type TravelDescriptionDetails = z.infer<typeof TravelDescriptionDetailsValidation>;
  export type Logistic = z.infer<typeof LogisticValidation>
  export type LogisticDetails = z.infer<typeof LogisticDetailsValidation>
  export type Manufacturing = z.infer<typeof ManufacturingValidation>
  export type ManufacturingDetails = z.infer<typeof ManufacturingDetailsValidation>
  export type Commuting = z.infer<typeof CommutingValidation>
  export type CommutingDetails = z.infer<typeof CommutingDetailsValidation>;
  export type CommutingDescriptionDetails = z.infer<typeof CommutingDescriptionDetailsValidation>;
  export type Company = z.infer<typeof CompanyValidation>;
  export type ReportHeader = z.infer<typeof ReportHeaderValidation>
  export type UpdateUser = z.infer<typeof UpdateUserValidation>
  export type LogisticDescriptionDetails = z.infer<typeof LogisticDescriptionDetailsValidation>
  export type ManufacturingDescriptionDetails = z.infer<typeof ManufacturingDescriptionDetailsValidation>

export function useFormValidation() {
  const { dictionary } = useDictionary();

  return {
    UserFormValidation: z.object({
      email: z.string().email(dictionary?.validation.userForm.email || 'Invalid email'),
      password: z
        .string()
        .min(7, dictionary?.validation.userForm.password.min || 'Password too short')
        .max(15, dictionary?.validation.userForm.password.max || 'Password too long'),
    }),

    UserRegisterValidation: z.object({
      firstName: z.string().min(1, dictionary?.validation.userRegister.firstName),
      lastName: z.string().min(1, dictionary?.validation.userRegister.lastName),
      role: z.string().min(1, dictionary?.validation.userRegister.role || 'Role is required'),
      email: z.string()
        .email(dictionary?.validation.userRegister.email.invalid)
        .min(1, dictionary?.validation.userRegister.email.required || 'Email is required'),
      password: z.string().min(6, dictionary?.validation.userRegister.password.min || 'Password must be at least 6 characters long'),
      confirmPassword: z.string().min(6, dictionary?.validation.userRegister.password.confirm || 'Confirm password must be at least 6 characters long'),
      organisationName: z.string().min(1, dictionary?.validation.userRegister.organisationName || 'Organisation name is required'),
      city: z.string().min(1, dictionary?.validation.userRegister.city || 'City is required'),
      state: z.string().min(1, dictionary?.validation.userRegister.state || 'State is required'),
      country: z.string().min(1, dictionary?.validation.userRegister.country || 'Country is required'),
      postalCode: z.string().min(1, dictionary?.validation.userRegister.postalCode || 'Postal code is required'),
      typeLicense: z.string().transform((val) => {
        const parsed = Number(val);
        if (isNaN(parsed)) throw new Error(dictionary?.validation.userRegister.typeLicense || 'Invalid number');
        return parsed;
      }),
      telephoneUser: z.string().min(10, dictionary?.validation.userRegister.telephoneUser || 'Phone number is required'),
      timeZone: z.string().min(1, dictionary?.validation.userRegister.timeZone || 'Time zone is required'),
      language: z.string().min(1, dictionary?.validation.userRegister.language || 'Language is required'),
    }).refine((data) => data.password === data.confirmPassword, {
      message: dictionary?.validation.userRegister.password.mismatch || "Passwords don't match",
      path: ['confirmPassword'],
    }),

    UserRegisterByCompanyIdValidation: z.object({
      idCompany: z.number(),
      firstName: z.string().min(1, dictionary?.validation.userRegisterByCompanyId.firstName),
      lastName: z.string().min(1, dictionary?.validation.userRegisterByCompanyId.lastName),
      role: z.string().min(1, dictionary?.validation.userRegisterByCompanyId.role),
      email: z.string().email(dictionary?.validation.userRegisterByCompanyId.email.invalid).min(1, dictionary?.validation.userRegisterByCompanyId.required),
      password: z.string().min(6, dictionary?.validation.userRegisterByCompanyId.password.min),
      confirmPassword: z.string().min(6, dictionary?.validation.userRegisterByCompanyId.password.confirm),
      telephoneUser: z.string().min(10, dictionary?.validation.userRegisterByCompanyId.telephoneUser),
      timeZone: z.string().min(1, dictionary?.validation.userRegisterByCompanyId.timeZone),
      language: z.string().min(1, dictionary?.validation.userRegisterByCompanyId.language),
    }).refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: dictionary?.validation.userRegisterByCompanyId.password.mismatch,
      path: ['confirmPassword'],
    }),

    ForgotPasswordValidation: z.object({
      email: z.string().email(dictionary?.validation.forgotPassword.email.invalid).nonempty(dictionary?.validation.forgotPassword.email.required),
    }),

    UpdatePasswordValidation: z.object({
      email: z.string().email(dictionary?.validation.updatePassword.email.invalid).nonempty(dictionary?.validation.updatePassword.email.required),
      passwordOld: z.string().min(6, dictionary?.validation.updatePassword.passwordOld),
      passwordNew: z.string().min(6, dictionary?.validation.updatePassword.passwordNew),
      confirmPassword: z.string().min(6, dictionary?.validation.updatePassword.confirmPassword),
    }).refine((data) => data.passwordNew === data.confirmPassword, {
      message: dictionary?.validation.updatePassword.mismatch,
      path: ['confirmPassword'],
    }),

    UpdateUserValidation: z.object({
      idUSerControl: z.number().positive(),
      idCompany: z.number({ message: dictionary?.validation.updateUser.idCompany }),
      firstName: z.string().min(1, dictionary?.validation.updateUser.firstName),
      lastName: z.string().min(1, dictionary?.validation.updateUser.lastName),
      role: z.string().min(1, dictionary?.validation.updateUser.role),
      email: z.string().min(1, dictionary?.validation.updateUser.email),
      password: z.string().min(1, dictionary?.validation.updateUser.password),
      confirmPassword: z.string().min(6, dictionary?.validation.updateUser.confirmPassword),
      active: z.string().min(1, dictionary?.validation.updateUser.active),
      idUSerType: z.number({ message: dictionary?.validation.updateUser.idUSerType }),
      telephoneUser: z.string().min(1, dictionary?.validation.updateUser.telephoneUser),
      timeZone: z.string().min(1, dictionary?.validation.updateUser.timeZone),
      language: z.string().min(1, dictionary?.validation.updateUser.language)
    }).refine((data) => data.password === data.confirmPassword, {
      message: dictionary?.validation.updateUser.mismatch,
      path: ['confirmPassword'],
    }),

    CompanyValidation: z.object({
      idCompany: z.number().optional(),
      firstName: z.string().min(1, dictionary?.validation.companyV.firstName),
      lastName: z.string().min(1, dictionary?.validation.companyV.lastName),
      role: z.string().min(1, dictionary?.validation.companyV.role),
      email: z.string().min(1, dictionary?.validation.companyV.email),
      password: z.string().min(1, dictionary?.validation.companyV.password),
      organisatioName: z.string().min(1, dictionary?.validation.companyV.organisatioName),
      city: z.string().min(1, dictionary?.validation.companyV.city),
      state: z.string().min(1, dictionary?.validation.companyV.state),
      country: z.string().min(1, dictionary?.validation.companyV.country),
      postalCode: z.string().min(1, dictionary?.validation.companyV.postalCode),
      active: z.string().min(1, dictionary?.validation.companyV.active),
      registrationDate: z.string().min(1, dictionary?.validation.companyV.registrationDate),
      idTypeLicense: z.number(),
      address: z.string().min(1, dictionary?.validation.companyV.address),
      telephoneCompany: z.string().min(1, dictionary?.validation.companyV.telephoneCompany),
      size: z.string().min(1, dictionary?.validation.companyV.size),
    }),

    FacilityValidation: z.object({
      idControlFacility: z.string().transform(val => {
        const parsed = Number(val);
        if (isNaN(parsed)) throw new Error(dictionary?.validation.facility.idControlFacility.invalidNumber);
        return parsed;
      }).nullable(),
      idUserControl: z.number().nullable(),
      idFacility: z.string().min(1, dictionary?.validation.facility.idFacility.required).nullable(),
      propertyStatus: z.number().positive(dictionary?.validation.facility.propertyStatus.required),
      city: z.string().min(1, dictionary?.validation.facility.city.required).nullable(),
      country: z.string().min(1, dictionary?.validation.facility.country.required).nullable(),
      description: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),

    FacilityDetailsValidation: z.object({
      idControlFacilityDetails: z.number().int().optional(),
      invoiceId: z.string().optional(),
      unit: z.string().optional(),
      typeEquipment: z.string().optional(),

      idControlFacility: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.idControlFacility.required }),
      idType: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.idType.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.idType.invalidNumber);
          return parsed;
        }),
      idEmissionFactor: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.idEmissionFactor.required }),
      startDate: z.string().nonempty({ message: dictionary?.validation.facilityDetails.startDate.required }),
      endDate: z.string().nonempty({ message: dictionary?.validation.facilityDetails.endDate.required }),
      idTypeDetails: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.idTypeDetails.required }),
      amount: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.amount.required }),
      measureFugitive: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.measureFugitive.required }),
      purchased: z.number().min(1, { message: dictionary?.validation.facilityDetails.purchased.required }),
      delivered: z.number().min(1, { message: dictionary?.validation.facilityDetails.delivered.required }),
      returnsProducers: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.returnsProducers.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.returnsProducers.invalidNumber);
          return parsed;
        }),
      returnedUsers: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.returnedUsers.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.returnedUsers.invalidNumber);
          return parsed;
        }),
      returnedOffsiteRecycling: z.number().min(1, { message: dictionary?.validation.facilityDetails.returnedOffsiteRecycling.required }),
      partialNAmeplateCharged: z.number().min(1, { message: dictionary?.validation.facilityDetails.partialNAmeplateCharged.required }),
      amountYearsBeginning: z.number().min(1, { message: dictionary?.validation.facilityDetails.amountYearsBeginning.required }),
      amountYearsEnd: z.number().min(1, { message: dictionary?.validation.facilityDetails.amountYearsEnd.required }),
      chargedIntoEquipment: z.number().min(1, { message: dictionary?.validation.facilityDetails.amountYearsEnd.charged }),
      dontKnow: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.amountYearsEnd.dont }),
      offSiteRecycling: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.offSiteRecycling.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.offSiteRecycling.invalidNumber);
          return parsed;
        }),
      offSiteDestruction: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.offSiteDestruction.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.offSiteDestruction.valid);
          return parsed;
        }),
      densityPressurePartial: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.densityPressurePartial.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.densityPressurePartial.valid);
          return parsed;
        }),
      densityPressureFull: z
        .string()
        .nonempty({ message: dictionary?.validation.facilityDetails.densityPressureFull.required })
        .transform((val) => {
          const parsed = Number(val);
          if (isNaN(parsed)) throw new Error(dictionary?.validation.facilityDetails.densityPressureFull.valid);
          return parsed;
        }),
      active: z.number().int().min(1, { message: dictionary?.validation.facilityDetails.active.required }),
    }),

    FacilityDescriptionDetailsValidation: z.object({
      idControlFacilityDetails: z.number().int().optional(),
      idControlFacility: z.number().int().min(1, dictionary?.validation.facilityDescriptionDetails.idControlFacility.required),
      idType: z.union([z.string(), z.number()]).transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idTypeDescription: z.string().optional(),
      idEmissionFactor: z.number().int().min(1, dictionary?.validation.facilityDescriptionDetails.idEmissionFactor.required),
      idEmissionFactorDescription: z.string().optional(),
      startDate: z.string().min(1, dictionary?.validation.facilityDescriptionDetails.startDate.required),
      endDate: z.string().min(1, dictionary?.validation.facilityDescriptionDetails.endDate.required),
      invoiceId: z.string().optional(),
      idTypeDetails: z.number().int().min(1, dictionary?.validation.facilityDescriptionDetails.idTypeDetails.required),
      idTypeDetailsDescription: z.string().optional(),
      amount: z.number().int().min(1, dictionary?.validation.facilityDescriptionDetails.amount.required),
      unit: z.string().optional(),
      typeEquipment: z.string().optional(),
      measureFugitive: z.number().int().min(0, dictionary?.validation.facilityDescriptionDetails.fugitive.required),
      purchased: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      delivered: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnsProducers: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnedUsers: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      returnedOffsiteRecycling: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      partialNAmeplateCharged: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      amountYearsBeginning: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      amountYearsEnd: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      chargedIntoEquipment: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      dontKnow: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      offSiteRecycling: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      offSiteDestruction: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      densityPressurePartial: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      densityPressureFull: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      active: z.number().int().min(0, dictionary?.validation.facilityDescriptionDetails.fugitive.active),
      firstName: z.string().min(0, dictionary?.validation.facilityDescriptionDetails.fugitive.first),
    }),

    VehicleValidation: z.object({
      idControlVehicle: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idStatus: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      name: z.string().optional(),
      idCboBrand: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idCboModel: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      idCboType: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.vehicle.idStatus.invalidNumber)
        return parsed
      }),
      licensePlate: z.string().optional(),
      active: z.number().max(1).min(0).default(1),
    }),

    VehicleDetailsValidation: z.object({
      idControlVehicleDetails: z
        .number()
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer)
        .optional(),
      idControlVehicle: z
        .number({ required_error: dictionary?.validation.vehicleDetails.idControlVehicle.required })
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.vehicleDetails.idEmissionFactor.required })
        .int(dictionary?.validation.vehicleDetails.idEmissionFactor.integer),
      startDate: z
        .string({ required_error: dictionary?.validation.vehicleDetails.startDate.required })
        .datetime({ message: dictionary?.validation.vehicleDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.vehicleDetails.endDate.required })
        .datetime({ message: dictionary?.validation.vehicleDetails.endDate.datetime }),
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
        .number({ required_error: dictionary?.validation.vehicleDetails.endDate.active })
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer),
    }),

    VehicleDescriptionDetailsValidation: z.object({
      idControlVehicleDetails: z
        .number()
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer)
        .optional(),
      idControlVehicle: z
        .number({ required_error: dictionary?.validation.vehicleDetails.idControlVehicle.required })
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.vehicleDetails.idEmissionFactor.required })
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer),
      idEmissionFactorDescription: z.string().min(1),
      startDate: z
        .string({ required_error: dictionary?.validation.vehicleDetails.startDate.required })
        .datetime({ message: dictionary?.validation.vehicleDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.vehicleDetails.endDate.required })
        .datetime({ message: dictionary?.validation.vehicleDetails.endDate.datetime }),
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
        .number({ required_error: dictionary?.validation.vehicleDetails.endDate.active })
        .int(dictionary?.validation.vehicleDetails.idControlVehicle.integer),
    }),
    
    TravelValidation: z.object({
      idControlTravel: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.travel.idControlTravel.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idTravel: z.string().min(1, dictionary?.validation.travel.idTravel.required),
      description: z.string().optional(),
      active: z.number().max(1).min(0).default(1),
    }),
    
    TravelDetailsValidation: z.object({
      idControlTravelDetails: z
        .number()
        .int(dictionary?.validation.travelDetails.idControlTravelDetails.integer)
        .optional(),
      idControlTravel: z
        .number({ required_error: dictionary?.validation.travelDetails.idControlTravel.required })
        .int(dictionary?.validation.travelDetails.idControlTravel.required),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.travelDetails.idEmissionFactor.required })
        .int(dictionary?.validation.travelDetails.idEmissionFactor.integer),
      startDate: z
        .string({ required_error: dictionary?.validation.travelDetails.startDate.required })
        .datetime({ message: dictionary?.validation.travelDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.travelDetails.endDate.required })
        .datetime({ message: dictionary?.validation.travelDetails.endDate.datetime }),
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
        .number({ required_error: dictionary?.validation.travelDetails.active.required })
        .int(dictionary?.validation.travelDetails.integer),
    }),
    
    TravelDescriptionDetailsValidation: z.object({
      idControlTravelDetails: z
        .number()
        .int(dictionary?.validation.travelDescriptionDetails.idControlTravelDetails.integer)
        .optional(),
      idControlTravel: z
        .number({ required_error: dictionary?.validation.travelDescriptionDetails.idControlTravel.required })
        .int(dictionary?.validation.travelDescriptionDetails.idControlTravel.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.travelDescriptionDetails.idEmissionFactor.required })
        .int(dictionary?.validation.travelDescriptionDetails.idEmissionFactor.integer),
      idEmissionFactorDescription: z.string().min(1),
      startDate: z
        .string({ required_error: dictionary?.validation.travelDescriptionDetails.startDate.required })
        .datetime({ message: dictionary?.validation.travelDescriptionDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.travelDescriptionDetails.endDate.required })
        .datetime({ message: dictionary?.validation.travelDescriptionDetails.endDate.datetime }),
      invoiceId: z
        .string()
        .optional(),
      idTravelCboType: z
        .number({ required_error: dictionary?.validation.travelDescriptionDetails.idTravelCboType.required })
        .int(dictionary?.validation.travelDescriptionDetails.idTravelCboType.integer),
      travelCboTypeDescription: z.string().min(1),
      origin: z
        .string()
        .optional(),
      destiny: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation.travelDescriptionDetails.active.required })
        .int(dictionary?.validation.travelDescriptionDetails.active.integer),
    }),

    LogisticValidation: z.object({
      idControlLogistics: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.logistic.idControlLogistics.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      origin: z.string().nullable(),
      destination: z.string().nullable(),
      originzc: z.string().nullable(),
      destinationzc: z.string().nullable(),
      loadLogistic: z.string().nullable(),
      client: z.string().nullable(),
      idCboStatus: z.number().positive(dictionary?.validation.logistic.idCboStatus.positive),
      name: z.string().nullable(),
      idTravelCboType: z.number().positive(dictionary?.validation.logistic.idCboStatus.positive),
      idCboModel: z.number().positive(dictionary?.validation.logistic.idCboStatus.positive),
      idCboBrand: z.number().positive(dictionary?.validation.logistic.idCboStatus.positive),
      licensePlate: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),

    LogisticDetailsValidation: z.object({
      idControlLogisticsDetails: z
        .number()
        .int(dictionary?.validation.logisticDetails.idControlLogisticsDetails.integer)
        .optional(),
      idControlLogistics: z
        .number({ required_error: dictionary?.validation.logisticDetails.idControlLogistics.required })
        .int(dictionary?.validation.logisticDetails.idControlLogistics.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.logisticDetails.idEmissionFactor.required })
        .int(dictionary?.validation.logisticDetails.idEmissionFactor.integer),
      origin: z.string().optional(),
      destiny: z.string().optional(),
      startDate: z
        .string({ required_error: dictionary?.validation.logisticDetails.startDate.required })
        .datetime({ message: dictionary?.validation.logisticDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.logisticDetails.endDate.required })
        .datetime({ message: dictionary?.validation.logisticDetails.endDate.datetime }),
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
        .number({ required_error: dictionary?.validation.logisticDetails.active.required })
        .int(dictionary?.validation.logisticDetails.active.integer),
    }),
    
    ManufacturingValidation: z.object({
      idControlManufacturing: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.manufacturing.idControlManufacturing.invalidNumber)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      process: z.string().min(1, dictionary?.validation.manufacturing.process.minLength).nullable(),
      idFacility: z.string().min(1, dictionary?.validation.manufacturing.idFacility.required),
      idTypeEquipment: z.number().positive(dictionary?.validation.manufacturing.idTypeEquipment.positive),
      idTypeFuelUsed: z.number().positive(dictionary?.validation.manufacturing.idTypeFuelUsed.positive),
      idTypeEquipmentCode: z.number().positive(dictionary?.validation.manufacturing.idTypeEquipmentCode.positive),
      active: z.number().max(1).min(0).default(1),
    }),
    
    ManufacturingDetailsValidation: z.object({
      idControlManufacturingDetails: z
        .number()
        .int(dictionary?.validation.manufacturingDetails.idControlManufacturingDetails.integer)
        .optional(),
      idControlManufacturing: z
        .number({ required_error: dictionary?.validation.manufacturingDetails.idControlManufacturing.required })
        .int(dictionary?.validation.manufacturingDetails.idControlManufacturing.integer),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.manufacturingDetails.idEmissionFactor.required })
        .int(dictionary?.validation.manufacturingDetails.idEmissionFactor.integer),
      invoiceId: z
        .string()
        .optional(),
      startDate: z
        .string({ required_error: dictionary?.validation.manufacturingDetails.startDate.required })
        .datetime({ message: dictionary?.validation.manufacturingDetails.startDate.datetime }),
      endDate: z
        .string({ required_error: dictionary?.validation.manufacturingDetails.endDate.required })
        .datetime({ message: dictionary?.validation.manufacturingDetails.endDate.datetime }),
      amount: z
        .string().transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.manufacturingDetails.amount.invalidNumber)
          return parsed
        })
        .optional(),
      unit: z
        .string()
        .optional(),
      active: z
        .number({ required_error: dictionary?.validation.manufacturingDetails.active.required })
        .int(dictionary?.validation.manufacturingDetails.active.integer),
    }),

    CommutingValidation: z.object({
      idControlCommuting: z.string().transform(val => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.commuting.facilityRequired)
        return parsed
      }).nullable(),
      idUserControl: z.number().nullable(),
      idControlFacility: z.string().min(1, dictionary?.validation.commuting.invalidNumber),
      description: z.string().nullable(),
      active: z.number().max(1).min(0).default(1),
    }),

    CommutingDetailsValidation: z.object({
      idControlCommutingDetails: z
        .number({ required_error: dictionary?.validation.commutingDetails.control })
        .int(dictionary?.validation.commutingDetails.integer)
        .optional(),
      idControlCommuting: z
        .number({ required_error: dictionary?.validation.commutingDetails.required })
        .int(dictionary?.validation.commutingDetails.integer),
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
        .string({ required_error: dictionary?.validation.commutingDetails.fuel })
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.commutingDetails.number)
          return parsed
        })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
      active: z
        .number()
        .int(dictionary?.validation.commutingDetails.integer)
        .default(1),
    }),

    CommutingDescriptionDetailsValidation: z.object({
      idControlCommutingDetails: z
        .number({ required_error: dictionary?.validation.details.control })
        .int(dictionary?.validation.details.mode),
      idControlCommuting: z
        .number({ required_error: dictionary?.validation.details.commu })
        .int(dictionary?.validation.details.mode),
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
        .string({ required_error: dictionary?.validation.details.fuel })
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.details.number)
          return parsed
        })/* .refine(val => val >= 0, { message: 'Fuel efficiency is required' }) */,
      active: z
        .number()
        .int(dictionary?.validation.details.positive)
        .default(1),
      idCommutingCboModeTransport: z.number().positive().int(),
      cboModeTransportDescription: z.string().min(1),
      activity: z.string().min(1),
      unit: z.string().min(1),
      status: z.string().min(1),
      idUserControl: z.string().min(1),
    }),

    // CompanyValidation: z.object({
    //   idCompany: z.number().optional(),
    //   firstName: z.string().min(1, dictionary?.validation.company.first),
    //   lastName: z.string().min(1, dictionary?.validation.company.last),
    //   role: z.string().min(1, dictionary?.validation.company.role),
    //   email: z.string().min(1, dictionary?.validation.company.email),
    //   password: z.string().min(1, dictionary?.validation.company.passw),
    //   organisatioName: z.string().min(1, dictionary?.validation.company.organ),
    //   city: z.string().min(1, dictionary?.validation.company.city),
    //   state: z.string().min(1, dictionary?.validation.company.state),
    //   country: z.string().min(1, dictionary?.validation.company.country),
    //   postalCode: z.string().min(1, dictionary?.validation.company.postal),
    //   active: z.string().min(1, dictionary?.validation.company.active),
    //   registrationDate: z.string().min(1, dictionary?.validation.company.regis),
    //   idTypeLicense: z.number(),
    //   address: z.string().min(1, dictionary?.validation.company.add),
    //   telephoneCompany: z.string().min(1, dictionary?.validation.company.tel),
    //   size: z.string().min(1, dictionary?.validation.company.size),
    // }),

    ReportHeaderValidation: z.object({
      idControl: z.number().optional(),
      idUserControl: z.number().min(1, dictionary?.validation.report.id),
      preparedBy: z.string().optional(),
      facilityId: z.string().optional(),
      idType: z.string().transform((val) => {
        const parsed = Number(val)
        if (isNaN(parsed)) throw new Error(dictionary?.validation.report.number)
        return parsed
      }),
      typeDescription: z.string().optional(),
      startDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: dictionary?.validation.report.start,
      }),
      endDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: dictionary?.validation.report.end,
      }),
      active: z.number().min(1, dictionary?.validation.report.active).default(() => 1),
    }),

    ComboValidation: z.object({
      idControl: z.number(),
      description: z.string(),
      units: z.string(),
    }),

    LogisticDescriptionDetailsValidation: z.object({
      idControlLogisticsDetails: z
        .number()
        .int(dictionary?.validation.logistics.number)
        .optional(),
      idControlLogistics: z
        .number({ required_error: dictionary?.validation.logistics.control })
        .int(dictionary?.validation.logistics.number),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.logistics.emi })
        .int(dictionary?.validation.logistics.number),
      idEmissionFactorDescription: z.string().optional(),
      origin: z.string().optional(),
      destiny: z.string().optional(),
      startDate: z
        .string({ required_error: dictionary?.validation.logistics.start })
        .datetime({ message: dictionary?.validation.logistics.date }),
      endDate: z
        .string({ required_error: dictionary?.validation.logistics.end })
        .datetime({ message: dictionary?.validation.logistics.date }),
      invoiceId: z.string().optional(),
      idFuelType: z
        .union([z.string(), z.number()])
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.logistics.in)
          return parsed
        }),
      fuelTypeDescription: z.string().optional(),
      amount: z
        .union([z.string(), z.number()])
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.logistics.in)
          return parsed
        }),
      unit: z.union([z.string(), z.null()]).optional(),
      active: z
        .number({ required_error: dictionary?.validation.logistics.active })
        .int(dictionary?.validation.logistics.number),
    }),
    
    ManufacturingDescriptionDetailsValidation: z.object({
      idControlManufacturingDetails: z
        .number()
        .int(dictionary?.validation.logistics.number)
        .optional(),
      idControlManufacturing: z
        .number({ required_error: dictionary?.validation.logistics.fac })
        .int(dictionary?.validation.logistics.number),
      idEmissionFactor: z
        .number({ required_error: dictionary?.validation.logistics.emi })
        .int(dictionary?.validation.logistics.number),
      idEmissionFactorDescription: z.string().optional(),
      invoiceId: z.string().optional(),
      startDate: z
        .string({ required_error: dictionary?.validation.logistics.start})
        .datetime({ message: dictionary?.validation.logistics.date }),
      endDate: z
        .string({ required_error: dictionary?.validation.logistics.end })
        .datetime({ message: dictionary?.validation.logistics.date }),
      amount: z
        .union([z.string(), z.number()])
        .transform(val => {
          const parsed = Number(val)
          if (isNaN(parsed)) throw new Error(dictionary?.validation.logistics.in)
          return parsed
        })
        .optional(),
      unit: z.string().optional(),
      active: z
        .number({ required_error: dictionary?.validation.logistics.active })
        .int(dictionary?.validation.logistics.number),
      }   
    ) 
  }
}

// export type Facility = z.infer<typeof FacilityValidation>;
// export type FacilityDetails = z.infer<typeof FacilityDetailsValidation>;
// export type FacilityDescriptionDetails = z.infer<typeof FacilityDescriptionDetailsValidation>; 
// export type ComboType = z.infer<typeof ComboValidation>; 
// export type Vehicle = z.infer<typeof VehicleValidation>
// export type VehicleDetails = z.infer<typeof VehicleDetailsValidation>
// export type VehicleDescriptionDetails = z.infer<typeof VehicleDescriptionDetailsValidation>
// export type Travel = z.infer<typeof TravelValidation>
// export type TravelDetails = z.infer<typeof TravelDetailsValidation>;
// export type TravelDescriptionDetails = z.infer<typeof TravelDescriptionDetailsValidation>;
// export type Logistic = z.infer<typeof LogisticValidation>
// export type LogisticDetails = z.infer<typeof LogisticDetailsValidation>
// export type Manufacturing = z.infer<typeof ManufacturingValidation>
// export type ManufacturingDetails = z.infer<typeof ManufacturingDetailsValidation>
// export type Commuting = z.infer<typeof CommutingValidation>
// export type CommutingDetails = z.infer<typeof CommutingDetailsValidation>;
// export type CommutingDescriptionDetails = z.infer<typeof CommutingDescriptionDetailsValidation>;
// export type Company = z.infer<typeof CompanyValidation>;
// export type ReportHeader = z.infer<typeof ReportHeaderValidation>
// export type UpdateUser = z.infer<typeof UpdateUserValidation>
// export type LogisticDescriptionDetails = z.infer<typeof LogisticDescriptionDetailsValidation>
// export type ManufacturingDescriptionDetails = z.infer<typeof ManufacturingDescriptionDetailsValidation>









