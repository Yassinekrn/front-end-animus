enum roleType {
  Admin = 'admin',
  Member = 'member',
}

export class Member {
  constructor(
    public id: number,
    public last_name: string,
    public first_name: string,
    public email: string,
    public role: roleType,
    public join_date: Date
  ) {}
}
