import { CommonModule } from "@angular/common";
import { NgModule, Component, Inject, InjectionToken } from "@angular/core";
import { TokenType, TOKEN_A, TOKEN_B } from "./tokens";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 2: Create a custom token</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Token value can have any type including object, class instances,
          observables.
        </li>
        <li>
          Value for a custom token can be defined outside of AppModule with a
          factory
        </li>
      </ul>
      <hr />
      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
    </fieldset>
  `,
    standalone: false
})
export class AppComponent {
  constructor(
    // Use @Inject to specify the token to inject
    // For a service, the argument type was used as a token
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  providers: [
    { provide: TOKEN_A, useValue: "tokenA" },
    { provide: TOKEN_B, useValue: { property: "tokenB" } }
  ],
  exports: [AppComponent]
})
export class AppModule {}

// Token defined at module level (no need for provider)
// Can be overriden like other tokens
export const TOKEN_C = new InjectionToken<TokenType>("Token C", {
  factory: () => ({ property: "tokenC" })
});
