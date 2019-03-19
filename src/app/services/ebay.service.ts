import { Injectable } from '@angular/core'
import { AuthService } from './ebay/auth.service'

@Injectable({
  providedIn: 'root'
})
export class EbayService {
    // This class is a super-service for all of the eBay sub-services like Auth and the Inventory API
    // which are located in the ebay folder

  constructor() { }
}
