import { Entity, Column, OneToMany, ManyToMany } from "typeorm";

import { Person } from "./utils/Person";
import { Transactions } from "./Transaction";
import { Banker } from "./Banker";

@Entity("client")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance?: number;

  @Column({
    default: true,
    name: "active",
  })
  is_active?: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info?: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_members?: string[];

  @OneToMany(() => Transactions, (transaction) => transaction.client)
  transactions?: Transactions[];

  @ManyToMany(() => Banker)
  bankers?: Banker[];
}
