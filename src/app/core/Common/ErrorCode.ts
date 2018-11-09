import {HTTP_STATUS_CODE} from "./HttpStatusCode";
import {RESOURCES} from "./ResourceType";
import {
    USER as USERS
} from "./FieldName";

namespace ERRORCODE {

    /**
     * ERROR CODE FOR AUTH (300 -> 399)
     */
    export const AUTH = {
        UNAUTHORIZED: {
            code: 100300,
            message: "Unauthorized",
            field: "",
            resource: RESOURCES.USER,
            httpStatus: HTTP_STATUS_CODE.UNAUTHORIZED
        },
        NO_PERMISSION: {
            code: 100301,
            message: "Unauthorized",
            field: "",
            resource: RESOURCES.USER,
            httpStatus: HTTP_STATUS_CODE.UNAUTHORIZED
        },
        EMAIL_PASSWORD_INVALID: {
            code: 100302,
            message: "Invalid email or password",
            field: "",
            resource: RESOURCES.USER
        },
        TOKEN_EXPIRED: {
            code: 100303,
            message: "Token is expired",
            field: "",
            resource: RESOURCES.TOKEN
        },
        REQUEST_TIMESTAMP_INVALID: {
            code: 100304,
            message: "Request timestamp is invalid",
            field: "",
            resource: ""
        },
        REQUEST_INVALID: {
            code: 100305,
            message: "Request is longer than REQUEST_TIMEOUT",
            field: "",
            resource: ""
        },
        TOKEN_INVALID: {
            code: 100306,
            message: "Token is invalid",
            field: "",
            resource: RESOURCES.TOKEN
        },
        SIGNATURE_INVALID: {
            code: 100307,
            message: "Signature is invalid",
            field: "",
            resource: RESOURCES.TOKEN
        },
        NONCE_INVALID: {
            code: 100308,
            message: "Nonce is invalid",
            field: "",
            resource: RESOURCES.TOKEN
        }
    };

    /**
     * ERROR CODE FOR USER (600 -> 699)
     */
    export const USER = {
        EXISTED_USER: {
            code: 100601,
            message: "User is already existed",
            field: USERS.EMAIL,
            resource: RESOURCES.USER
        },
        EMAIL_INVALID: {
            code: 100603,
            message: "Email is invalid",
            field: "",
            resource: RESOURCES.USER
        },
        DATA_INVALID: {
            code: 100604,
            message: "User data is invalid",
            field: "",
            resource: RESOURCES.USER
        },
        EXCEPTION: {
            code: 100605,
            message: "User exception",
            field: "",
            resource: RESOURCES.USER
        },
        USER_UNAUTHORIZED: {
            code: 100606,
            message: "User unauthorized",
            field: "",
            resource: RESOURCES.USER,
            httpStatus: HTTP_STATUS_CODE.UNAUTHORIZED
        },
        OLD_PASSWORD_INVALID: {
            code: 100607,
            message: "The old password does not match",
            field: "",
            resource: RESOURCES.USER
        },
        USER_IS_DISABLED: {
            code: 100608,
            message: "The user was disabled",
            field: "",
            resource: RESOURCES.USER
        },
        ID_NOT_EXISTS: {
            code: 100609,
            message: "The User id is not existed",
            field: USERS.ID,
            resource: RESOURCES.USER
        },
        FIRST_NAME_REQUIRED: {
            code: 100610,
            message: "First name is required",
            field: USERS.FIRST_NAME,
            resource: RESOURCES.USER
        },
        LAST_NAME_REQUIRED: {
            code: 100611,
            message: "Last name is required",
            field: USERS.LAST_NAME,
            resource: RESOURCES.USER
        },
        PASSWORD_REQUIRED: {
            code: 100612,
            message: "Password is required",
            field: USERS.PASSWORD,
            resource: RESOURCES.USER
        },
        ROLE_CANT_NOT_SET_TO_USER: {
            code: 100613,
            message: "Role can't set to user",
            field: USERS.PASSWORD,
            resource: RESOURCES.USER
        },
        USER_ALREADY_ACTIVATED: {
            code: 100614,
            message: "The user is already activated",
            field: "",
            resource: RESOURCES.USER
        },
        USER_CANNOT_DISABLE_THEMSELF: {
            code: 100618,
            message: "User cannot disable themself",
            field: "",
            resource: RESOURCES.USER
        }
    };

    /**
     * ERROR CODE FOR VALIDATION (1800 -> 1899)
     */
    export const VALIDATION = {
        KEY_NOT_FOUND: {
            code: 1001800,
            message: "Key was not found",
            resource: "_",
            httpStatus: HTTP_STATUS_CODE.NOT_FOUND
        },
        FIELD_IS_MISSING: {
            code: 1001801,
            message: "Field is missing",
            resource: "_"
        },
        FIELD_MUST_BE_GT_THAN: {
            code: 1001802,
            message: "Field must be greater than",
            resource: "_"
        },
        FIELD_MUST_BE_GT_OR_EQ: {
            code: 1001803,
            message: "Field must be greater or equal",
            resource: "_"
        },
        FIELD_MUST_BE_LT_THAN: {
            code: 1001804,
            message: "Field must be little than",
            resource: "_"
        },
        FIELD_MUST_BE_LT_OR_EQ: {
            code: 1001805,
            message: "Field must be little or equal",
            resource: "_"
        },
        FIELD_MUST_BE_IN_RANGE: {
            code: 1001806,
            message: "Field must be in range",
            resource: "_"
        },
        FIELD_MUST_BE_IN_ENUM: {
            code: 1001807,
            message: "Field must be enum",
            resource: "_"
        },
        FIELD_MIN_LENGTH_VIOLATED: {
            code: 1001808,
            message: "Field min length violated",
            resource: "_"
        },
        FIELD_MAX_LENGTH_VIOLATED: {
            code: 1001809,
            message: "Field max length violated",
            resource: "_"
        },
        FIELD_MUST_BE_EMAIL: {
            code: 1001810,
            message: "Field must be an email",
            resource: "_"
        },
        FIELD_MUST_BE_NOT_EMPTY_IF_PROVIDED: {
            code: 1001811,
            message: "Field must be not empty if provided",
            resource: "_"
        },
        FIELD_MUST_BE_DATE: {
            code: 1001812,
            message: "Field must be a date",
            resource: "_"
        },
        FIELD_MUST_BE_NUMBER: {
            code: 1001813,
            message: "Field must be a number",
            resource: "_"
        },
        FIELD_MUST_BE_BOOLEAN: {
            code: 1001814,
            message: "Field must be a boolean",
            resource: "_"
        },
        FIELD_MUST_BE_ID: {
            code: 1001815,
            message: "Field must be id",
            resource: "_"
        },
        FIELD_MUST_BE_ARRAY: {
            code: 1001816,
            message: "Field must be array",
            resource: "_"
        },
        FIELD_MUST_BE_URL: {
            code: 1001817,
            message: "Field must be url",
            resource: "_"
        },
        USER_EXIST: {
            code: 1001817,
            message: "User is already exist",
            resource: RESOURCES.USER
        }
    };
}

export = ERRORCODE;