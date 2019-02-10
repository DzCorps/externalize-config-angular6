import { Component } from '@angular/core';
import {ConfigService} from "./config.service";
import {EnvConfig} from "./env-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'externalize-config-angular6';

  configArray: EnvConfig[] = [];

  constructor(configService: ConfigService) {
    this.configArray = configService.getConfigArray();
  }
}
