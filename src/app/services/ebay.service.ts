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

    // tokens.ts contains an object for holding token information.

    private windowHandle: Electron.BrowserWindow = null
    public bigUrl: string
    @LocalStorage() public siteModel: string // holds the region identifier
    @LocalStorage() public isSandbox: boolean // switch to handle whether it's sandbox or not

  constructor(private _auth: AuthService, private _http: HttpClient) {
    // temp variables for UI.
    this.siteModel = 'EBAY_US'
    this.isSandbox = false
    // end temp variables. clean up later.
  }
  public swapEnv(b: boolean) { this.isSandbox = b }

  public doLogin() {
    this._auth.getTokenSet()
  }
}
// need better way to flip from prod to sandbox
