import { CommonModule } from "@angular/common";
import { Component, NgModule, inject } from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ModuleA (lazy loaded)</legend>
      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
    </fieldset>
  `,
    standalone: false
})
export class ComponentA {
  tokenA = inject(TOKEN_A);
  tokenB = inject(TOKEN_B);
  tokenC = inject(TOKEN_C);
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA],
  exports: [ComponentA],
  providers: [
    { provide: TOKEN_B, useValue: "ModuleA" },
    { provide: TOKEN_C, useValue: "ModuleA" }
  ]
})
export class ModuleA {}

// For easy lazy loading
export default {
  moduleClass: ModuleA,
  componentClass: ComponentA
};
