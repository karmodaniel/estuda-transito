import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SIDEBAR_CONFIG } from '@shared/config/sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Input() selectedMenuKey: string = '';
  @Input() themeIcon: string = 'sun';
  @Input() themeTooltip: string = 'Alternar tema';

  @Output() navigate = new EventEmitter<string>();
  @Output() themeToggle = new EventEmitter<void>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  readonly menuItems = SIDEBAR_CONFIG;

  onMenuClick(key: string): void {
    this.navigate.emit(key);
  }

  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  onCollapsedChange(collapsed: boolean): void {
    this.collapsedChange.emit(collapsed);
  }
}
