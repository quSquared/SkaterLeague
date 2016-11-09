import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

@Component({
  selector: "sl-sign-in",
  templateUrl: "sign-in/sign-in.html"
})

export class SignInComponent implements OnInit {
    
  @ViewChild("initialContainer") initialContainer: ElementRef;
  
  constructor(private router: Router,
    private page: Page) {
  }  

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}