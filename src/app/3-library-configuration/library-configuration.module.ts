import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import * as Level1 from "./level-1/app.module";
import * as Level2 from "./level-2/app.module";
import * as Level3 from "./level-3/app.module";
import * as Level4 from "./level-4/app.module";

/*
TODO:
- Use providers in libraries: forRoot with params, tokens, factories, app_init
- Private injector with stream (taiga)
- Injector & directive to avoid props drilling

PATTERNS:
- exportAs:  https://netbasal.com/angular-2-take-advantage-of-the-exportas-property-81374ce24d26 
- extends component with directive
- keep regular htlm tags: component selector+ng-content instead of directive
- provide thing with outer component and export as OR structural directive:  https://netbasal.com/going-renderless-in-angular-all-of-the-functionality-none-of-the-render-1b105e001c8a
- address prop drilling with DI: https://indepth.dev/posts/1443/how-we-make-our-base-components-more-flexible-controllers-concept-in-angular
- private providers: https://indepth.dev/posts/1306/private-providers (tuiwrapper)
- component provider DI with service ElementRef
- polymorpheus: https://indepth.dev/posts/1314/agnostic-components-in-angular
- library with example and service+directive thing: https://indepth.dev/posts/1197/what-makes-a-good-angular-library

Generic + polymorphous + css properties + handlers
*/
export const libraryConfigurationModuleRoutes: Routes = [
  {
    path: "1",
    component: Level1.AppComponent
  },
  {
    path: "2",
    component: Level2.AppComponent
  },
  {
    path: "3",
    component: Level3.AppComponent
  },
  {
    path: "4",
    component: Level4.AppComponent
  },
  {
    path: "**",
    redirectTo: "1"
  }
];

@NgModule({
  imports: [
    Level1.AppModule,
    Level2.AppModule,
    Level3.AppModule,
    Level4.AppModule
  ]
})
export class LibraryConfigurationModule {}
