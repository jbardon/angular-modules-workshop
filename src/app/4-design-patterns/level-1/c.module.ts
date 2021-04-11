import { CommonModule } from "@angular/common";
import { Component, Host, NgModule, Optional } from "@angular/core";

@Component({
  selector: "level-1-c",
  template: `
    <fieldset>
      <legend>ComponentC</legend>
      <level-1-c></level-1-c>
    </fieldset>
  `
})
export class ComponentC {
  name = "ComponentC";
}

@Component({
  selector: "level-1-c-1",
  template: `
    <
    <level-1-c-1-1></level-1-c-1-1>
  `
})
export class ChildComponentC {}

@Component({
  selector: "level-1-c-1-1",
  template: `
    <fieldset>
      <legend>BabyComponentA</legend>
      <p>componentA.name: {{ componentA?.name | json }}</p>
    </fieldset>
  `
})
export class BabyComponentA {
  constructor(@Host() @Optional() public componentA: ComponentA) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA, ChildComponentA, A],
  exports: [ComponentA]
})
export class ModuleA {}
