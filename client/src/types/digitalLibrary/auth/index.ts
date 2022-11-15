interface CommonCredentials {
  email: string
  password: string
}

export interface AuthConfigParams extends CommonCredentials {
  name: string
  emailBackup: string
}

export interface AuthLoginParams extends CommonCredentials { }
