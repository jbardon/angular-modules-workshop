import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import {
  ComponentDeclarationModule,
  componentDeclarationModuleRoutes
} from "./component-declaration/component-declaration.module";
import {
  DependencyInjectionModule,
  dependencyInjectionModuleRoutes
} from "./dependency-injection/dependency-injection.module";
import {
  LibraryConfigurationModule,
  libraryConfigurationModuleRoutes
} from "./library-configuration/library-configuration.module";

/*
Notes:
- https://angular.io/guide/dependency-injection
- https://angular.io/guide/hierarchical-dependency-injection
- https://angular.io/guide/dependency-injection-providers
- https://stackoverflow.com/a/45153972
*/
@Component({
  selector: "my-app",
  template: `
    <nav>
      <div style="margin-bottom: 10px;">
        <a
          *ngFor="let course of courses"
          style="margin-right: 10px;"
          [routerLink]="course.path"
          routerLinkActive="active"
          [title]="course.tooltip"
          >{{ course.name }}</a
        >
      </div>

      <div [style.margin-bottom.px]="20">
        <a
          style="margin-right: 10px;"
          *ngFor="let level of currentCourse.levels"
          [routerLink]="currentCourse.path + '/' + level"
          routerLinkActive="active"
          >{{ level }}</a
        >
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .active {
        color: black;
        font-weight: bold;
        text-decoration: none;
        // pointer-events: none;
        cursor: default;
      }
    `
  ]
})
export class AppComponent {
  courses = [
    {
      name: "DI",
      tooltip: "Dependency injection",
      path: "/dependency-injection",
      levels: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    {
      name: "Component",
      tooltip: "Component declaration",
      path: "/component-declaration",
      levels: [0, 1, 2]
    },
    {
      name: "Library",
      tooltip: "Library configuration",
      path: "/library-configuration",
      levels: [1, 2, 3, 4]
    }
  ];

  get currentCourse() {
    return (
      this.courses.find(course => this.router.url.includes(course.path)) ||
      this.courses[0]
    );
  }

  constructor(private router: Router) {}
}

@NgModule({
  imports: [
    BrowserModule,
    DependencyInjectionModule,
    ComponentDeclarationModule,
    LibraryConfigurationModule,

    // Don't use lazy load for each course
    // So levels in courses can test modules eager loading
    //
    // Ex: @Injectable({ providedIn: 'root' }) with constructor
    //     injection and token provided in level module.
    //
    //     Lazy loading courses would make level module providers
    //     not available for main AppModule and throw an error
    //
    RouterModule.forRoot(
      [
        {
          path: "dependency-injection",
          children: dependencyInjectionModuleRoutes
        },
        {
          path: "component-declaration",
          children: componentDeclarationModuleRoutes
        },
        {
          path: "library-configuration",
          children: libraryConfigurationModuleRoutes
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "dependency-injection"
        }
      ]
      //{ enableTracing: true }
    )
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
