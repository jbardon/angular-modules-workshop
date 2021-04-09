import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { Level1LibraryModule } from "./library-1.module";

@Component({
  selector: "level-1-a",
  template: `
    <fieldset>
      <legend>Level1ModuleA (lazy loaded)</legend>

      <!-- Not have the same value as in Level1Module -->
      <lib-component></lib-component>
    </fieldset>
  `
})
export class Level1ComponentA {}

@NgModule({
  // Import library in lazy loaded module
  imports: [CommonModule, Level1LibraryModule],
  declarations: [Level1ComponentA],
  exports: [Level1ComponentA]
})
export class Level1ModuleA {}

// For easy lazy loading
export default {
  moduleClass: Level1ModuleA,
  componentClass: Level1ComponentA
};
