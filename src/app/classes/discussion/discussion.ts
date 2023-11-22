import { Anime } from '../anime/anime';
import { Member } from '../member/member';

export class Discussion {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public date: Date,
    public spoiler: boolean,
    public animes: Anime[],
    public participants: Member[],
    public priority: number,
    public img: string
  ) {}
}
