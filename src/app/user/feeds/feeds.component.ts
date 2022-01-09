import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { post, comment } from "../../../environments/environment";
import { CommonService } from "../../theme/utils/common.service";
@Component({
  selector: "app-feeds",
  templateUrl: "./feeds.component.html",
  styleUrls: ["./feeds.component.scss"],
})
export class FeedsComponent implements OnInit {
  imageData: any;
  constructor(private commonService: CommonService,
    public formBuilder: FormBuilder,
     public snackBar: MatSnackBar) {}
  isShown: boolean;
  postList: any = [];
  postData:any ;
  userData;
  myComment:any;
  // feedsForm: FormGroup;
  ngOnInit() {
    // this.feedsForm = this.formBuilder.group({
    //   'post': ['', Validators.compose([Validators.required])] 
    // });
    this.userData = JSON.parse(localStorage.getItem('user')) ; 
    console.log(this.userData);
    
    this.isShown = false; //hidden every time subscribe detects change
    this.getPostList();
  }

  getPostList() {
    this.commonService.get<any>(post.list).subscribe(
      async (res) => {
        console.log(res);
        this.postList = res.data;
        this.postList.forEach((element) => {
          element["isLoadComment"] = false;
          if(element.image != "") {
            element["image"] = 'data:image/png;base64,' + element.image
          }
         
        });

        // this.postList.sort((a,b) => a.dCreatedDate.localeCompare(b.dCreatedDate));

        this.postList.sort((a, b) => b.dCreatedDate - a.dCreatedDate);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleShow(i, postId) {
    this.commonService.get<any>(comment.byPostId + postId).subscribe(
      async (res) => {
        console.log(res);
        if (res.data.comments.length) {
          this.postList[i].commentData = res.data.comments;
          this.postList.forEach((element, index) => {
            if (index == i) {
              element["isLoadComment"] = true;
            } else {
              element["isLoadComment"] = false;
            }
          });
        } else{
          this.snackBar.open("No Comments found for this post.", '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(i);
  }

newPost() {
  console.log("in submit");
  // console.log(this.postData);
  console.log(this.userData);
  
  let userId;
  if(this.userData._id) {
    userId = this.userData._id
  } else {
    userId = this.userData.sGoogleId
  }
  const formData = new FormData();
  formData.append('avatar',this.imageData)
  formData.append('text',this.postData)
  formData.append('postedUser',userId)
  // const data = {
  //   text : this.postData,
  //   postedUser: this.userData._id
  // }


  this.commonService
  .post<any>(post.create, formData)
  .subscribe(
    async (res) => {
      console.log(res);
      
      this.getPostList();
    },err=>{
      this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
    })
// console.log(this.feedsForm.value);

}

postComment(i,postId,myComment:HTMLInputElement){
  console.log(myComment.value);
  
  const data = {
    comment : myComment.value,
    postId: postId,
    userId: this.userData._id
  }
  this.commonService
  .post<any>(comment.create, data)
  .subscribe(
    async (res) => {
    this.toggleShow(i,postId);
    myComment.value = ''
    },err=>{
      this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
    })
}
uploadFileEvt(e) {
  console.log(e.target.files[0]);
 this.imageData = e.target.files[0];
}
}
