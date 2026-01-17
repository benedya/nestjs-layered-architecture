import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Index()
  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date = new Date();
}
