import { Transform } from 'node:stream';

export const collect = <I>(): Transform => {
  const payloads: I[] = [];

  return new Transform({
    objectMode: true,
    transform(payload, _enc, cb): void {
      try {
        payloads.push(payload);

        cb(null);
      } catch (err) {
        cb(err as Error);
      }
    },
    flush(cb): void {
      cb(null, payloads);
    },
  });
};
