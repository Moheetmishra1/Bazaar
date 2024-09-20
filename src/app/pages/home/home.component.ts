// import { images } from './../../../assets/login-images/images';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavBarHomeComponent } from "../nav-bar-home/nav-bar-home.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { shoppingHeader } from '../../../assets/products-images';
import { NgFor, NgIf } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { LogoComponent } from "../../logo/logo.component";
import { SliderComponent } from "../../slider/slider.component";
// import {shoppingHeader} from "../../../assets/products-images"


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarHomeComponent, NavbarComponent, NgFor, LoginComponent, LogoComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  bannerImgs:{img:string,height:string,width:string}[] = shoppingHeader;
imagePath= signal<number>(0)



constructor(private destoryRef :DestroyRef){
  
}
ngOnInit(){
  // const subscription = setInterval(()=>{
  //   let random= Math.floor(Math.random()*this.bannerImgs.length);
  //   console.log(random);
  //   this.imagePath.set(random)
    
  // },2000)
  // this.destoryRef.onDestroy(()=> clearInterval(subscription))
}
ngAfterViewInit(){
  

}

onClickSlide(slide:string){
if(slide==='next'){
    if(this.imagePath() >=this.bannerImgs.length ){
        this.imagePath.set(0);
      }else{
        this.imagePath.update(val=>val+1)
      }
}else{
  if(this.imagePath() <= 0 ){
    this.imagePath.set(this.bannerImgs.length-1);
  }else{
    this.imagePath.update(val=>val-1)
  }
}
console.log(this.imagePath());

}
}
