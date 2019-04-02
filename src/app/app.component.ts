import { Component } from '@angular/core'
import { EbayService } from './services/ebay.service'

@Component({
  selector: 'ebt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ebaytool'

  constructor(public _ebay: EbayService) {}

  public doLogin() { this._ebay.doLogin()  }
}
