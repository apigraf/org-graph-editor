import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { environment } from './environments/environment';

if (environment.target === 'prod') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
