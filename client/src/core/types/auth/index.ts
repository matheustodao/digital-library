interface CommonCredentials {
  email: string
  password: string
}

export interface AuthConfigParams extends CommonCredentials {
  name: string
  backupEmail: string | null
}

export interface AuthLoginParams extends CommonCredentials { }
