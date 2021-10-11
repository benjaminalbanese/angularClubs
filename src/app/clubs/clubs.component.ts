import {Component, OnInit} from '@angular/core';
import {ClubService} from "./club.service";
import {Club} from "../club";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];

  constructor(private clubService: ClubService) {
  }

  ngOnInit(): void {
    this.getClubs()
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(fetched => this.clubs = fetched);
  }
}
