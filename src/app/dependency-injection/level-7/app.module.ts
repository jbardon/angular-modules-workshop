import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Inject,
  inject,
  InjectionToken
} from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C, TOKEN_D } from "./tokens";

@Component({
  selector: "level-7",
  template: `
    <fieldset>
      <legend>Level 7: Providers with dependencies and options</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Tokens can have multiple values
        </li>
        <li>
          Can rely on other tokens to provide a token value
        </li>
      </ul>
      <hr />
      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
      <p>TOKEN_D: {{ tokenD | json }}</p>
      <p>TOKEN_E: {{ tokenE | json }}</p>
    </fieldset>
  `
})
export class AppComponent {
  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC,
    @Inject(TOKEN_D) public tokenD,
    @Inject(TOKEN_E) public tokenE
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  providers: [
    // Provide multiple values for the same token
    { provide: TOKEN_A, useValue: "tokenA", multi: true },
    { provide: TOKEN_A, useValue: "tokenA2", multi: true },

    // Used as dependency for following examples
    { provide: TOKEN_B, useValue: "tokenB" },

    // Use deps to declare dependency with another token and get its value
    { provide: TOKEN_C, useFactory: tokenB => tokenB + "C", deps: [TOKEN_B] },

    // inject is like deps and only works in a factory
    { provide: TOKEN_D, useFactory: () => inject(TOKEN_B) + "D" }
  ],
  exports: [AppComponent]
})
export class AppModule {}

// inject can be used in a factory function
export const TOKEN_E = new InjectionToken<string>("TokenE", {
  factory: () => inject(TOKEN_B) + "E",
  providedIn: AppModule
});
