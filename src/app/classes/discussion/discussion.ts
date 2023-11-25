import { Anime } from '../anime/anime';
import { Member } from '../member/member';

export class Discussion {
  constructor(
    public id?: number, // Make the id parameter optional
    public title: string = '',
    public description: string = '',
    public date: Date = new Date(),
    public spoiler: boolean = false,
    public animes: Anime[] = [],
    public participants: Member[] = [],
    public priority: number = 1,
    public img: string = ''
  ) {}
}
