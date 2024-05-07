import { Transform } from 'node:stream';

export const transform = <I, J>(fn: (payload: I) => J): Transform =>
  new Transform({
    objectMode: true,
    async transform(payload: I, _enc, cb): Promise<void> {
      try {
        const result = await fn(payload);

        if (result !== undefined) {
          cb(null, result);
        } else {
          cb(null);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('unhandled error encountered in transform stream', err);
        cb(null);
      }
    },
  });
