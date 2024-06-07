import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { Video } from "./Video";

@Entity("user_fav")
export class UserFav extends Base {
  @Column()
  user_id?: string;
  @Column()
  video_id?: string;

  @ManyToOne(() => User, (user) => user.fav)
  @JoinColumn({ name: "user_id" })
  user?: User;
  @ManyToOne(() => Video, (video) => video.fav)
  @JoinColumn({ name: "video_id" })
  video?: Video;
}
