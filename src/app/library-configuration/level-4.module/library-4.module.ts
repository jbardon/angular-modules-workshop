import { CommonModule } from "@angular/common";
import {
  Component,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";

export class Level4LibraryConfig {
  name: string;
}

@Component({
  selector: "lib-component",
  template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>"
})
export class Level4LibraryComponent {
  constructor(public libraryConfig: Level4LibraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [Level4LibraryComponent],
  exports: [Level4LibraryComponent]
})
export class Level4LibraryModule {
  // Can only call forRoot once in AppModule (but easy to implement)
  // If you need forChild refer to level 2 implementing a FOR_ROOT token
  constructor(@Optional() @SkipSelf() parentModule: Level4LibraryModule) {
    if (parentModule) {
      console.error(
        "Level4LibraryModule called twice, you can only import it in AppModule once"
      );
    }
  }

  static forRoot(
    libraryConfig: Level4LibraryConfig
  ): ModuleWithProviders<Level4LibraryModule> {
    return {
      ngModule: Level4LibraryModule,

      // Library add config in DI so app don't need to do it
      providers: [{ provide: Level4LibraryConfig, useValue: libraryConfig }]
    };
  }
}
