import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    product: IProduct;

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        // 1 version
        //let id = +this.route.snapshot.params['id'];
        //this.getProduct(id);
        
        // second version
        // this.route.params.subscribe(
        //     params => {
        //         let id = +params['id'];
        //         this.getProduct(id);
        //     }
        // );
        
        // third version
        // let product = this.route.snapshot.data['product'];
        // this.onProductRetrieved(product);
        
        // fourth version
        this.route.data.subscribe(data => {
            this.onProductRetrieved(data['product']);
        });
    }

    // second version
    // getProduct(id: number): void {
    //     this.productService.getProduct(id)
    //         .subscribe(
    //             (product: IProduct) => this.onProductRetrieved(product),
    //             (error: any) => this.errorMessage = <any>error
    //         );
    // }

    onProductRetrieved(product: IProduct): void {
        this.product = product;
        debugger;
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (true === true) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }

        // Navigate back to the product list
        this.router.navigate(['/products']);
    }
}
