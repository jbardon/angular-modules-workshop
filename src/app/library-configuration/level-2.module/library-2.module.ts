import { CommonModule } from "@angular/common";
import {
  Component,
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";

export class Level2LibraryConfig {
  name: string;
}

@Component({
  selector: "lib-component",
  template: "<p>libraryConfig.name: {{ libraryConfig.name | json }}</p>"
})
export class Level2LibraryComponent {
  constructor(public libraryConfig: Level2LibraryConfig) {}
}

const FOR_ROOT_TOKEN = new InjectionToken<boolean>(
  "Level2LibraryModule.forRoot"
);

@NgModule({
  imports: [CommonModule],
  declarations: [Level2LibraryComponent],
  exports: [Level2LibraryComponent]
})
export class Level2LibraryModule {
  constructor(@Optional() @Inject(FOR_ROOT_TOKEN) rootToken: boolean) {}

  public static forRoot(): ModuleWithProviders<Level2LibraryModule> {
    return {
      ngModule: Level2LibraryModule,
      providers: [
        {
          provide: Level2LibraryConfig,
          useFactory: () => ({ name: "Overrided by Level2Module" })
        },

        // This token is only provided in forRoot
        // If its defined it means forRoot was already called before
        // (same method as RouterModule in Angular source code)
        {
          provide: FOR_ROOT_TOKEN,
          useFactory: config => {
            if (config) {
              // Usually use new Error to make the page crash
              console.error(
                "Level2LibraryModule.forRoot called twice, use forChild on lazy loaded modules"
              );
            }
            return !!config;
          },
          deps: [[Level2LibraryConfig, new Optional(), new SkipSelf()]]
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<Level2LibraryModule> {
    return {
      ngModule: Level2LibraryModule
      // Do not provide again config value here
    };
  }
}
