import { CommonModule } from "@angular/common";
import {
  Component,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";

export class LibraryConfig {
  name: string;
}

@Component({
  selector: "lib-component",
  template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>"
})
export class LibraryComponent {
  constructor(public libraryConfig: LibraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule {
  // Can only call forRoot once in AppModule (but easy to implement)
  // If you need forChild refer to level 2 implementing a FOR_ROOT token
  constructor(@Optional() @SkipSelf() parentModule: LibraryModule) {
    if (parentModule) {
      console.error(
        "[Level4] LibraryModule called twice, you can only import it in AppModule once"
      );
    }
  }

  static forRoot(
    libraryConfig: LibraryConfig
  ): ModuleWithProviders<LibraryModule> {
    return {
      ngModule: LibraryModule,

      // Library add config in DI so app don't need to do it
      providers: [{ provide: LibraryConfig, useValue: libraryConfig }]
    };
  }
}
