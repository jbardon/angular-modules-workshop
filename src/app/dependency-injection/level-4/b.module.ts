import { CommonModule } from "@angular/common";
import { Component, NgModule, Inject } from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
    selector: "level-4b",
    template: `
    <fieldset>
      <legend>ModuleB</legend>

      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
    </fieldset>
  `,
    standalone: false
})
export class ComponentB {
  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentB],
  providers: [
    { provide: TOKEN_A, useValue: "ModuleB" },
    { provide: TOKEN_C, useValue: "ModuleB" }
  ],
  exports: [ComponentB]
})
export class ModuleB {}
