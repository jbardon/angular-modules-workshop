import { InjectionToken } from "@angular/core";

// Simple token with string value
export const TOKEN_A = new InjectionToken<string>("Token A");

// Tokens can also have object/class instances as value
export type TokenType = {
  property: string;
};
export const TOKEN_B = new InjectionToken<TokenType>("Token B");
