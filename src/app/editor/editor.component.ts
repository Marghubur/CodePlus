import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
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
    Title: "",
    Detail: "",
    IsArticle: false,
    AllTags: []
  }
  Type: Array<string> = Type;
  param: any = null;
  content: any = null;
  imgUrl: string = null;
  imgFileDetail: Array<any> = [];
  @Input() items: Array<any> = [];
  @Input() placeholder: string = "Type...";
  @Input() removable: boolean = true;

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
    this.route.queryParamMap.subscribe((params: any) => this.param = params.params); // output: 
    this.loadData(this.param);
    this.richTextField = document.getElementById("richTextField");
    this.enableEditMode();
  }

  loadData(item: any) {
    if (item.contentId > 0) {
      this.common.loader(true);
      this.http.get(`Article/GetContentById/${item.contentId}`).subscribe((res: any) => {
        if (res.ResponseBody) {
          this.content = this.sanitizer.bypassSecurityTrustHtml(res.ResponseBody.BodyContent);
          this.fileDetail = res.ResponseBody;
          this.imageURL = this.http.imgBaseUrl + this.fileDetail.ImgPath;
          if (this.fileDetail.AllTags)
            this.items = this.fileDetail.AllTags;
          else
            this.items = [];

          this.common.loader(false);
        }
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    }
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
    if (this.fileDetail.Type && this.fileDetail.Title && this.fileDetail.Detail) {
      let value = (document.getElementById("richTextField") as HTMLIFrameElement).contentWindow.document.body.innerHTML;
      if (value) {
        this.common.loader(true);
        this.fileDetail.BodyContent = value;
        this.fileDetail.AllTags = this.items;
        if (!this.fileDetail.ContentId)
          this.fileDetail.ContentId = 0;
        
        let formData = new FormData();
        formData.append("article", JSON.stringify(this.fileDetail));
        if (this.imgFileDetail && this.imgFileDetail.length > 0)
          formData.append(`file`, this.imgFileDetail[0].file);
        this.http.post("Article/SaveArticle", formData).subscribe(res => {
          this.common.success("save");
          this.common.loader(false);
        }, (error) => {
          this.common.error(error);
          this.common.loader(false);
        })
      }
    } else {
      this.common.error("Title, Detail, Part, Type and Thumbnail is manditory.");
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
    this.imgFileDetail = [];
    $('#uploadocument').click();
  }

  addChip(e: any) {
    let value = e.target.value;
    if (value && value != '') {
      this.items.push(value);
    }
    e.target.value = '';
  }

  removeChip(i: number) {
    if (this.items.length > 0)
      this.items.splice(i, 1);
  }

}