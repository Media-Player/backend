export default interface Find<T> {
  find(): Promise<T[]>
}
