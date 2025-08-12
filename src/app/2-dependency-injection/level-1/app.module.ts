import { CommonModule } from "@angular/common";
import { NgModule, Component, inject } from "@angular/core";
import { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE } from "./services";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 1: Inject a simple service</legend>
      <p>Takeaways</p>
      <ul>
        <li>Multiple syntaxes to declare providers</li>
        <li>Token values defined in various ways</li>
      </ul>
      <hr />
      <p>serviceA.name: {{ serviceA.name | json }}</p>
      <p>serviceB.name: {{ serviceB.name | json }}</p>
      <p>serviceC.name: {{ serviceC.name | json }}</p>
      <p>serviceD.name: {{ serviceD.name | json }}</p>
      <p>serviceE.name: {{ serviceE.name | json }}</p>
    </fieldset>
  `,
    standalone: false
})
export class AppComponent {
  serviceA = inject(ServiceA);
  serviceB = inject(ServiceB);
  serviceC = inject(ServiceC);
  serviceD = inject(ServiceD);
  serviceE = inject(ServiceE);
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],

  // Providers defined in a NgModule, the ModuleInjector for this module
  // will provide values to components
  providers: [
    // The token is the class type, useValue for constant/static values such
    // a user locale Angular can return the value as it is
    { provide: ServiceB, useValue: new ServiceB() },

    // useClass means the token value is an instance of
    // the given class (Angular needs to instanciate it)
    { provide: ServiceC, useClass: ServiceC },

    // Short-end syntax to provide a class instance
    ServiceD,

    // useFactory is used to delay initialisation
    // Angular needs to call the given function to get the token value
    { provide: ServiceE, useFactory: () => new ServiceE() }
  ],
  exports: [AppComponent]
})
export class AppModule {}
