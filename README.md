# ExternalizeConfigAngular6

Learn how to externalize your angular app configuration 

Stop using your environment constants

No more need to redeploy all the app to get configuration fixed


## How it works:

When bootstrapping the app `configService` will try to get the <span class="code">`env.json`</span>file from
`assets/env/env.json` and try to get the conf from an external URL declared in serverUrl
property, ex: `http://localhost:9090/front/conf`.

If the serverUrl property is empty then it will look at an embedded file which is declared inside the property
<span class="code">`embeddedConfFileUrl`</span>.


## Try it !

`npm install`

`npm start`

## Contact

Don't hesitate to contact me if any concern on: `wail.djenane@gmail.com`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.
