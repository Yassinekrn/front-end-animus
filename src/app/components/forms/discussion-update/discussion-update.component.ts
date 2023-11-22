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
      title: [
        this.discussion.title || '',
        [
          Validators.required,
          Validators.pattern('^[A-Z].*'),
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      description: [
        this.discussion.description || '',
        [
          Validators.required,
          Validators.pattern('^[A-Z].*'),
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],
      date: [
        this.discussion.date ? new Date(this.discussion.date) : new Date(),
        Validators.required,
      ],
      img: [
        this.discussion.img || '',
        [
          Validators.required,
          Validators.pattern('^(https?://.*\\.(?:png|jpg|jpeg))'),
        ],
      ],

      spoiler: [this.discussion.spoiler],
      priority: [
        this.discussion.priority,
        [Validators.min(1), Validators.max(5)],
      ],
      animeCheckboxes: this.createAnimeCheckboxes(),
      validators: this.atLeastOneCheckboxValidator(1),
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

  atLeastOneCheckboxValidator(minRequired = 1) {
    return function (formArray: FormArray) {
      const totalChecked = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);
      return totalChecked >= minRequired ? null : { requireOneCheckbox: true };
    };
  }

  isTitleTooShort(): boolean {
    const titleControl = this.updateDiscussionForm.get('title');
    return (
      titleControl.errors?.['minlength'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleTooLong(): boolean {
    const titleControl = this.updateDiscussionForm.get('title');
    return titleControl.errors?.['maxlength'] && titleControl.dirty;
  }

  isTitleNotCapitalized(): boolean {
    const titleControl = this.updateDiscussionForm.get('title');
    return (
      titleControl.errors?.['pattern'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleInvalid(): boolean {
    const titleControl = this.updateDiscussionForm.get('title');
    return (
      titleControl.errors?.['required'] &&
      titleControl.dirty &&
      titleControl.value.trim() === ''
    );
  }

  isDescriptionTooShort(): boolean {
    const descriptionControl = this.updateDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['minlength'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionTooLong(): boolean {
    const descriptionControl = this.updateDiscussionForm.get('description');
    return descriptionControl.errors?.['maxlength'] && descriptionControl.dirty;
  }

  isDescriptionNotCapitalized(): boolean {
    const descriptionControl = this.updateDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['pattern'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionInvalid(): boolean {
    const descriptionControl = this.updateDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['required'] &&
      descriptionControl.dirty &&
      descriptionControl.value.trim() === ''
    );
  }

  isDateInvalid(): boolean {
    const dateControl = this.updateDiscussionForm.get('date');
    return dateControl.invalid && dateControl.dirty;
  }

  isImageInvalid(): boolean {
    const imgControl = this.updateDiscussionForm.get('img');
    return imgControl.invalid && imgControl.dirty;
  }

  isNoneCheckboxChecked(): boolean {
    const animeCheckboxesControl = this.updateDiscussionForm.get(
      'animeCheckboxes'
    ) as FormArray;
    const checkedBoxes = animeCheckboxesControl.controls
      .map((control) => control.value)
      .some((isChecked) => isChecked);
    return !checkedBoxes && animeCheckboxesControl.dirty;
  }

  isPriorityBelowMin(): boolean {
    const priorityControl = this.updateDiscussionForm.get('priority');
    return (
      priorityControl.errors?.['min'] &&
      priorityControl.dirty &&
      !priorityControl.errors?.['required']
    );
  }

  isPriorityAboveMax(): boolean {
    const priorityControl = this.updateDiscussionForm.get('priority');
    return priorityControl.errors?.['max'] && priorityControl.dirty;
  }
}
