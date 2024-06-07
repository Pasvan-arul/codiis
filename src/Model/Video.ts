import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./Base";
import { UserFav } from "./Favourite";
import { VideoPlan } from "./VideoPlan";

@Entity("m_video")
export class Video extends Base {
  @Column()
  name?: string;
  @Column()
  description?: string;
  @Column()
  url?: string;
  @Column()
  plan_id?: string;
  @Column()
  valid_upto?: Date;

  @OneToMany(() => UserFav, (fav) => fav.video)
  fav?: UserFav[];
  @OneToMany(() => VideoPlan, (video_plan) => video_plan.video)
  video_plan?: VideoPlan[];
}
