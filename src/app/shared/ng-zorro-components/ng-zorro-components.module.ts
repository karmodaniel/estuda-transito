import { NgModule } from '@angular/core';

// Ng-Zorro modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const NG_ZORRO_MODULES = [
  NzButtonModule,
  NzLayoutModule,
  NzCardModule,
  NzInputModule,
  NzTagModule,
  NzSpinModule,
  NzEmptyModule,
  NzIconModule,
  NzCheckboxModule,
  NzRadioModule,
  NzProgressModule,
  NzResultModule,
  NzDividerModule,
  NzSpaceModule,
  NzTypographyModule,
  NzCollapseModule,
  NzToolTipModule,
  NzBadgeModule,
  NzAvatarModule,
  NzDrawerModule,
  NzSwitchModule,
  NzSelectModule,
  NzSliderModule,
  NzTabsModule,
  NzModalModule,
  NzMessageModule,
  NzNotificationModule,
  NzMenuModule,
];

@NgModule({
  imports: NG_ZORRO_MODULES,
  exports: NG_ZORRO_MODULES,
})
export class NgZorroComponentsModule {}
