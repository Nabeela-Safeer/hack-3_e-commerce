import { type SchemaTypeDefinition } from 'sanity'

import { productSchema } from './product'
import {Order} from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, Order],
}
