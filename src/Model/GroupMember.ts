import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { UserGroup } from "./UserGroup";

@Entity("user_group_member")
export class GroupMember extends Base {
  @Column()
  group_id?: string;
  @Column()
  user_id?: string;

  @ManyToOne(() => UserGroup, (group) => group.member)
  @JoinColumn({ name: "group_id" })
  group?: UserGroup;
  @ManyToOne(() => User, (user) => user.member)
  @JoinColumn({ name: "user_id" })
  user?: User;
}
