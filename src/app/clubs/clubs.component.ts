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

  add(name: string, manager: string, founded: string) {
    name = name.trim();
    manager = manager.trim();
    founded = founded.trim();
    if (!name || !manager || !founded) {
      console.log("at least one value was falsy");
      return;
    }
    this.clubService.addClub({name, manager, founded} as Club).subscribe(club => this.clubs.push(club));
  }

  delete(club: Club) : void {
    this.clubs = this.clubs.filter(item => item !== club)
    this.clubService.deleteClub(club).subscribe();
  }
}
