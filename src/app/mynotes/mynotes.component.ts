import { Component, HostListener, OnInit, SecurityContext  } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.scss']
})
export class MynotesComponent implements OnInit {

  lines: string[] = ['1.'];
  allNotes: Array<Notes> = [];
  currentNote: Notes = {
    Content: "",
    NoteId: 0,
    Title: ""
  };
  isReadOnly: boolean = true;
  @HostListener('input')
  onInput() {
    // Split content into lines
    const lines = this.currentNote.Content.split('\n');

    // Update line numbers
    this.lines = lines.map((_, index) => `${index + 1}.`);
  }

  constructor(private http: AjaxService,
              private sanitizer: DomSanitizer,
              private common: CommonService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.common.loader(true);
    this.http.get("Notes/GetAllNotes").subscribe((res: any) => {
      this.allNotes = res.ResponseBody;
      this.common.loader(false);
      this.common.success("Notes get successfully");
    }, (err) => {
      this.common.loader(false);
      this.common.error(err);
    })
  }

  addNotePopUp() {
    this.lines= ['1.'];
    this.currentNote = {
      Content : "",
      NoteId : 0,
      Title : ""
    };
    this.isReadOnly = false;
    $("#manageNotes").modal('show');
  }

  addNotes() {
    if (this.currentNote.Content && this.currentNote.Title) {
      this.common.loader(true);
      this.http.post("Notes/ManageNote", this.currentNote).subscribe((res: any) => {
        this.allNotes = res.ResponseBody;
        this.common.loader(false);
        $("#manageNotes").modal('hide');
        this.common.success("Note add/updated successfully");
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    } else {
      this.common.error("Please add Conte and Title first");
    }
  }

  viewNote(item: Notes) {
    if (item) {
      this.common.loader(true);
      this.http.get(`Notes/GetNoteById/${item.NoteId}`).subscribe((res: any) => {
        this.currentNote = res.ResponseBody;
        this.currentNote.Content = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(res.ResponseBody.Content));
        this.common.loader(false);
        this.isReadOnly = true;
        $("#manageNotes").modal('show');
        this.common.success("Note add/updated successfully");
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    }
  }

  editNote() {
    this.isReadOnly = false;
  }
  
}

interface Notes {
  NoteId: number,
  Content: any,
  Title: string
}