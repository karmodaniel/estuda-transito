import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  AppstoreOutline,
  ArrowRightOutline,
  BarsOutline,
  BookOutline,
  CheckCircleOutline,
  CheckOutline,
  ClearOutline,
  CloseCircleOutline,
  CreditCardOutline,
  HomeOutline,
  LeftOutline,
  MenuOutline,
  MoonOutline,
  PlayCircleOutline,
  QuestionCircleOutline,
  ReloadOutline,
  RightOutline,
  SearchOutline,
  SettingOutline,
  StarOutline,
  SunOutline,
  TrophyOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { routes } from './app-routing.module';
import { ThemeService } from './shared/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    ThemeService,
    {
      provide: NZ_ICONS,
      useValue: [
        AppstoreOutline,
        ArrowRightOutline,
        BarsOutline,
        BookOutline,
        CheckCircleOutline,
        CheckOutline,
        ClearOutline,
        CloseCircleOutline,
        CreditCardOutline,
        HomeOutline,
        LeftOutline,
        MenuOutline,
        MoonOutline,
        PlayCircleOutline,
        QuestionCircleOutline,
        ReloadOutline,
        RightOutline,
        SearchOutline,
        SettingOutline,
        StarOutline,
        SunOutline,
        TrophyOutline,
      ],
    },
  ],
};
