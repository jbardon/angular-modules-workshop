import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";

@Component({
  selector: "level-1-a",
  template: `
    <fieldset>
      <legend>ComponentA</legend>
      <level-1-a-1></level-1-a-1>
    </fieldset>
  `
})
export class ComponentA {
  name = "ComponentA";
}

@Component({
  selector: "level-1-a-1",
  template: `
    <fieldset>
      <legend>ChildComponentA</legend>
      <p>componentA.name: {{ componentA.name | json }}</p>
    </fieldset>
  `
})
export class ChildComponentA {
  constructor(public componentA: ComponentA) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA, ChildComponentA],
  exports: [ComponentA]
})
export class ModuleA {}
