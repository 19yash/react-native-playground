import { RawAxiosRequestHeaders } from 'axios'

export interface HttpHooksError {
  errMsg: string
  errResponse: any
}

export interface HttpHooksResponse<T> {
  loading: boolean
  response?: HttpResponse<T>
  execute: (
    args?: unknown,
    url?: string,
  ) => Promise<HttpResponse<T> | undefined>
  error: string
  errorDetails: HttpHooksError | null
  ok?: boolean | null
}

export interface HttpHooksOptions {
  payload?: unknown
  params?: object
  lazy?: boolean
  headers?: RawAxiosRequestHeaders
}

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

export type HttpResponse<T> = ApiResponse<T>

export type ISODateString = string

export interface FileResource {
  file_name: string
  file_size_bytes: number
  mime_type: string
  url: string
}

export interface Address {
  id: number
  address_1: string
  address_2: string
  city: string
  state: string
  country: string
  pincode: string
  created_at: ISODateString
  updated_at: ISODateString
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export interface Customer {
  id: string
  first_name: string
  last_name: string
  dob: string // yyyy-mm-dd
  gender: Gender
  aadhaar_number: string
  is_profile_completed: boolean
  created_at: ISODateString
}

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'DECLINED'

export interface User {
  id: string
  mobile: string
  email: string
  is_active: boolean
  verification_process_status: VerificationStatus
  verification_notes: string
  created_at: ISODateString
  updated_at: ISODateString
  verified_on?: ISODateString | null
  declined_on?: ISODateString | null
}

export interface UserProfileData {
  address: Address
  customer: Customer
  kyc_document: FileResource
  profile_image: FileResource
  user: User
}

export type GetProfileResponse = HttpResponse<UserProfileData>

export interface AuthData {
  access: string
  refresh: string
}

export interface AuthVerificationResponse {
  data: AuthData
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface City {
  id: string
  name: string
  state: string
  country: string
  location: Coordinates
}

export interface RoadTripDetails {
  vehicle_number: string
  vehicle_name: string
  document_url: string
}

export interface TrainTripDetails {
  train_name: string
  pnr_number: string
  document_url: string
}

export interface BusTripDetails {
  bus_number: string
  operator_name: string
  document_url: string
}

export interface AirTripDetails {
  airline_name: string
  ticket_number: string
  pnr_number: string
  document_url: string
}

export enum TripStatus {
  planned = 'PLANNED',
  completed = 'COMPLETED',
}

export enum TransportMode {
  train = 'TRAIN',
}

export interface Trip {
  id: number
  road_details: RoadTripDetails | null
  train_details: TrainTripDetails | null
  bus_details: BusTripDetails | null
  air_details: AirTripDetails | null
  expected_earning: number
  from_city_detail: City
  to_city_detail: City
  created_at: string
  updated_at: string
  departure_at: string
  arrival_at: string
  transport_mode: TransportMode
  total_capacity_kg: string
  available_capacity_kg: string
  available_length_cm: string
  available_breadth_cm: string
  available_height_cm: string
  price_per_kg: string
  pickup_location: string
  dropup_location: string
  notes?: string
  buffer_time_minutes: number
  max_packages_allowed: number
  status: TripStatus
  cancel_reason?: string
  cancelled_at: string | null
  lock_after_accept?: boolean
  carrier: string
}

export interface Pagination {
  has_next: boolean
  has_previous: boolean
  page: number
  page_size: number
  total_pages: number
  total_records: number
}

export interface GetTripsResponse {
  results: Trip[]
  pagination: Pagination
}
