import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { Theme, ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    SidebarComponent,
  ],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  selectedMenuKey = 'placas';
  currentTheme: Theme = 'light';

  constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService
  ) {}

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
    console.log('🔄 Toggle theme chamado. Tema atual:', this.currentTheme);
    this.themeService.toggleTheme();
    console.log(
      '✅ Toggle theme executado. Novo tema:',
      this.themeService.getCurrentTheme()
    );
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
