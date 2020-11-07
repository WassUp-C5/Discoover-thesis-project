export class UserQualifications {
  levels: string[];
  title: string;
  type: string;
  current_level: string;
  guideId: string;

  constructor();
  constructor(data);
  constructor(data?) {
    if (data) {
      this.levels = data.levels;
      this.title = data.title;
      this.current_level = data.current_level;
      this.guideId = data.guideId;
    }
  }
}
