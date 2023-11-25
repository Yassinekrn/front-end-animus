import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Anime } from 'src/app/classes/anime/anime';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.component.html',
  styleUrls: ['./create-discussion.component.css'],
})
export class CreateDiscussionComponent implements OnInit {
  availableAnimes: Anime[] = [];
  createDiscussionForm: FormGroup;
  currentDate: Date;
  discussion: Discussion;

  constructor(
    private dataS: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataS.getAnimes().subscribe((animes) => {
      this.availableAnimes = animes;
      this.discussion = new Discussion();
      this.currentDate = new Date();
      this.initializeForm();
    });
  }

  initializeForm(): void {
    const formControls = {
      title: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z].*'),
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z].*'),
          Validators.minLength(100),
          Validators.maxLength(500),
        ],
      ],
      date: [
        this.currentDate.toISOString().substring(0, 10),
        Validators.required,
      ],
      img: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(https?|ftp):\\/\\/[^\\s\\/$.?#].[^\\s]*\\.(jpg|jpeg|png)(\\?.*)?$'
          ),
        ],
      ],
      spoiler: [false],
      priority: ['', [Validators.min(1), Validators.max(5)]],
      animeCheckboxes: this.createAnimeCheckboxes(),
      validators: this.atLeastOneCheckboxValidator(1),
    };

    this.createDiscussionForm = this.fb.group(formControls);
  }

  createAnimeCheckboxes(): FormArray {
    const formArray = this.fb.array([]);

    this.availableAnimes.forEach((anime) => {
      formArray.push(this.fb.control(false));
    });

    return formArray;
  }

  atLeastOneCheckboxValidator(minRequired = 1) {
    return function (formArray: FormArray) {
      const totalChecked = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);
      return totalChecked >= minRequired ? null : { requireOneCheckbox: true };
    };
  }

  onSubmit(): void {
    if (this.createDiscussionForm.valid) {
      console.log('form valid');

      const updatedAnimes = this.availableAnimes.filter(
        (anime, index) =>
          this.createDiscussionForm.get('animeCheckboxes').get(index.toString())
            .value
      );

      this.discussion.title = this.createDiscussionForm.get('title').value;
      this.discussion.description =
        this.createDiscussionForm.get('description').value;

      // Convert the date string to a Date object
      this.discussion.date = new Date(
        this.createDiscussionForm.get('date').value
      );

      this.discussion.spoiler = this.createDiscussionForm.get('spoiler').value;
      this.discussion.priority =
        this.createDiscussionForm.get('priority').value;
      this.discussion.animes = updatedAnimes;
      this.discussion.img = this.createDiscussionForm.get('img').value;
      console.log(this.discussion);

      // Call the service to update the discussion using this.discussion
      this.dataS.addDiscussion(this.discussion).subscribe((data) => {
        console.log('Discussion created:', data);
        // Navigate back to the 'main' route
        this.router.navigate(['/']);
      });
    } else {
      // Handle invalid form
    }
  }

  cancelCreate() {
    // Navigate back to the 'main' route
    this.router.navigate(['/']);
  }

  isTitleTooShort(): boolean {
    const titleControl = this.createDiscussionForm.get('title');
    return (
      titleControl.errors?.['minlength'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleTooLong(): boolean {
    const titleControl = this.createDiscussionForm.get('title');
    return titleControl.errors?.['maxlength'] && titleControl.dirty;
  }

  isTitleNotCapitalized(): boolean {
    const titleControl = this.createDiscussionForm.get('title');
    return (
      titleControl.errors?.['pattern'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleInvalid(): boolean {
    const titleControl = this.createDiscussionForm.get('title');
    return (
      titleControl.errors?.['required'] &&
      titleControl.dirty &&
      titleControl.value.trim() === ''
    );
  }

  isDescriptionTooShort(): boolean {
    const descriptionControl = this.createDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['minlength'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionTooLong(): boolean {
    const descriptionControl = this.createDiscussionForm.get('description');
    return descriptionControl.errors?.['maxlength'] && descriptionControl.dirty;
  }

  isDescriptionNotCapitalized(): boolean {
    const descriptionControl = this.createDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['pattern'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionInvalid(): boolean {
    const descriptionControl = this.createDiscussionForm.get('description');
    return (
      descriptionControl.errors?.['required'] &&
      descriptionControl.dirty &&
      descriptionControl.value.trim() === ''
    );
  }

  isDateInvalid(): boolean {
    const dateControl = this.createDiscussionForm.get('date');
    return dateControl.invalid && dateControl.dirty;
  }

  isImageInvalid(): boolean {
    const imgControl = this.createDiscussionForm.get('img');
    return imgControl.invalid && imgControl.dirty;
  }

  isNoneCheckboxChecked(): boolean {
    const animeCheckboxesControl = this.createDiscussionForm.get(
      'animeCheckboxes'
    ) as FormArray;
    const checkedBoxes = animeCheckboxesControl.controls
      .map((control) => control.value)
      .some((isChecked) => isChecked);
    return !checkedBoxes && animeCheckboxesControl.dirty;
  }

  isPriorityBelowMin(): boolean {
    const priorityControl = this.createDiscussionForm.get('priority');
    return (
      priorityControl.errors?.['min'] &&
      priorityControl.dirty &&
      !priorityControl.errors?.['required']
    );
  }

  isPriorityAboveMax(): boolean {
    const priorityControl = this.createDiscussionForm.get('priority');
    return priorityControl.errors?.['max'] && priorityControl.dirty;
  }

  toggleSpoilerIcon(): void {
    const spoiler = document.getElementById('spoiler') as HTMLInputElement;
    const spoilerIcon = document.querySelector('.form-check-label i');
    if (spoiler.checked) {
      spoilerIcon.classList.remove('fa-eye');
      spoilerIcon.classList.add('fa-eye-slash');
    } else {
      spoilerIcon.classList.remove('fa-eye-slash');
      spoilerIcon.classList.add('fa-eye');
    }
  }
}
