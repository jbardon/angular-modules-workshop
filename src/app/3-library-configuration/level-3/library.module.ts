import { CommonModule } from "@angular/common";
import {
  InjectionToken,
  NgModule,
  Inject,
  Injectable,
  Component
} from "@angular/core";

export const LIB_CONFIG = new InjectionToken<string>("Lib config");

@Component({
  selector: "lib-component",
  template: `
    <fieldset>
      <legend>LibraryComponent</legend>
      <p>LIB_CONFIG: {{ libraryConfig | json }}</p>
    </fieldset>
  `,
  standalone: false
})
export class LibraryComponent {
  constructor(@Inject(LIB_CONFIG) public libraryConfig) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [LibraryComponent],
  providers: [
    {
      provide: LIB_CONFIG,
      useValue: "LibraryModule"
    }
  ],
  exports: [LibraryComponent]
})
export class LibraryModule {
  constructor() {
    console.count("[Level3] LibraryModule loaded");
  }
}

@Injectable({ providedIn: "root" })
export class LibraryService {
  constructor(@Inject(LIB_CONFIG) public config) {}
}
