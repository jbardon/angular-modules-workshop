import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { LibraryModule } from "./library.module";

@Component({
  selector: "level-1-a",
  template: `
    <fieldset>
      <legend>ModuleA (lazy loaded)</legend>

      <!-- Not have the same value as in AppModule -->
      <lib-component></lib-component>
    </fieldset>
  `
})
export class ComponentA {}

@NgModule({
  // Import library in lazy loaded module
  imports: [CommonModule, LibraryModule],
  declarations: [ComponentA],
  exports: [ComponentA]
})
export class ModuleA {}

// For easy lazy loading
export default {
  moduleClass: ModuleA,
  componentClass: ComponentA
};
