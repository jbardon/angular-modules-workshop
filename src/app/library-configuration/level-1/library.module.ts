import { CommonModule } from "@angular/common";
import { Component, InjectionToken, NgModule, Inject } from "@angular/core";

export const LIB_CONFIG = new InjectionToken<string>("Lib config");

@Component({
  selector: "lib-component",
  template: "<p>LIB_CONFIG: {{ libraryConfig | json }}</p>"
})
export class LibraryComponent {
  constructor(@Inject(LIB_CONFIG) public libraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent],
  providers: [
    {
      provide: LIB_CONFIG,
      useValue: "LibreryModule"
    }
  ]
})
export class LibraryModule {
  constructor() {
    console.count("[Level1] LibraryModule loaded");
  }
}
