import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Plan } from "./Plan";
import { Video } from "./Video";

@Entity("video_plan")
export class VideoPlan extends Base {
  @Column()
  video_id?: string;
  @Column()
  plan_id?: string;

  @ManyToOne(() => Plan, (plan) => plan.video_plan)
  @JoinColumn({ name: "plan_id" })
  plan?: Plan;
  @ManyToOne(() => Video, (video) => video.video_plan)
  @JoinColumn({ name: "video_id" })
  video?: Video;
}
