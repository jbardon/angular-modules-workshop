import { InjectionToken } from "@angular/core";

export const TOKEN_A = new InjectionToken<string>("Token A");
export const TOKEN_B = new InjectionToken<string>("Token B");

// Only defined in lazy module
// Lazy module not imported so value not available in AppModule
export const TOKEN_C = new InjectionToken<string>("Token C");
