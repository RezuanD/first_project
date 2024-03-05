import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ExtendedBaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/blog/entities/article.entity';

@Entity()
export class User extends ExtendedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(36)
  username: string;

  @Column({ unique: true })
  @ApiProperty()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @Column()
  @ApiProperty()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
