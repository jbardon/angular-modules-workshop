import { CommonModule } from "@angular/common";
import {
  Inject,
  Injectable,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";

export const LIB_CONFIG = new InjectionToken<string>("Lib config");

const FOR_ROOT_TOKEN = new InjectionToken<boolean>(
  "Level4LibraryModule.forRoot"
);

@NgModule({
  imports: [CommonModule]
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
                "[Level4] LibraryModule.forRoot called twice, use forChild on lazy loaded modules"
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

/*
 Not work (same value in AppModule and Module):
 - with providedIn: root

 Works (different value)
 - with providedIn: any/LibraryModule
 - replace LibraryService with LibraryComponent (element injector)

 Do demonstrate: same value/instance for eager and lazy loaded modules (ex: store). Default is different value expect for services with "providedIn: root"
*/

@Injectable({ providedIn: "root" })
export class LibraryService {
  constructor(@Inject(LIB_CONFIG) public config) {}
}
