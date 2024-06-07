import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./Base";
import { UserPlan } from "./UserPlan";
import { VideoPlan } from "./VideoPlan";

@Entity("m_plan")
export class Plan extends Base {
  @Column()
  name?: string;
  @Column()
  validity?: string;
  @Column({ type: "float" })
  amount?: number;
  @Column({ type: "float", default: 0 })
  discount?: number;

  @OneToMany(() => UserPlan, (user_plan) => user_plan.plan)
  user_plan?: UserPlan[];
  @OneToMany(() => VideoPlan, (video_plan) => video_plan.plan)
  video_plan?: VideoPlan[];
}
