export default class MissingParam extends ReferenceError {
  constructor(readonly param: string) {
    super()
    this.name = 'Missing Param'
    this.message = param
    this.stack = `Missing Param: ${param}`
  }
}
