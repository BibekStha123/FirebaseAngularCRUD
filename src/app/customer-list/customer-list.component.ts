import { CustomerService } from './../shared/customer.service';
import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers = [];
  deleteSuccess: boolean;

  constructor( private _service : CustomerService) { }

  ngOnInit() {
    this._service.getAllCustomers().subscribe(
      list =>{
        // console.log(list);
        this.customers = list.map(item => {
          // console.log(item.payload.val());
          return{
            $key: item.key,
            ...item.payload.val()
          };
        })
      });
  }

  // onEdit($key)
  // {
  //   this._service.updateCustomer($key);
  // }

  onDelete($key) //you can directly call the function from _service as done for edit
  {
    if(confirm("Sure, want to delete?"))
    {
      this._service.deleteCustomer($key);
      this.deleteSuccess =true;
      setTimeout(()=> this.deleteSuccess=false, 3000);
    }
  }
  
}
