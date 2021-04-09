import { InjectionToken } from "@angular/core";

// No circular import issue because in a separated file
export const TOKEN_C = new InjectionToken<string>("Token C");
