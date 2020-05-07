export default interface FindOne<T> {
  findOne(id: number): Promise<T>
}
