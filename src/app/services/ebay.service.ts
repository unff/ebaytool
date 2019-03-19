import { Injectable } from '@angular/core'
import { AuthService } from './ebay/auth.service'
import { LocalStorage } from 'ngx-store'

@Injectable({
  providedIn: 'root'
})
export class EbayService {
    // This class is a super-service for all of the eBay sub-services like Auth and the Inventory API
    // which are located in the ebay folder

    @LocalStorage() public siteModel: string
    @LocalStorage() public isSandbox: boolean

  constructor(private _auth: AuthService) {
      this.siteModel = 'EBAY_US'
      this.isSandbox = false
  }

  public swapEnv(b: boolean) { this.isSandbox = b}
}
