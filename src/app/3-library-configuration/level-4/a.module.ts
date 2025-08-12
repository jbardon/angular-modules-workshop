import { CommonModule } from "@angular/common";
import { Component, NgModule, inject } from "@angular/core";
import { LibraryModule, LibraryService } from "./library.module";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ModuleA (lazy loaded)</legend>

      <!-- Same value as in AppModule -->
      <p>libraryService.config: {{ libraryService.config }}</p>
    </fieldset>
  `,
    standalone: false
})
export class ComponentA {
  libraryService = inject(LibraryService);
}

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
