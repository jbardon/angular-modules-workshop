import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";

export class LibraryConfig {
  name: string;
}

@Component({
    selector: "lib-component",
    template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>",
    standalone: false
})
export class LibraryComponent {
  constructor(public libraryConfig: LibraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule {}
