import { afterNextRender, Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { debounce, debounceTime } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  year= new Date().getFullYear()
  submitError=signal<string>('')
  private httpClient= inject(HttpClient)
  private destoryRef= inject(DestroyRef)
  private form = viewChild.required<NgForm>('form')
  private route= inject(Router)
  constructor(){
    afterNextRender(()=>{
      let localEmail= window.sessionStorage.getItem('saved-login-form');
      if(localEmail){
        const email= JSON.parse(localEmail).email;
        setTimeout(()=>
          this.form().controls['email'].setValue(email)  //this will update after some time.
      ,1)        
      }

    const subscription=   this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
      next:(value )=>{
        window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}))
      }
      });
      this.destoryRef.onDestroy(()=>subscription?.unsubscribe())
    })
  }

  onSubmit(formData:NgForm){

    setTimeout(()=>
    this.submitError.set("") ,2000)
    
    if(!(formData.value.email && formData.value.password)){
      this.submitError.set("All fields are mandatory.")
      return ;
    }
    if((formData.status==='INVALID')){
      this.submitError.set('Form field is not valid')
      return ;
    }
     
    const subscription = this.httpClient.post('https://fakestoreapi.com/auth/login',{
            // username: "mor_2314",
            // password: "83r5^_" 
            username:formData.value?.email,
            password:formData?.value?.password
    })
    .subscribe({
      next:(data:any)=>{console.log(data);
       window.sessionStorage.setItem('token',data.token) ;
       this.route.navigate(['signup'])
      },
      error:(error)=>{
        console.log(error.message);            
          this.submitError.set("Invalid unsername and password.")
      }
    })
    this.destoryRef.onDestroy(()=>subscription.unsubscribe())
       
  }



}
