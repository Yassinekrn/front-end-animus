export class Anime {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public image_url: string,
    public tags: string[],
    public upvotes: number,
    public downvotes: number
  ) {}
}
