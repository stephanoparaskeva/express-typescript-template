import * as mware from './common-mware';

// all common middleware used by express in order of execution.
export default [
  mware.handleLogger,
  mware.handleHelmet,
  mware.handleCors,
  mware.handleBodyUrlEncoded,
  mware.handleBodyParser,
  mware.handleCompression,
  mware.handleCookies,
];
