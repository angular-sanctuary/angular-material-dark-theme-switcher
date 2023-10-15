import {Component, computed, inject, Renderer2, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private renderer = inject(Renderer2);

  isDarkModeEnabled = signal(false);
  darkModeIcon = computed(() => this.isDarkModeEnabled() ? 'dark_mode' : 'light_mode');

  toggleTheme(): void {
    if (this.isDarkModeEnabled()) {
      this.renderer.removeClass(document.body, 'darkMode');
    } else {
      this.renderer.addClass(document.body, 'darkMode');
    }

    this.isDarkModeEnabled.update(isEnabled => !isEnabled);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
