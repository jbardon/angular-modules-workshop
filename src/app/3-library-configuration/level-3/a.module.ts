import { CommonModule } from "@angular/common";
import { Component, NgModule, inject } from "@angular/core";
import { LibraryModule, LibraryService } from "./library.module";

@Component({
  selector: "level-3-a",
  template: `
    <fieldset>
      <legend>ModuleA (lazy loaded)</legend>

      <!-- Not have the same value as in AppModule -->
      <p>libraryService.config: {{ libraryService.config }}</p>
      <lib-component></lib-component>
    </fieldset>
  `,
    standalone: false
})
export class ComponentA {
  libraryService = inject(LibraryService);
}

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
