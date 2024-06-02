import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Providers } from '../types/providers.type';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: 'google' })
    provider: Providers;

    @Column()
    providerId: string;
}
