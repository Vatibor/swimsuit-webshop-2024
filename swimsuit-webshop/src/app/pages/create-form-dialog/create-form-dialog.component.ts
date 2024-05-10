import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/users.service";
import {Router} from "@angular/router";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatToolbar} from "@angular/material/toolbar";
import {ProductsService} from "../../shared/services/products.service";
import {ProductInterface} from "../../shared/models/product.interface";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSlider,
    MatSliderThumb,
    MatToolbar,
    CommonModule,
    MatDialogClose,
  ],
  templateUrl: './create-form-dialog.component.html',
  styleUrl: './create-form-dialog.component.scss'
})
export class CreateFormDialogComponent implements OnInit{
  productService = inject(ProductsService)
  fb = inject(FormBuilder)
  router = inject(Router)

  selectedFile: any = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  form = this.fb.nonNullable.group({
    id: '',
    product_name: ['', Validators.required],
    sex: ['', Validators.required],
    price: [0, Validators.required],
    image: ['', Validators.required],
    created_at: 0
  })


  onSubmit() {
    const rawForm = this.form.getRawValue()
    let image_extension: string = '.' + this.selectedFile.type.split('/')[1]

    rawForm.created_at = new Date().getTime()

    this.productService.create(image_extension, rawForm as ProductInterface).then(_ => {
      this._snackBar.open("Created successfully.", "X")
      this.router.navigateByUrl('/products')
    }).catch(error => {
      this._snackBar.open(error.message, "X")
    })

    this.productService.image_upload_to_storage(rawForm.image, this.selectedFile).then(_ => {
      this._snackBar.open("Image upload successfully.", "X")
      this.productService.getAllProducts()
    }).catch(error => {
      this._snackBar.open(error, "X")
    })




  }

  updateProduct() {
    const rawForm = this.form.getRawValue()
    console.log(rawForm)

    this.productService.update(rawForm as ProductInterface).then(_ => {
      this._snackBar.open("Update successfully.");
    }).catch(error => {
      this._snackBar.open(error);
    })
  }

  ngOnInit(): void {
    if(this.data){
      this.form.get('id')?.setValue(this.data.selected_product.id)
      this.form.get('product_name')?.setValue(this.data.selected_product.product_name)
      this.form.get('price')?.setValue(this.data.selected_product.price)
      this.form.get('sex')?.setValue(this.data.selected_product.sex)
      this.form.get('image')?.setValue("images/" + this.data.selected_product.id + ".jpeg")
      this.form.get('created_at')?.setValue(this.data.selected_product.created_at)

    }
  }

}
