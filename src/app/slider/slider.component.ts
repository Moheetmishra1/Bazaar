import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
 @Input({required:true}) bannerImgs !:{img:string,height:string,width:string}[];;
  imagePath= signal<number>(0)


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
