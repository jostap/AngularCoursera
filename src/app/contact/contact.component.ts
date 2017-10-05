import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from './../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feebackForm: FormGroup;
  feeback: Feedback;
  contactType = ContactType;
  @ViewChild(FormGroupDirective) feebackFormDirective;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feebackForm = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feeback = this.feebackForm.value;
    console.log(this.feeback);
    //this.feebackForm.reset();
    this.feebackFormDirective.resetForm();
  }
}
