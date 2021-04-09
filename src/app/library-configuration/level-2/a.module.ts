import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { LibraryModule } from "./library.module";

@Component({
  selector: "level-2-a",
  template: `
    <fieldset>
      <legend>ModuleA (lazy loaded)</legend>

      <!-- Same value as in AppModule -->
      <lib-component></lib-component>
    </fieldset>
  `
})
export class ComponentA {}

@NgModule({
  imports: [
    CommonModule,

    // Import in lazy loaded module uses forChild instead of forRoot
    LibraryModule.forChild()
  ],
  declarations: [ComponentA],
  exports: [ComponentA]
})
export class ModuleA {}

// For easy lazy loading
export default {
  moduleClass: ModuleA,
  componentClass: ComponentA
};
