import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("examples")
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;


}
