import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Quote } from './Quote';

@Entity()
export class QuotePosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int', nullable: false })
  quoteId: number;

  @ManyToOne(() => Quote)
  @JoinColumn({ name: 'quoteId' })
  quote: Quote;

  @Column({ type: 'int', nullable: false, default: 0 })
  postCount: number;

  @Column({ type: 'datetime', nullable: true })
  lastPostedAt: Date;
}
