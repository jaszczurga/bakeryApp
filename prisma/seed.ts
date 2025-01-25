import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Product Categories
    const electronics = await prisma.productCategory.create({
        data: {
            name: 'Electronics',
            description: 'Devices and gadgets for everyday use',
        },
    });

    const books = await prisma.productCategory.create({
        data: {
            name: 'Books',
            description: 'Fiction, non-fiction, and everything in between',
        },
    });

    const furniture = await prisma.productCategory.create({
        data: {
            name: 'Furniture',
            description: 'Comfortable and stylish furniture',
        },
    });

    // Seed Products
    await prisma.product.createMany({
        data: [
            {
                name: 'Laptop',
                description: 'A high-performance laptop for professionals',
                price: 1200.99,
                img: 'https://via.placeholder.com/150',
                categoryId: electronics.id,
            },
            {
                name: 'Smartphone',
                description: 'A latest model smartphone with cutting-edge features',
                price: 899.99,
                img: 'https://via.placeholder.com/150',
                categoryId: electronics.id,
            },
            {
                name: 'Bluetooth Speaker',
                description: 'Portable and powerful sound',
                price: 59.99,
                img: 'https://via.placeholder.com/150',
                categoryId: electronics.id,
            },
            {
                name: 'Science Fiction Novel',
                description: 'Explore the universe through an exciting storyline',
                price: 19.99,
                img: 'https://via.placeholder.com/150',
                categoryId: books.id,
            },
            {
                name: 'Cookbook',
                description: 'Delicious recipes for every occasion',
                price: 25.99,
                img: 'https://via.placeholder.com/150',
                categoryId: books.id,
            },
            {
                name: 'Office Chair',
                description: 'Ergonomic chair for your workspace',
                price: 149.99,
                img: 'https://via.placeholder.com/150',
                categoryId: furniture.id,
            },
            {
                name: 'Dining Table',
                description: 'Elegant table for your dining room',
                price: 499.99,
                img: 'https://via.placeholder.com/150',
                categoryId: furniture.id,
            },
        ],
    });

    // Seed Addresses
    const address1 = await prisma.address.create({
        data: {
            email: 'john.doe@example.com',
            street: '123 Main St',
            city: 'Sample City',
            zipCode: '12345',
        },
    });

    const address2 = await prisma.address.create({
        data: {
            email: 'jane.doe@example.com',
            street: '456 Elm St',
            city: 'Another City',
            zipCode: '67890',
        },
    });



}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
