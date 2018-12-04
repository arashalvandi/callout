import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  @ViewChild('anchor') buttonRef: ElementRef<HTMLElement>;
  title = 'app';

  constructor(private overlay: Overlay) {}

  menuPortal: ComponentPortal<MenuComponent>;
  overlayRef: OverlayRef;
  overlayRef2: OverlayRef;

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.buttonRef);
    const positionStrategy = this.overlay.position()
      .connectedTo(this.buttonRef, 
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' }
    );

    this.overlayRef = this.overlay.create({
      positionStrategy
    });

    this.menuPortal = new ComponentPortal(MenuComponent);
  }
  
  openDialog() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(this.menuPortal);
    }
  }
}
