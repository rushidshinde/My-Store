import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {CartService} from "../../service/cart.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList : any;
  public filterCategory : any;
  public searchKey : string = "";
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe({
        next : (res : any) =>{
          this.productList = res;
          this.filterCategory = res;
          this.productList.forEach((a : any) =>{
            if(a.category === "men's clothing" || a.category === "women's clothing"){
              a.category = "fashion";
            }
            Object.assign(a,{quantity : 1, total : a.price});
          });
        }, error(){
          alert("Error while getting Data..!");
        }
      })

    this.cartService.search.subscribe(value => {
      this.searchKey = value;
    })

  }

  addToCart(item : any){
    this.cartService.addToCart(item);

  }
  filter(category : string){
    this.filterCategory = this.productList
      .filter((a : any)=>{
        if(a.category == category || category == ''){
          return a;
        }
      })
  }

}
