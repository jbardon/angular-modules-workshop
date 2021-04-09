import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";

export class Level1LibraryConfig {
  name: string;
}

@Component({
  selector: "lib-component",
  template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>"
})
export class Level1LibraryComponent {
  constructor(public libraryConfig: Level1LibraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [Level1LibraryComponent],
  exports: [Level1LibraryComponent],
  providers: [
    {
      provide: Level1LibraryConfig,
      useFactory: () => ({ name: "Overrided by Level1Module" })
    }
  ]
})
export class Level1LibraryModule {
  constructor() {
    console.count("Level1LibraryModule loaded");
  }
}
