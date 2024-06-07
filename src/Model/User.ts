import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./Base";
import { UserPlan } from "./UserPlan";
import { UserGroup } from "./UserGroup";
import { GroupMember } from "./GroupMember";
import { UserFav } from "./Favourite";

@Entity("m_user")
export class User extends Base {
  @Column({ default: "customer" })
  role?: string;
  @Column({ unique: true })
  email?: string;
  @Column({ type: "bigint", unique: true })
  mobile?: string;
  @Column({ nullable: true })
  name?: string;
  @Column({ nullable: true })
  password?: string;
  @Column({ nullable: true })
  last_login_date?: Date;

  @OneToMany(() => UserPlan, (user_plan) => user_plan.user)
  user_plan?: UserPlan[];
  @OneToMany(() => UserGroup, (group) => group.user)
  group?: UserGroup[];
  @OneToMany(() => GroupMember, (member) => member.user)
  member?: GroupMember[];
  @OneToMany(() => UserFav, (fav) => fav.user)
  fav?: UserFav[];
}
