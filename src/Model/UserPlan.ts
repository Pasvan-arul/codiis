import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { Plan } from "./Plan";

@Entity("user_plan")
export class UserPlan extends Base {
  @Column()
  user_id?: string;
  @Column()
  plan_id?: string;
  @Column()
  valid_upto?: Date;

  @ManyToOne(() => User, (user) => user.user_plan)
  @JoinColumn({ name: "user_id" })
  user?: User;
  @ManyToOne(() => Plan, (plan) => plan.user_plan)
  @JoinColumn({ name: "plan_id" })
  plan?: Plan;
}
