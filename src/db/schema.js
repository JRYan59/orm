import { pgTable, integer, varchar, decimal,serial } from "drizzle-orm/pg-core";
import { min } from "drizzle-orm";


export const products = pgTable('products',{
    id: serial('id').primaryKey(),
    description: varchar('description',{length: 255}).unique(),
    price: decimal('price',{min: 0}).notNull(),
});

export const employees = pgTable('employees',{
    id: serial('id').primaryKey(),
    name: varchar('name',{length: 255}).unique(),
    identification: varchar('identification',{length: 10}).notNull(),
});

export const sales = pgTable('sales',{
    id: serial('id').primaryKey(),
    quantity: integer('quantity', {min:1}).notNull(),
    amount: decimal('amount',{min: 0}).notNull(),
    name: varchar('name',{length: 255}).unique(),
    product_id: integer('product_id').references(() => products.id),
    employee_id: integer('employee_id').references(() =>employees.id)
});

