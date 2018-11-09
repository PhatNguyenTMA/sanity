import {BearerStrategies} from "./strategies/Bearer";

export class PassportConfiguration {
     static register() {
         BearerStrategies.bearerStrategies();
     }
}