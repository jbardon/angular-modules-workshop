import './polyfills';

import { AppComponent } from './app/app.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { DependencyInjectionModule, dependencyInjectionModuleRoutes } from './app/2-dependency-injection/dependency-injection.module';
import { ComponentDeclarationModule, componentDeclarationModuleRoutes } from './app/1-component-declaration/component-declaration.module';
import { LibraryConfigurationModule, libraryConfigurationModuleRoutes } from './app/3-library-configuration/library-configuration.module';
import { DesignPatternsModule, designPatternsModuleRoutes } from './app/4-design-patterns/design-patterns.module';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, DependencyInjectionModule, ComponentDeclarationModule, LibraryConfigurationModule, DesignPatternsModule),

        // Don't use lazy load for each course
        // So levels in courses can test modules eager loading
        //
        // Ex: @Injectable({ providedIn: 'root' }) with constructor
        //     injection and token provided in level module.
        //
        //     Lazy loading courses would make level module providers
        //     not available for main AppModule and throw an error
        //
        provideRouter([
            {
                path: "component-declaration",
                children: componentDeclarationModuleRoutes
            },
            {
                path: "dependency-injection",
                children: dependencyInjectionModuleRoutes
            },
            {
                path: "library-configuration",
                children: libraryConfigurationModuleRoutes
            },
            {
                path: "design-patterns",
                children: designPatternsModuleRoutes
            },
            {
                path: "",
                pathMatch: "full",
                redirectTo: "component-declaration"
            }
        ])
    ]
}).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));