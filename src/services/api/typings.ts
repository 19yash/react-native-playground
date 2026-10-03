import { AxiosHeaders } from 'axios'

export interface HttpHeaders extends AxiosHeaders {
  'x-authorization': string
}
