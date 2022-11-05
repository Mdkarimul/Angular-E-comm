import { Component,OnInit } from '@angular/core';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private seller:SellerService){}
  title = 'E-commerce';
  ngOnInit():void{
   this.seller.reloadSeller();
  }
}
