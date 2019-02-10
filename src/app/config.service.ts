import {Injectable} from '@angular/core';
import {EnvConfig} from "./env-config";
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: EnvConfig[] = [];
  private env: Object = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: string): any {
    const prop = this.config.filter(c => c.key === key).shift();
    if (isNullOrUndefined(prop)) {
      return null;
    }
    return prop.value;
  }

  public getConfigArray(): EnvConfig[]{
    return this.config;
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('./assets/env/env.json')
        .subscribe((envResponse: any) => {
            this.env = envResponse;
            let request: any;

            const externalConfUrl = envResponse.serverUrl;
            const embeddedConfUrl = envResponse.embeddedConfFileUrl;
            let confUrl = "";

            if(externalConfUrl && externalConfUrl.length === 0){
              confUrl = externalConfUrl;
              request = this.http.get(externalConfUrl);
            } else {
              confUrl = externalConfUrl;
              request = this.http.get(embeddedConfUrl);
            }

            if (request) {
              request
                .subscribe((responseData: any) => {
                    this.config = responseData;
                    resolve(true);
                  },
                  ((error: any) => {
                    console.error('Error reading {' + confUrl + '} configuration file');
                    resolve(error);
                    return throwError(error || 'Server error');
                  }));
            } else {
              console.error('Env config file "env.json" is not valid');
              resolve(true);
            }
          },
          (error: any): any => {
            console.log('Configuration file "env.json" could not be read');
            resolve(true);
            return throwError(error || 'Server error');
          })
    });
  }
}
