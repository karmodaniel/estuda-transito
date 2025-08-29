import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService, Theme } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  selectedMenuKey = 'placas';
  currentTheme: Theme = 'light';

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Atualizar menu selecionado baseado na rota atual
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('/placas')) {
          this.selectedMenuKey = 'placas';
        } else if (event.url.includes('/quiz')) {
          this.selectedMenuKey = 'quiz';
        }
      });

    // Observar mudanças de tema
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  navigateTo(page: string): void {
    this.selectedMenuKey = page;
    this.router.navigate([`/${page}`]);
  }

  getPageTitle(): string {
    switch (this.selectedMenuKey) {
      case 'placas':
        return 'Estudo das Placas';
      case 'quiz':
        return 'Quiz de Placas';
      default:
        return 'Quiz Placas';
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getThemeIcon(): string {
    return this.currentTheme === 'light' ? 'moon' : 'sun';
  }

  getThemeTooltip(): string {
    return this.currentTheme === 'light'
      ? 'Alternar para modo escuro'
      : 'Alternar para modo claro';
  }
}
