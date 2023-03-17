export default interface Mapper<T> {
  toDomain(raw: any): T;
  toPersistence (t: T): any;
}