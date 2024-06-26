import { UserRole } from "../enums";

export interface UserEntity {
    id?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    login_date?: Date;
    password?: string;
    role?: UserRole;
    shop_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}