import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  _customerList : AngularFireList<any>;
  constructor(private _db : AngularFireDatabase) { }

  myForm = new FormGroup({
    $key : new FormControl(null),
    fullname : new FormControl('', Validators.required),
    mobile_no : new FormControl('', [Validators.required, Validators.minLength(10)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    address : new FormControl(''),
  });

  getAllCustomers()
  {
    this._customerList = this._db.list("/customers");
    return this._customerList.snapshotChanges();
  }

  addCustomer(customer)
  {
    this._customerList.push({
      fullname: customer.fullname,
      mobile_no: customer.mobile_no,
      email: customer.email,
      address: customer.address
    });
  }

  //fill the form on edit button
  showForm(customer)
  {
    this.myForm.setValue(customer);
  }

  //update the value 
  updateCustomer(customer)
  {
    this._customerList.update(customer.$key,
      {
        fullname: customer.fullname,
        mobile_no: customer.mobile_no,
        email: customer.email,
        address: customer.address
      });
  }

  //delete
  deleteCustomer($key)
  {
      this._customerList.remove($key );
  }

}
