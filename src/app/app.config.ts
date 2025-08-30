import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app-routing.module';
import { ThemeService } from './shared/services/theme.service';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  SunOutline,
  MoonOutline,
  HomeOutline,
  BookOutline,
  QuestionCircleOutline,
  PlayCircleOutline,
  CheckOutline,
  LeftOutline,
  RightOutline,
  ReloadOutline,
  TrophyOutline,
  StarOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  AppstoreOutline,
  BarsOutline,
  ClearOutline,
  CarFill,
} from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    ThemeService,
    {
      provide: NZ_ICONS,
      useValue: [
        MenuOutline,
        SunOutline,
        MoonOutline,
        HomeOutline,
        BookOutline,
        QuestionCircleOutline,
        PlayCircleOutline,
        CheckOutline,
        LeftOutline,
        RightOutline,
        ReloadOutline,
        TrophyOutline,
        StarOutline,
        CheckCircleOutline,
        CloseCircleOutline,
        AppstoreOutline,
        BarsOutline,
        ClearOutline,
        CarFill,
      ],
    },
  ],
};
