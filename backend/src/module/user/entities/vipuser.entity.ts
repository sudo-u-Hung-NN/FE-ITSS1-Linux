import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vipuser' })
export class VipUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  vip_option: number;

  @Column()
  expireDate: Date;

}