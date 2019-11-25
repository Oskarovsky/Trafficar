export class Box {
  constructor(
    public name: string,
    public description: string,
    public weight: number,
    public width: number,
    public height: number,
    public length: number,
    public target_place: string,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }

}
