import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';
import { Anime } from 'src/app/classes/anime/anime';

@Component({
  selector: 'app-discussion-update',
  templateUrl: './discussion-update.component.html',
  styleUrls: ['./discussion-update.component.css'],
})
export class DiscussionUpdateComponent implements OnInit {
  discussion: Discussion;
  availableAnimes: Anime[] = [];
  updateDiscussionForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataS: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dataS.getAnimes().subscribe((animes) => {
      this.availableAnimes = animes;

      this.dataS
        .getDiscussion(this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.discussion = data;
          this.initializeForm();
        });
    });
  }

  initializeForm(): void {
    const formControls = {
      title: [this.discussion.title || '', Validators.required],
      description: [this.discussion.description || '', Validators.required],
      date: [
        this.discussion.date ? new Date(this.discussion.date) : new Date(),
        Validators.required,
      ],
      img: [
        this.discussion.img || '',
        [
          Validators.required,
          Validators.pattern('(https?://.*.(?:png|jpg|jpeg))'),
        ],
      ],

      spoiler: [this.discussion.spoiler],
      priority: [
        this.discussion.priority,
        [Validators.min(0), Validators.max(5)],
      ],
      animeCheckboxes: this.createAnimeCheckboxes(),
    };

    this.updateDiscussionForm = this.fb.group(formControls);
  }

  createAnimeCheckboxes(): FormArray {
    const formArray = this.fb.array([]);

    this.availableAnimes.forEach((anime) => {
      const isChecked = this.discussion.animes.some(
        (a) => a.title === anime.title
      );
      formArray.push(this.fb.control(isChecked));
    });

    return formArray;
  }

  onSubmit(): void {
    if (this.updateDiscussionForm.valid) {
      const updatedAnimes = this.availableAnimes.filter(
        (anime, index) =>
          this.updateDiscussionForm.get('animeCheckboxes').get(index.toString())
            .value
      );

      this.discussion.title = this.updateDiscussionForm.get('title').value;
      this.discussion.description =
        this.updateDiscussionForm.get('description').value;

      // Convert the date string to a Date object
      this.discussion.date = new Date(
        this.updateDiscussionForm.get('date').value
      );

      this.discussion.spoiler = this.updateDiscussionForm.get('spoiler').value;
      this.discussion.priority =
        this.updateDiscussionForm.get('priority').value;
      this.discussion.animes = updatedAnimes;
      this.discussion.img = this.updateDiscussionForm.get('img').value;

      // Call the service to update the discussion using this.discussion
      this.dataS.updateDiscussion(this.discussion).subscribe((updatedData) => {
        console.log('Discussion updated:', updatedData);
        // Navigate back to the 'main' route
        this.router.navigate(['/']);
      });
    } else {
      // Handle invalid form
    }
  }

  cancelUpdate() {
    // Navigate back to the 'main' route
    this.router.navigate(['/']);
  }
}
