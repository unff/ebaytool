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

    @LocalStorage() public siteModel: string
    @LocalStorage() public isSandbox: boolean

  constructor(private _auth: AuthService, private _http: HttpClient) {
    // temp variables for UI.
      this.siteModel = 'EBAY_US'
      this.isSandbox = false
    // end temp variables. clean up later.
    this.config = this._http.get('assets/config.json') as Observable<Config>
    this.config.toPromise().then((res: any) => {
      this.productionConfig = res.ebay
      this.sandboxConfig = res.ebaysandbox
    })

  }
  public swapEnv(b: boolean) { this.isSandbox = b}
}

