import { CommonModule } from "@angular/common";
import { Component, NgModule, inject } from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "component-b",
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
  tokenA = inject(TOKEN_A);
  tokenB = inject(TOKEN_B);
  tokenC = inject(TOKEN_C);
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
