import { isPlatformBrowser } from '@angular/common';
import { Directive, Inject, OnInit, PLATFORM_ID, StaticProvider, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[showClientSide]' })
export class showClientSide implements OnInit {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: StaticProvider[],
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
