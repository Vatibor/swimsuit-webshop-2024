import {Component, Inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProductsService} from "../../shared/services/products.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ProductInterface} from "../../shared/models/product.interface";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {CreateFormDialogComponent} from "../create-form-dialog/create-form-dialog.component";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    CommonModule,
    MatProgressSpinner,
    MatFabButton,
    DateFormatPipe,
    MatIconButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgOptimizedImage,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  @Inject(MAT_DIALOG_DATA) public data: ProductInterface
  productList: Array<ProductInterface> = []
  loadingImages: boolean
  counter = 0
  productObj: ProductInterface

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.getAllProducts()

  }


  getAllProducts() {
    this.loadingImages = false
    this.counter = 0
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.productList = res

      this.productList.forEach(product => {
        this.productsService.loadImage(product.image).subscribe(data => {
          product.image = data
          this.counter++

          if (this.counter === this.productList.length) {
            this.loadingImages = true;
          }
        })
      })
    })
  }


  openDialog() {
    this.dialog.open(CreateFormDialogComponent);
  }

  onEdit(product: ProductInterface) {
    this.productObj = product
    this.dialog.open(CreateFormDialogComponent, {
      data: {
        selected_product: product
      }
    });
  }

  onDelete(id: string) {
    const isDelete = confirm('Are you sure want to delete?')
    if(isDelete) {
      this.productsService.delete(id).then(r => {
        this._snackBar.open("Product deleted!", "X")
      }).catch(error => {
        this._snackBar.open(error.message(), "X")
      })
    }
  }

  getProductsBySex(sex: string) {
    this.loadingImages = false
    this.counter = 0
    this.productsService.getProductsBySex(sex).subscribe((res: any) => {
      this.productList = res

      this.productList.forEach(product => {
        this.productsService.loadImage(product.image).subscribe(data => {
          product.image = data
          this.counter++

          if (this.counter === this.productList.length) {
            this.loadingImages = true;
          }
        })
      })
    })
  }

  onValChangeSex(value: string) {
    if (value == "all"){
      this.getAllProducts()
    } else {
      this.getProductsBySex(value)
    }
  }
}
