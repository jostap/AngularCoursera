import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Feedback, ContactType } from './../shared/feedback';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackcopy = null;
  contactType = ContactType;
  visibility = 'show';
  errMess: string;
  showprogress: boolean;
  hiddeform: boolean;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  @ViewChild(FormGroupDirective) feebackFormDirective;

  constructor(private feedbackService: FeedbackService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { 
    this.createForm();
    this.showprogress = false;
    this.hiddeform = false;
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      telnum: ['', [Validators.required, Validators.pattern ]],
      email: ['', [Validators.required, Validators.email ]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.showprogress = true;
    this.feedback = this.feedbackForm.value;
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; 
        return this.feedbackService.submitFeedback(this.feedback); 
      })
      .subscribe(feedback => { this.feedback = feedback; this.feedbackcopy = feedback; console.log(this.feedback);
        this.feedbackcopy.save();
        this.visibility = 'shown'; 
        this.showprogress = false; 
        this.hiddeform = true;
        setTimeout(()=>{    
          this.visibility = 'hidden';
          this.hiddeform = false;
     },5000);
      }),
      errmess => { this.feedback = null; this.errMess = <any>errmess; };
      
    this.feebackFormDirective.resetForm({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
}
