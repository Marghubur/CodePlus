import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
import 'bootstrap';
import { Type } from 'src/util/constant';
import { TopicContent } from 'src/util/intrface';
import { CommonService } from '../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewChecked {
  showingSourceCode: boolean = false;
  isInEditMode: boolean = true;
  richTextField: any;
  imageURL: string = "";
  rows: number = 0;
  columns: number = 0;
  fileDetail:TopicContent = {
    BodyContent : "",
    Part: 0,
    FilePath: "",
    ImgPath: "",
    Type:"",
    Title: "C# Generics Interview Questions",
    Detail: "This is the 1st part of this C# Interview Questions and Answers article series. Each part will contain 10 C# Interview Questions with Answers. I will highly recommend to please read the previous parts always before reading the current part."
  }
  Type: Array<string> = Type;
  param: any = null;
  content: any = null;
  imgUrl: string = null;
  imgFileDetail: Array<any> = [];

  constructor(private http: AjaxService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private common: CommonService) {}

  ngAfterViewChecked(): void {
    $('[data-bs-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });

    $('[data-bs-toggle="tooltip"]').on('click', function () {
      $(this).tooltip('dispose');
    });
  }

  ngOnInit() {
    this.common.loader(true);
    this.route.queryParamMap.subscribe((params: any) => this.param = params.params); // output: 
    if (this.param && this.param.FileName) {
      let FileName = this.param.FileName;
      let Folder = this.param.Folder;
      this.fileDetail.Part = this.param.Part;
      this.fileDetail.Type = this.param.Type;
      console.log(this.fileDetail);
      this.common.readTxtFile(Folder ,FileName).subscribe((res: any) => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(res);
        this.common.loader(false);
      }, (error) => {
        this.common.loader(false);
        console.log(error)
      });
    } else {
      this.common.loader(false);
    }
    this.richTextField = document.getElementById("richTextField");
    this.enableEditMode();
  }


  enableEditMode (){
    this.richTextField.contentDocument.designMode  = 'On';
  }

  execCmd (command) {
      this.richTextField.contentDocument.execCommand(command, false, null);
  }

  execCommandWithArg (command, arg) {
    let value = arg.target.value;
      this.richTextField.contentDocument.execCommand(command, false, value);
  }
  toggleSource () {
      if(this.showingSourceCode){
          this.richTextField.contentDocument.getElementsByTagName('body')[0].innerHTML =
          this.richTextField.contentDocument.getElementsByTagName('body')[0].textContent;
          this.showingSourceCode = false;
      }else{
          this.richTextField.contentDocument.getElementsByTagName('body')[0].textContent =
          this.richTextField.contentDocument.getElementsByTagName('body')[0].innerHTML;
          this.showingSourceCode = true;
      }
  }

  toggleEdit() {
      if(this.isInEditMode){
          this.richTextField.contentDocument.designMode = 'Off';
          this.isInEditMode = false;
      }else{
          this.richTextField.contentDocument.designMode = 'On';
          this.isInEditMode = true;
      }
  }
  toggleDarkLight() {
      var element = document.getElementById("richtextcontainer");
      element.classList.toggle("dark-mode");
  }

  uploadProfilePicture(event: any) {
    this.imageURL = "";
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      };
      this.richTextField.contentDocument.execCommand('insertImage', false, this.imageURL);

      // this.employeeForm.patchValue({
      //   ProfileImgPath: event.target.result,
      // });
    }
  }

  fireBrowserFile() {
    $("#uploarichimage").click();
  }

  tabelPopUp() {
    $('#tableModal').modal('show');
  }

  addTable() {
    var html = this.generateTable();
    this.richTextField.contentDocument.execCommand('insertHTML', false, html.toString());
    $('#tableModal').modal('hide');
  }

  generateTable() {
    let myRows = this.rows;
    let myColumns = this.columns;
    var html = '<table style="border-collapse: collapse; width: 100%;"><tbody>';
    for (let i = 0; i <myRows; i++) {
      html += "<tr>";
      for (let j = 0; j <myColumns; j++) {
        html += "<td style='padding: 15px; border: 1px solid #222; vertical-align: middle;'>&nbsp;</td>"
      }
      html += "</tr>";
    }
    html += "</tbody></table>";
    return html;
  }

  saveContent() {
    if (this.fileDetail.Part > 0 && this.fileDetail.Type && this.imgFileDetail && this.imgFileDetail.length > 0 && this.fileDetail.Title && this.fileDetail.Detail) {
      let value = (document.getElementById("richTextField") as HTMLIFrameElement).contentWindow.document.body.innerHTML;
      if (value) {
        this.common.loader(true);
        this.fileDetail.BodyContent = value;
        let formData = new FormData();
        formData.append("article", JSON.stringify(this.fileDetail));
        formData.append(`${this.fileDetail.Type}_${this.fileDetail.Part}`, this.imgFileDetail[0].file);
        this.http.post("Article/SaveArticle", formData).subscribe(res => {
          console.log("save");
          this.common.loader(false);
        }, (error) => {
          console.log(error);
          this.common.loader(false);
        })
      }
    } else {
      console.log("Title, Detail, Part, Type and Thumbnail is manditory.");
    }
  }

  uploadFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
      let selectedfile = event.target.files;
      let file = <File>selectedfile[0];
      this.imgFileDetail.push({
        name: "logo",
        file: file
      });
    }
  }

  fireBrowserImgFile() {
    $('#uploadocument').click();
  }

}