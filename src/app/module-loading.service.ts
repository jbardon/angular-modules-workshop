import {
  Compiler,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  NgModuleRef,
  ViewContainerRef
} from "@angular/core";

/*
  Usage: 
    - Add the service in component providers so it gets the component context (injector)
    - Create a DOM element and get a ViewContainerRef
    - Import your module and call lazyLoad function in ngAfterViewInit (so ViewContainerRef is set)

  Example: 
    @Component({
      template: '<ng-container #ref></ng-container>',
      providers: [ModuleLoadingService]
    })
    export class Level5Component implements AfterViewInit {
      @ViewChild("ref", { read: ViewContainerRef }) container: ViewContainerRef;

      constructor(private moduleLoaderService: ModuleLoadingService) {}

      ngAfterViewInit() {
        this.moduleLoaderService.lazyLoad(
          import("./my-module.module"),
          this.container
        );
      }
    }
*/
@Injectable()
export class ModuleLoadingService {
  constructor(
    private compiler: Compiler,
    private injector: Injector,
  ) {}

  // Manual lazy loading: same behavior as Angular router with loadChildren
  lazyLoad(moduleImport: Promise<any>, target: ViewContainerRef) {
    this.loadLazyModule(moduleImport).then(([module, component]) =>
      this.renderLazyComponent(module, component, target)
    );
  }

  private loadLazyModule(
    moduleImport: Promise<any>
  ): Promise<[NgModuleRef<any>, any]> {
    return moduleImport
      .then(({ default: defaultExport }) =>
        Promise.all([
          this.compiler.compileModuleAsync(defaultExport.moduleClass),
          defaultExport.componentClass
        ])
      )
      .then(([moduleFactory, component]) =>
        Promise.all([moduleFactory.create(this.injector), component])
      );
  }

  private renderLazyComponent(
    module: NgModuleRef<any>,
    component: any,
    target: ViewContainerRef
  ) {
    target.createComponent(component, { injector: module.injector });
  }
}
