import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";

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
        @for (course of courses; track course) {
          <a
            style="margin-right: 10px;"
            [routerLink]="course.path"
            routerLinkActive="active"
            [title]="course.tooltip"
            >{{ course.name }}</a
            >
          }
        </div>
    
        <div [style.margin-bottom.px]="20">
          @for (level of currentCourse.levels; track level) {
            <a
              style="margin-right: 10px;"
              [routerLink]="currentCourse.path + '/' + level"
              routerLinkActive="active"
              >{{ level }}</a
              >
            }
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
        /* pointer-events: none; */
        cursor: default;
      }
    `
    ],
    standalone: false
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
    RouterModule.forRoot(
      [
        {
          path: "dependency-injection",
          loadChildren: () =>
            import("./dependency-injection/dependency-injection.module").then(
              m => m.DependencyInjectionModule
            )
        },
        {
          path: "component-declaration",
          loadChildren: () =>
            import("./component-declaration/component-declaration.module").then(
              m => m.ComponentDeclarationModule
            )
        },
        {
          path: "library-configuration",
          loadChildren: () =>
            import("./library-configuration/library-configuration.module").then(
              m => m.LibraryConfigurationModule
            )
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "dependency-injection"
        }
      ],
      { useHash: false }
      //{ enableTracing: true }
    )
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
