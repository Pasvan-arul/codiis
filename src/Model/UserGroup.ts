import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { GroupMember } from "./GroupMember";

@Entity("user_group")
export class UserGroup extends Base {
  @Column()
  user_id?: string;
  @Column()
  name?: string;

  @ManyToOne(() => User, (user) => user.group)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @OneToMany(() => GroupMember, (member) => member.group)
  member?: GroupMember[];
}
