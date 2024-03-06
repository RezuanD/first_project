import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ExtendedBaseEntity } from '@/common/entities/base.entity';
import { User } from '@/users/user.entity';

@Entity()
export class Article extends ExtendedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  title: string;

  @Column({ type: 'text' })
  @ApiProperty()
  @IsString()
  text: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @Column()
  @ApiProperty()
  authorId: string;
}
