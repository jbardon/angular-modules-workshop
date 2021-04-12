import { CommonModule } from "@angular/common";
import { Component, NgModule, Inject } from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ModuleA</legend>

      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
    </fieldset>
  `
})
export class ComponentA {
  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA],
  providers: [
    // Not used because overrided by AppModule
    { provide: TOKEN_A, useValue: "ModuleA" },

    // Used because not defined in AppModule nor in ModuleB
    { provide: TOKEN_B, useValue: "ModuleA" },

    // Not used because ModuleB also define it and
    // ModuleB is imported after ModuleA in AppModule
    { provide: TOKEN_C, useValue: "ModuleA" }
  ],
  exports: [ComponentA]
})
export class ModuleA {}
