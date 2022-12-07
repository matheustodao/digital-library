/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type TOptions = AxiosRequestConfig
type TPath = string
interface TMethodParams {
  path?: TPath
  options?: TOptions
}

interface TMethodBodyParams extends TMethodParams {
  data: any
}

export default class HttpClient {
  readonly baseUrl: string = ''
  prefixPath: string = ''
  info: AxiosResponse<any, any> | undefined

  constructor(readonly url: string) {}

  async get({ path, options }: TMethodParams = {}) {
    return await this.makeRequest({
      method: 'get',
      ...options
    }, path)
  }

  async post({ path, data, options }: TMethodBodyParams) {
    return await this.makeRequest({
      method: 'post',
      data,
      ...options
    }, path)
  }

  async patch({ path, data, options }: TMethodBodyParams) {
    return await this.makeRequest({
      method: 'patch',
      data,
      ...options
    }, path)
  }

  async put({ path, data, options }: TMethodBodyParams) {
    return await this.makeRequest({
      method: 'put',
      data,
      ...options
    }, path)
  }

  async delete ({ path, options }: TMethodParams = {}) {
    return await this.makeRequest({
      method: 'delete',
      ...options
    }, path)
  }

  async makeRequest(options: TOptions, path?: TPath) {
    const headers = new Headers()

    if (options.data) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value as string)
      })
    }

    let baseURL = this.url

    if (this.prefixPath) {
      baseURL = `${this.url}${this.prefixPath}`
    }

    const response = await axios({
      baseURL: `${baseURL}${path ?? ''}`,
      method: options.method,
      data: options.data,
      headers: options.headers,
      ...options
    })

    let responseBody: any = null
    this.info = response

    // @ts-ignore
    const contentType: string | undefined = response.headers.get('content-type')

    if (contentType?.includes('application/json') || contentType?.includes('application/vnd')) {
      responseBody = await response.data
    }

    if (response.status >= 200 && response.status <= 299) {
      return responseBody
    }

    const messageError = response.data?.error || `${response.status} - ${response.statusText}`

    throw new Error(messageError)
  }
}
