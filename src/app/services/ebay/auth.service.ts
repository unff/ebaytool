import { Injectable } from '@angular/core'
import { ElectronService } from 'ngx-electron'
// import { BrowserWindow, WebContents } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _e: ElectronService) { }

  public openAuthWindow( url: string, width: number = 1500, height: number = 600,
                        left: number = 0, top: number = 0): Electron.BrowserWindow {
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
    const winHandle = this.openAuthWindow()
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
