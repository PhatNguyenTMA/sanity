export const EMAIL_VALIDATION_REGEX = /[a-zA-Z0-9._%+-]+@([a-zA-Z-0-9]{2,}\.)+[a-zA-Z]{2,}$/;
export const SUB_DOMAIN_REGEX = /^[a-zA-Z0-9]+$/;
export const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
export const MOBILE_REGEX = /\+?(0|\d{1,3})?[0-9-.() ]{6,15}$/;
export const DATE_TIME_ISO_8601 = ["YYYY-MM-DDTHH:mm:ss.SSSSZ", "YYYY-MM-DDTHH:mm:ssZ"];
export const DEFAULT_DESCRIPTION_DATE_FORMAT = "D MMM YYYY";