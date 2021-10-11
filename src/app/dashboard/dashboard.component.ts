import {Component, OnInit} from '@angular/core';
import {Club} from "../club";
import {ClubService} from "../clubs/club.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clubs: Club[] = []

  constructor(private clubService: ClubService) {
  }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(fetchedClubs => this.clubs = fetchedClubs.slice(0, 4))
  }

}
