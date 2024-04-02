import express from "express";
import morgan from "morgan";
import { db } from "./db/index.js";
import * as schema from "./db/schema.js";
import { eq } from "drizzle-orm";


const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/products", async (req, res) => {
    const products = await db.query.products.findMany();
    res.json(products);
})
app.post("/products", async (req, res) => {
    let { description, price } = req.body;
    if (!description || !price) {
        return res.status(400).json({ message: "Description and price required" });
    }
    let product = await db.query.products.findFirst({
        where: eq(schema.products.description, description)
    });
    if (product) {
        return res.status(409).json({ message: "Product already exists" });
    }
    description = description.toUpperCase();
    product = await db.insert(schema.products).values(
        { description, price }
    ).returning();
    console.log("Product Created", product)
    res.json(product);
})

app.delete("/products", async (req, res) => {
    let product = req.body;
    product = await db.query.products.findFirst({
        where: eq(schema.products.id,product.id )
    });
    if (product) {
        product = await db.delete(schema.products).where(eq(schema.products.id,product.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Product doesn't exists" });
    }
    
    console.log("Product Deleted", product)
    res.json(product);
})

app.patch("/products", async (req, res) => {
    let updatedProduct = req.body
    let oldproduct = await db.query.products.findFirst({
        where: eq(schema.products.id,updatedProduct.id )
    });
    if (oldproduct) {
        updatedProduct = await db.update(schema.products).set({description:updatedProduct.description.toUpperCase(),price:updatedProduct.price}).where(eq(schema.products.id,oldproduct.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Product doesn't exists" });
    }
    console.log("Product updated", updatedProduct)
    res.json(updatedProduct);
})

app.get("/employees", async (req, res) => {
    const employees = await db.query.employees.findMany();
    res.json(employees);
})
app.post("/employees", async (req, res) => {
    let { name, identification } = req.body;
    if (!name || !identification) {
        return res.status(400).json({ message: "name and identification required" });
    }
    let employee = await db.query.employees.findFirst({
        where: eq(schema.employees.name, name)
    });
    if (employee) {
        return res.status(409).json({ message: "employee already exists" });
    }
    name = name.toUpperCase();
    employee = await db.insert(schema.employees).values(
        { name, identification }
    ).returning();
    console.log("Employee Created", employee)
    res.json(employee);
})

app.delete("/employees", async (req, res) => {
    let employee = req.body;
    employee = await db.query.employees.findFirst({
        where: eq(schema.employees.id,employee.id )
    });
    if (employee) {
        employee = await db.delete(schema.employees).where(eq(schema.employees.id,employee.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Employee doesn't exists" });
    }
    
    console.log("Employee Deleted", employee)
    res.json(employee);
})

app.patch("/employees", async (req, res) => {
    let updatedEmployee = req.body
    let oldemployee = await db.query.employees.findFirst({
        where: eq(schema.employees.id,updatedEmployee.id )
    });
    if (oldemployee) {
        updatedEmployee = await db.update(schema.employees).set({name:updatedEmployee.name.toUpperCase(),identification:updatedProduct.identification}).where(eq(schema.employees.id,oldemployee.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Employee doesn't exists" });
    }
    console.log("Employee updated", updatedEmployee)
    res.json(updatedEmployee);
})

app.get("/sales", async (req, res) => {
    const sales = await db.query.sales.findMany();
    res.json(sales);
})
app.post("/sales", async (req, res) => {
    let { name, amount,quantity } = req.body;
    if (!name || !amount || !quantity) {
        return res.status(400).json({ message: "Description, price,quantity required" });
    }
    let sale = await db.query.sales.findFirst({
        where: eq(schema.sales.name, name)
    });
    if (sale) {
        return res.status(409).json({ message: "Sale already exists" });
    }
    name = description.toUpperCase();
    sale = await db.insert(schema.sales).values(
        { name, amount,quantity,product_id,employee_id }
    ).returning();
    console.log("Sale Created", sale)
    res.json(sale);
})

app.delete("/sales", async (req, res) => {
    let sale = req.body;
    sale = await db.query.sales.findFirst({
        where: eq(schema.sales.id,sale.id )
    });
    if (sale) {
        sale = await db.delete(schema.sales).where(eq(schema.sales.id,sale.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Sale doesn't exists" });
    }
    
    console.log("Sale Deleted", sale)
    res.json(sale);
})

app.patch("/sales", async (req, res) => {
    let updatedSale = req.body
    let oldsale = await db.query.sales.findFirst({
        where: eq(schema.sales.id,updatedSale.id )
    });
    if (oldsale) {
        updatedSale = await db.update(schema.sales).set({name:updatedSale.name.toUpperCase(),amount:updatedSale.amount,quantity:updatedSale.quantity,product_id:updatedSale.product_id,employee_id:employee_id}).where(eq(schema.products.id,oldproduct.id)).returning();
    }
    else{
        return res.status(409).json({ message: "Sale doesn't exists" });
    }
    console.log("Sale updated", updatedSale)
    res.json(updatedSale);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
