import { OnlyProperties } from '@general/ModelStructure'

export default interface Create<T> {
  create(data: OnlyProperties<T>): Promise<T>
}
