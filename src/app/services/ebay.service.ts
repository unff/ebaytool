import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from './ebay/auth.service'
import { LocalStorage } from 'ngx-store'
import { Observable } from 'rxjs'
import { Config } from './config'


@Injectable({
  providedIn: 'root'
})
export class EbayService {
    // This class is a super-service for all of the eBay sub-services like Auth and the Inventory API
    // which are located in the ebay folder
    private config: Observable<Config>
    private productionConfig: Config
    private sandboxConfig: Config
    private windowHandle: Electron.BrowserWindow = null

    @LocalStorage() public siteModel: string // holds the region identifier
    @LocalStorage() public isSandbox: boolean // switch to handle whether it's sandbox or not

  constructor(private _auth: AuthService, private _http: HttpClient) {
    // temp variables for UI.
    this.siteModel = 'EBAY_US'
    this.isSandbox = false
    // end temp variables. clean up later.
    this.config = this._http.get('assets/config.json') as Observable<Config>
    this.config.toPromise().then((res: any) => {
      this.productionConfig = res.ebay as Config
      this.sandboxConfig = res.ebaysandbox as Config
    })
  }
  public swapEnv(b: boolean) { this.isSandbox = b }
  public openAuthWindow(url: string): Electron.BrowserWindow {
    const win: Electron.BrowserWindow = this._auth.openAuthWindow(url)
    return win
  }
}
// need better way to flip from prod to sandbox
