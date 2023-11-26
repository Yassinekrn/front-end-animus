import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  ValidationErrors,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Anime } from 'src/app/classes/anime/anime';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css'],
})
export class AnimeFormComponent {
  createAnimeForm: FormGroup;
  tagsList: string[] = [
    'Magical girl',
    'Action',
    'Comedy',
    'Superhero',
    'Romantic comedy',
    'Slice of life',
    'Adventure',
    'Fantasy',
    'Martial arts',
    'Fantasy comedy',
    'Dark fantasy',
    'Supernatural',
    'Science fantasy',
    'Post-apocalyptic',
  ];
  anime: Anime;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.createAnimeForm = this.fb.group({
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
      img: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(https?|ftp):\\/\\/[^\\s\\/$.?#].[^\\s]*\\.(jpg|jpeg|png)(\\?.*)?$'
          ),
        ],
      ],
      tags: this.fb.array([]), // Initialize FormArray for tags
    });
    this.createAnimeForm.setControl('tags', this.createTagsCheckboxes());
  }

  createTagsCheckboxes(): FormArray {
    const formArray = this.tagsList.map((tag) => {
      return this.fb.control(false);
    });

    return this.fb.array(formArray, this.atLeastOneCheckboxValidator());
  }

  getTagControl(index: number): FormControl | null {
    const tagsArray = this.createAnimeForm.get('tags') as FormArray;
    return tagsArray.controls[index] as FormControl;
  }

  atLeastOneCheckboxValidator(minRequired = 1): ValidatorFn {
    return (formArray: FormArray): ValidationErrors | null => {
      const totalChecked = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);

      return totalChecked >= minRequired ? null : { requireOneCheckbox: true };
    };
  }

  onSubmit(): void {
    if (this.createAnimeForm.valid) {
      // Gather form data
      const formData = this.createAnimeForm.value;

      // Extract selected tags
      const selectedTags = this.tagsList.filter((tag) => formData[tag]);

      // Create the anime object
      this.anime = {
        title: formData.title,
        description: formData.description,
        image_url: formData.img,
        tags: selectedTags,
      };

      // Call the service to add the anime using this.anime
      this.dataService.addAnime(this.anime).subscribe((data) => {
        console.log('Anime created:', data);
        // Navigate back to the 'main' route or other desired route
        this.router.navigate(['/animes']);
      });
    } else {
      // Handle invalid form
    }
  }

  cancelCreate() {
    // Navigate back to the 'main' route or other desired route
    this.router.navigate(['/animes']);
  }

  // Validation functions for form fields
  isTitleTooShort(): boolean {
    const titleControl = this.createAnimeForm.get('title');
    return (
      titleControl.errors?.['minlength'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleTooLong(): boolean {
    const titleControl = this.createAnimeForm.get('title');
    return titleControl.errors?.['maxlength'] && titleControl.dirty;
  }

  isTitleNotCapitalized(): boolean {
    const titleControl = this.createAnimeForm.get('title');
    return (
      titleControl.errors?.['pattern'] &&
      titleControl.dirty &&
      !titleControl.errors?.['required']
    );
  }

  isTitleInvalid(): boolean {
    const titleControl = this.createAnimeForm.get('title');
    return (
      titleControl.errors?.['required'] &&
      titleControl.dirty &&
      titleControl.value.trim() === ''
    );
  }

  isDescriptionTooShort(): boolean {
    const descriptionControl = this.createAnimeForm.get('description');
    return (
      descriptionControl.errors?.['minlength'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionTooLong(): boolean {
    const descriptionControl = this.createAnimeForm.get('description');
    return descriptionControl.errors?.['maxlength'] && descriptionControl.dirty;
  }

  isDescriptionNotCapitalized(): boolean {
    const descriptionControl = this.createAnimeForm.get('description');
    return (
      descriptionControl.errors?.['pattern'] &&
      descriptionControl.dirty &&
      !descriptionControl.errors?.['required']
    );
  }

  isDescriptionInvalid(): boolean {
    const descriptionControl = this.createAnimeForm.get('description');
    return (
      descriptionControl.errors?.['required'] &&
      descriptionControl.dirty &&
      descriptionControl.value.trim() === ''
    );
  }

  isImageInvalid(): boolean {
    const imgControl = this.createAnimeForm.get('img');
    return imgControl.invalid && imgControl.dirty;
  }

  isAtLeastOneTagSelected(): boolean {
    const tagsArray = this.createAnimeForm.get('tags') as FormArray;
    const selectedTags = tagsArray.controls
      .map((control) => control.value)
      .some((isChecked) => isChecked);
    return !selectedTags && tagsArray.dirty;
  }
}
