import { CommonModule } from "@angular/common";
import { Component, NgModule, Host, Optional } from "@angular/core";

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
      <level-1-a-1-1></level-1-a-1-1>
    </fieldset>
  `
})
export class ChildComponentA {
  constructor(public componentA: ComponentA) {}
}

@Component({
  selector: "level-1-a-1-1",
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
  declarations: [ComponentA, ChildComponentA, BabyComponentA],
  exports: [ComponentA]
})
export class ModuleA {}
