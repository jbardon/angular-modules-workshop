import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { Level2LibraryModule } from "./library-2.module";

@Component({
  selector: "level-2-a",
  template: `
    <fieldset>
      <legend>Level2ModuleA (lazy loaded)</legend>

      <!-- Same value as in Level1Module -->
      <lib-component></lib-component>
    </fieldset>
  `
})
export class Level2ComponentA {}

@NgModule({
  imports: [
    CommonModule,

    // Import in lazy loaded module uses forChild instead of forRoot
    Level2LibraryModule.forChild()
  ],
  declarations: [Level2ComponentA],
  exports: [Level2ComponentA]
})
export class Level2ModuleA {}

// For easy lazy loading
export default {
  moduleClass: Level2ModuleA,
  componentClass: Level2ComponentA
};
