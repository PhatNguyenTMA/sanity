import {MOBILE_REGEX} from "./Constant";
import mongoose = require("mongoose");
const _ = require("lodash");

export const RESOURCES = {
    PRODUCT: "product",
    USER: "user",
    TOKEN: "token"
};

export const GENDER = {
    MALE: "male",
    FEMALE: "female"
};

export const CURRENCY_TYPE = {
    AUD: "AUD",
    USD: "USD",
    GBP: "GBP"
};

export const STATUS = {
    ENABLED: "enabled",
    DISABLED: "disabled",
    LOCKED: "locked"
};

export const CHANNEL_TYPE = {
    EMAIL: "email",
    SMS: "sms"
};

export const ACCOUNT_STATUS_TYPE = {
    ENABLED: "enabled",
    DISABLED: "disabled",
    LOCKED: "locked"
};

export const OUTBOX_TYPE = {
    EMAIL: "email",
    SMS: "sms"
};

export const SCHEMA = {
    PRICE_TYPE: {
        fee: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            enum: {
                values: _.toArray(CURRENCY_TYPE),
                default: CURRENCY_TYPE.USD
            }
        }
    },
    CURRENCY_TYPE: {
        type: String,
        enum: {
            values: _.toArray(CURRENCY_TYPE),
            default: CURRENCY_TYPE.USD
        }
    },
    NUMBER_TYPE: {
        type: Number,
        default: 0
    },
    PHONE_TYPE: {
        type: String,
        match: MOBILE_REGEX
    },
    EMAIL_TYPE: {
        type: String,
        trim: true,
        match: /.+\@.+\..+/
    },
    DATE_DEFAULT_TYPE: {
        type: Date,
        default: Date.now
    },
    CREATED_BY_TYPE: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: "createdBy cannot be null"
    },

    DB_REF: {
        ACCOUNT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "accounts"
        },
        USER: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        CONTACT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "contacts"
        },
        TOKEN: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tokens"
        },
        CAMPAIGN: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "campaigns"
        },
        CONTENT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "contents"
        },
        CHANNEL: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channels"
        },
        LINK: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "links"
        },
        WHITELABEL: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "whitelabels"
        },
        AUTOMATION: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "automations"
        },
        AUTOMATION_STEP: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "automationSteps"
        },
        AUTOMATION_OBJECT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "automationObjects"
        },
        FIELD: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fields"
        },
        TEMPLATE: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "templates"
        },
        CLICK: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "clicks"
        },
        WEBFORM_SUBMISSION: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "webformSubmissions"
        },
        USAGE: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usages"
        },
        WEBFORM: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "webforms"
        },
        SEGMENT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "segments"
        },
        WEBFORM_VIEW: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "webformViews"
        }
    },
    STATUS_TYPE: {
        type: String,
        enum: _.toArray(STATUS),
        default: STATUS.DISABLED
    },
    ACCOUNT_STATUS_TYPE: {
        type: String,
        enum: _.toArray(ACCOUNT_STATUS_TYPE),
        default: STATUS.ENABLED
    },
    OUTBOX_TYPE: {
        type: String,
        enum: _.toArray(OUTBOX_TYPE)
    }
};

export const LANGUAGES = {
    EN: "en"
};

export const SCHEDULE_TYPE = {
    DAY: {
        EVERY_DAY: "everyDay",
        DAY_OF_MONTH: "dayOfMonth",
        DAY_OF_WEEK: "dayOfWeek"
    },
    MONTH: {
        EVERY_MONTH: "everyMonth",
        ONE_OR_MORE_MONTHS: "oneOrMore"
    },
    TIME: {
        EVERY_HOUR: "everyHour",
        EVERY_X_MINUTES: "everyMinutes",
        X_MINUTES_PAST_EVERY_HOUR: "minutesEveryHour",
        TIME: "time"
    }
};