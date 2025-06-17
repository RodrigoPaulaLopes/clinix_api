import { Column } from "typeorm";



export class Address {

    @Column({ length: 255, nullable: true })
    address?: string;

    @Column({ length: 100, nullable: true })
    city?: string;

    @Column({ length: 50, nullable: true })
    state?: string;

    @Column({ length: 10, nullable: true })
    zip_code?: string;


}