/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  bio: string;

  @Column()
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @OneToMany(() => Agenda, agenda => agenda.user)
  agendas: Agenda[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
