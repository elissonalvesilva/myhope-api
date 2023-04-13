export interface SchemaValidator {
  validate(params: any): Promise<Error | null>
}