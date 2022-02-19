export interface LoginResponse {
  jwtToken: string,
  expires: Date,
  userName: string
}
