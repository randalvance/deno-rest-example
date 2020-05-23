import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Context, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { Product } from '../types.ts';

let products: Product[] = [
    {
        id: v4.generate(),
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 11.11
    },
    {
        id: v4.generate(),
        name: 'Product 2',
        description: 'Decription for Product 2',
        price: 22.22
    },
    {
        id: v4.generate(),
        name: 'Product 3',
        description: 'Decription for Product 3',
        price: 22.22
    }
];

export const getProducts = ({ response }: RouterContext) => {
    response.body = {
        success: true,
        data: products
    }
};

export const getProduct = ({ params, response }: RouterContext) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product,
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: `Product with id ${params.id} was not found.`,
        };
    }
};

export const addProduct = async ({ request, response }: RouterContext) => {
    const body = await request.body();

    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: 'Invalid Request',
        };
    } else {
        const product: Product = body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product,
        };
    }
};

export const updateProduct = async({ params, request, response }: RouterContext) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        const body = await request.body();

        const updateData: Partial<Product> = body.value;

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p);

        response.status = 200;
        response.body = {
            success: true,
            data: products
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: `Product with ID ${params.id} was not found.`,
        };
    }
};

export const deleteProduct = ({ params, response }: RouterContext) => {
    products = products.filter(p => p.id !== params.id)
    response.body = { 
        success: true,
        msg: 'Product was deleted.'
    }
};