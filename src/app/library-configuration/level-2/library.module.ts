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

export const LIB_CONFIG = new InjectionToken<string>("Lib config");

@Component({
  selector: "lib-component",
  template: "<p>LIB_CONFIG: {{ libraryConfig | json }}</p>"
})
export class LibraryComponent {
  constructor(@Inject(LIB_CONFIG) public libraryConfig) {}
}

const FOR_ROOT_TOKEN = new InjectionToken<boolean>(
  "Level2LibraryModule.forRoot"
);

@NgModule({
  imports: [CommonModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule {
  constructor(@Optional() @Inject(FOR_ROOT_TOKEN) rootToken: boolean) {}

  public static forRoot(): ModuleWithProviders<LibraryModule> {
    return {
      ngModule: LibraryModule,
      providers: [
        {
          provide: LIB_CONFIG,
          useValue: "LibraryModule"
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
                "[Level2] LibraryModule.forRoot called twice, use forChild on lazy loaded modules"
              );
            }
            return !!config;
          },
          deps: [[LIB_CONFIG, new Optional(), new SkipSelf()]]
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<LibraryModule> {
    return {
      ngModule: LibraryModule
      // Do not provide again config value here
    };
  }
}
