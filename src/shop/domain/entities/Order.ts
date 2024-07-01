import { OrderStatus } from "../enums";
import { AddressEntity } from "./Address";
import { OrderLineEntity } from "./OrderLine";

export interface OrderEntity {
    id?: string;
    order_code?: string;
    shop_id?: string;
    customer_id?: string;
    order_date?: Date;
    status?: OrderStatus;
    total_amount?: number;
    shipping_address?: string | AddressEntity;
    billing_address?: string | AddressEntity;
    order_lines?: string[] | OrderLineEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}
