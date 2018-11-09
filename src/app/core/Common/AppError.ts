const _ = require("lodash");
export function createAppError( settings ) {

    // NOTE: We are overriding the "implementationContext" so that the createAppError()
    // function is not part of the resulting stacktrace.
    return( new AppError( settings, createAppError ) );
}

class AppError extends Error {
    name: string;
    message: string;
    code: number;
    resource: string;
    field: string;
    constructor(settings, implementationContext) {
        super();

        if (_.isString(settings)) {
            let message = settings;
            settings = {
                message: message
            };
        }

        this.code = ( settings.code || "" );
        this.name = ( settings.name || "App Error" );
        this.message = ( settings.message || "An error occurred." );
        this.field = ( settings.field || "" );
        this.resource = ( settings.resource || "" );

        Error.captureStackTrace( this, ( implementationContext || AppError ) );
    }
}