import { CommonModule } from "@angular/common";
import { NgModule, Component, Inject } from "@angular/core";
import { ModuleA } from "./a.module";
import { ModuleB } from "./b.module";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>
        Level 4: Providers at module level with imports (ModuleInjector)
      </legend>
      <p>Takeaways</p>
      <ul>
        <li>
          AppModule imports behavior is counter intuitive: ModuleA and ModuleB
          can't override a token value defined in AppModule.
        </li>
        <li>
          Priority order for token value is AppModule first and then the last
          imported module if the token isn't defined in AppModule
        </li>
        <li>
          Only one value for one token in the whole app. There is only one
          ModuleInjector in the app for AppModule which deciced the value for a
          token.
        </li>
        <li>
          Exception for one value for one token in the whole app rule are
          providers in components (level 3) and lazy loaded modules (level 5)
        </li>
      </ul>
      <hr />

      <fieldset>
        <legend>AppModule</legend>

        <p>TOKEN_A: {{ tokenA | json }}</p>
        <p>TOKEN_B: {{ tokenB | json }}</p>
        <p>TOKEN_C: {{ tokenC | json }}</p>

        <component-a></component-a>
        <component-b></component-b>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {
  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@NgModule({
  imports: [ModuleA, ModuleB, CommonModule],
  declarations: [AppComponent],

  // TOKEN_A already defined in ModuleA and ModuleB but AppModule (parent) always wins
  // A bit counter-intuitive, level 5 demonstrates it's the contraty for lazy-loaded modules
  providers: [{ provide: TOKEN_A, useValue: "AppModule" }],
  exports: [AppComponent]
})
export class AppModule {}
