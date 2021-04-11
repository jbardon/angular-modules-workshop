import { CommonModule } from "@angular/common";
import {
  Component,
  forwardRef,
  Inject,
  InjectionToken,
  NgModule
} from "@angular/core";

export const COMPONENT_B_REF = new InjectionToken<ComponentB>(
  "Closest Component B"
);

@Component({
  selector: "level-1-b",
  template: `
    <fieldset>
      <legend>ComponentB</legend>
      <level-1-b-1></level-1-b-1>
    </fieldset>
  `,
  providers: [
    {
      provide: COMPONENT_B_REF,
      useExisting: forwardRef(() => ComponentB)
    }
  ]
})
export class ComponentB {
  name = "ComponentB";
}

@Component({
  selector: "level-1-b-1",
  template: `
    <fieldset>
      <legend>ChildComponentB</legend>
      <p>componentB.name: {{ componentB.name | json }}</p>
    </fieldset>
  `
})
export class ChildComponentB {
  constructor(@Inject(COMPONENT_B_REF) public componentB: ComponentB) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentB, ChildComponentB],
  exports: [ComponentB]
})
export class ModuleB {}
