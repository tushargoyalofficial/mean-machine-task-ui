import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';
import { Product } from '../shared/modalsl/product.modal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public products: Array<Product> = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }





  // GET ALL PRODUCTS FROM SERVER
  getAllProducts(): void {
    this.productService.fetchProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Product[]) => {
        this.products = res;
      }, err => console.log('Error in fetching products: ', err));
  }





  ngOnInit() {
    this.getAllProducts();
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }
}
