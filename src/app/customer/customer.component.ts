import { CustomerService } from './../shared/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private _service : CustomerService) { }

  submitted: boolean;
  savedSuccess: boolean;
  formControls = this._service.myForm.controls;

  ngOnInit() {
  }

  onSubmit()
  {
    this.submitted= true;
    if(this._service.myForm.valid==true)
    {
      if(this._service.myForm.value['$key'] == null)
          this._service.addCustomer(this._service.myForm.value);
      else
          this._service.updateCustomer(this._service.myForm.value);    
        this.savedSuccess= true;
        setTimeout(() => this.savedSuccess=false, 3000);
        this._service.myForm.reset();
        this.submitted= false;
    }
  }
}
