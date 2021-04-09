import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";

export class Level3LibraryConfig {
  name: string;
}

@Component({
  selector: "lib-component",
  template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>"
})
export class Level3LibraryComponent {
  constructor(public libraryConfig: Level3LibraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [Level3LibraryComponent],
  exports: [Level3LibraryComponent]
})
export class Level3LibraryModule {}
