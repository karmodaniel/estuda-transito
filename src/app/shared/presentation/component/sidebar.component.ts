import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  SidebarItem,
  SIDEBAR_CONFIG,
  SIDEBAR_HEADER,
} from '@shared/config/sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() selectedMenuKey = '';
  @Input() themeIcon = 'sun';
  @Input() themeTooltip = 'Alternar tema';

  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() navigate = new EventEmitter<string>();
  @Output() themeToggle = new EventEmitter<void>();

  readonly SIDEBAR_HEADER = SIDEBAR_HEADER;
  readonly menuItems = SIDEBAR_CONFIG;

  onNavigate(item: SidebarItem): void {
    this.navigate.emit(item.key);
  }

  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  onCollapsedChange(value: boolean): void {
    this.collapsedChange.emit(value);
  }
}
