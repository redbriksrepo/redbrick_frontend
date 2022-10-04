import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
// import { aadhaar, pan } from 'validate-india';

export interface DialogData {
  editMode: boolean;
}



@Component({
  selector: 'app-profile',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  file!: File;
  ProfileImageUpdate: boolean = false;
  showPassword: boolean = false;
  passwordUpdated: boolean = false;
  passwordToUpdate!: string;
  baseUrl: string = environment.baseUrl;
  profileImage!: string;


  // addUser = new FormGroup({
  //   'firstName': new FormControl(''),
  //   'lastName': new FormControl(''),
  //   'mobileNo': new FormControl(''),
  //   'dateOfBirth': new FormControl(''),
  //   'category': new FormControl(''),
  //   'aadharNo': new FormControl('',[this.ValidateAadhar()]),
  //   'panNo': new FormControl('',[this.ValidatePan()]),
  //   'role': new FormControl(''),
  //   'address': new FormControl(''),
  //   'city': new FormControl(''),
  //   'userName': new FormControl(''),
  //   'password': new FormControl('')
  // })
  addUser = new FormGroup<string | any>({
    'firstName': new FormControl('',[Validators.required]),
    'lastName': new FormControl('',[Validators.required]),
    'mobileNo': new FormControl('',[Validators.required]),
    'dateOfBirth': new FormControl('',[Validators.required]),
    'designation': new FormControl('',[Validators.required]),
    'aadharNo': new FormControl('',[Validators.required]),
    'panNo': new FormControl('',[Validators.required]),
    'role': new FormControl('',[Validators.required]),
    'address': new FormControl('',[Validators.required]),
    'city': new FormControl('',[Validators.required]),
    'userName': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('')
  })

  get aadhaarNO(){
    return this.addUser.get('aadharNo');
  }
  
  get pan(){
    return this.addUser.get('panNo');
  }
  
  get password() {
    return this.addUser.get('password');
  }

  // ValidateAadhar(): ValidatorFn{
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let aadharNo = control.value;
  //     console.log(aadharNo);
  //     if(aadhaar.isValid(aadharNo)){
  //       return null;
  //     }
  //     else{
  //       return {
  //         invalidAadhaar: true
  //       }
  //     }
  //   }
  // }

  // ValidatePan(): ValidatorFn{
  //   return (control: AbstractControl): ValidationErrors| null => {
  //     let panNo = control.value;
  //     if(pan.isValid(panNo)){
  //       return null;
  //     }
  //     else{
  //       return {
  //         invalidPan: true
  //       }
  //     }
  //   }
  // }

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private authService: AuthenticationService,
    private dilogRef: MatDialogRef<AddUserComponent>
     ) { }

  ngOnInit(): void {
    if (this.data.editMode === true) {
      this.getEditUserData();
    }
  }

  getEditUserData() {
    let id = this.userService.userIdToUpdate;
    this.userService.getUserById(id).subscribe((result:any) => {
      this.passwordToUpdate = result.password;
      this.profileImage = result.userImage;
      result.password = '';
      this.addUser.patchValue(result);
      this.cd.detectChanges();
    })
  }

  uploadProfileImage(event: any) {
    this.file = event.target.files[0];
    this.ProfileImageUpdate = true;
  }

  appendFormData() {
    let formData = new FormData;
    if (this.ProfileImageUpdate === true) {
      formData.append('userImage', this.file);
    } else if (this.data.editMode === true) {
      formData.append('userImage', this.profileImage);
    }
    if(this.passwordUpdated === false){
      delete this.addUser.value.password;
    }
    for (let key of Object.keys(this.addUser.value)) {
      formData.append(key, this.addUser.value?.[key]);
    }
    // formData.append('firstName', this.addUser.value?.['firstName']);
    // formData.append('lastName', this.addUser.value?.['lastName']);
    // formData.append('mobileNo', this.addUser.value?.['mobileNo']);
    // formData.append('dateOfBirth', this.addUser.value?.['dateOfBirth']);
    // formData.append('category', this.addUser.value?.['category']);
    // formData.append('aadharNo', this.addUser.value?.['aadharNo']);
    // formData.append('panNo', this.addUser.value?.['panNo']);
    // formData.append('role', this.addUser.value?.['role']);
    // formData.append('address', this.addUser.value?.['address']);
    // formData.append('city', this.addUser.value?.['city']);
    // formData.append('userName', this.addUser.value?.['userName']);
    // formData.append('password', this.addUser.value?.['password']);
    return formData;
  }
  passwordChanged(){
    this.passwordUpdated = true;
  }

  onSubmit() {
    let formData = this.appendFormData();
    if (this.data.editMode === true) {
      formData.append('_id', this.userService.userIdToUpdate);
      this.userService.updateUser(formData).subscribe({
        next: (result: any) => {
          if (result.Message === "User Updated Successfully!") {
            this.dialogRef.close();
          }
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      })
    }
    else {
      this.userService.addUser(formData).subscribe({
        next: (result: any) => {
          if (result.Message === "User Added Successfully") {
            this.dilogRef.close();
          }
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      })
    }
    console.log(this.addUser);
  }
}
