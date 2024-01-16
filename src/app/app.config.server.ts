import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: 'APP_BASE_HREF', useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
