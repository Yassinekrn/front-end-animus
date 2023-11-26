export class Anime {
  constructor(
    public id?: number, // Make the id parameter optional
    public title: string = '',
    public description: string = '',
    public image_url: string = '',
    public tags: string[] = []
  ) {}
}
