import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-store'
import { Observable, fromEvent,  } from 'rxjs'
import { Config } from '../config'
import { BrowserWindow, WebContents, EventEmitter, webContents } from 'electron'
import { ElectronService } from 'ngx-electron'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private config: Observable<Config>
    private productionConfig: Config
    private sandboxConfig: Config
    private windowHandle: Electron.BrowserWindow = null
    public bigUrl: string

    public get runningConfig(): Config {
        return this.isSandbox ? this.sandboxConfig : this.productionConfig
      }

    @LocalStorage() public siteModel: string // holds the region identifier
    @LocalStorage() public isSandbox: boolean // switch to handle whether it's sandbox or not

  constructor(private _e: ElectronService, private _http: HttpClient) {
    this.config = this._http.get('assets/config.json') as Observable<Config>
    this.config.toPromise().then((res: any) => {
      this.productionConfig = res.ebay as Config
      this.sandboxConfig = res.ebaysandbox as Config
    })
  }

  public openAuthWindow( url: string, width: number = 1500, height: number = 600,
                        left: number = 0, top: number = 0): BrowserWindow {
    try {
      const u: URL = new URL(url) // will throw a TypeError exception if it's not a valid URL
      const opts = {width: width, height: height, left: left, top: top}
      const win = new this._e.remote.BrowserWindow(opts)
      win.loadURL(url)
      win.once('ready-to-show', () => {win.show()})
      return win
    } catch (e) {
      if (e instanceof TypeError) { return null } // bad URL, no likey
    }
  }

  public getTokenSet() {
    const winHandle: BrowserWindow = this.openAuthWindow(this.fullAuthUrl())
    const authWinContents: WebContents = winHandle.webContents
    authWinContents.on('will-navigate', (event, url) => {
        event.preventDefault()
        console.log(event, url)
        winHandle.close()
        winHandle.destroy()
    })

  }

  public renewAccessToken() {}

  private fullAuthUrl() {
    // no config in this service. shit.
    const scope = encodeURIComponent(
              this.runningConfig.scope
              .reduce((acc, val) => acc + ' ' + val)
              // .trim()
            )
    return  this.runningConfig.authorizeUrl
          + '?client_id=' + this.runningConfig.clientId
          + '&response_type=code'
          + '&redirect_uri=' + this.runningConfig.ruName
          + '&scope=' + scope
  }

}
// Token flow:
// Open Window
// Go to auth URL
// authenticate
// pick up redirect.
// I wonder if an httpInterceptor would be better? Dont think so as we aren't really getting a response?
// play with electron webContents https://github.com/electron/electron/blob/master/docs/api/web-contents.md
// otherwise, listen for a URL with /code/ in it and pluck the keys from that.
