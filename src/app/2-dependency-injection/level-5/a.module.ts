import { CommonModule } from "@angular/common";
import { Component, Inject, NgModule } from "@angular/core";
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
