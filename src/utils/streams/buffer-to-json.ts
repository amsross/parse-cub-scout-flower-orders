import { Transform } from 'node:stream';

import { transform } from './transform';

export const bufferToJSON = (): Transform =>
  transform((payload: Buffer) => JSON.parse(payload.toString('utf8')));
