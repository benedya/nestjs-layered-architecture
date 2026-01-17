import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string | null = null;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  messengerId: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean = true;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date = new Date();

  @Column({ type: 'datetime', nullable: true })
  lastPostedAt: Date = null;
}
