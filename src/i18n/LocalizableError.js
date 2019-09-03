import ExtendableError from 'es6-error';
import type { MessageDescriptor } from 'react-intl';

// Base class to allow wrapping a localizable message into an ES6-error
class LocalizableError extends ExtendableError {
  id: string;
  defaultMessage: string;
  values: Object;

  constructor({
    id,
    defaultMessage,
    values
  }:{ ...$Exact<MessageDescriptor>, values?: Object}) {
    if (!id) throw new Error('id:string is required.');
    if (!defaultMessage) throw new Error('defaultMessage:string is required.');
    const json = values === undefined ? 'undefined' : JSON.stringify(values);
    super(`${id}: ${json}`);
    this.id = id;
    this.defaultMessage = defaultMessage;
    this.values = values || {};
  }
}

export default LocalizableError;
