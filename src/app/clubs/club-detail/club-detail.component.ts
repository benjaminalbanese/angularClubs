import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClubService} from "../club.service";
import {Location} from "@angular/common";
import {Club} from "../../club";

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
  club: Club | undefined

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getClub();
  }

  getClub(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clubService.getClub(id).subscribe(fetched => this.club = fetched);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.club) {
      this.clubService.updateClub(this.club).subscribe(() => this.goBack())
    }
  }
}
