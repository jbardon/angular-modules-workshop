import { InjectionToken, NgModule, Inject, Injectable } from "@angular/core";

export const LIB_CONFIG = new InjectionToken<string>("Lib config");

@NgModule({
  providers: [
    {
      provide: LIB_CONFIG,
      useValue: "LibraryModule"
    }
  ]
})
export class LibraryModule {
  constructor() {
    console.count("[Level1] LibraryModule loaded");
  }
}

@Injectable({ providedIn: LibraryModule })
export class LibraryService {
  constructor(@Inject(LIB_CONFIG) public config) {}
}
