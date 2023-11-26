import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/app/classes/anime/anime';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  animeId: string;
  anime: Anime;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.animeId = this.activatedRoute.snapshot.params['id'];
    this.dataService.getAnime(Number(this.animeId)).subscribe((data) => {
      this.anime = data;
    });
  }
}
