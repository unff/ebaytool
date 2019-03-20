import { Injectable } from '@angular/core'
import { ElectronService } from 'ngx-electron'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _e: ElectronService) { }

  public openAuthWindow( url: string, width: number = 1500,
                        height: number = 600, left: number = 0,
                        top: number = 0)
                        : Electron.BrowserWindow {
    if (url == null) {
      return null
    }
    const opts = {width: width, height: height, left: left, top: top}
    const win = new this._e.remote.BrowserWindow(opts)
    win.loadURL(url)
    win.once('ready-to-show', () => {win.show()})
    return win
  }
}
