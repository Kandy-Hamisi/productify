import type { Request, Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

// get all products (public)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

// get single product by ID (public)
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product: ", error);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

// get products by current user (protected)

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user products: ", error);
    return res.status(500).json({ error: "Failed to fetch user products" });
  }
};

// Create product (protected)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, price, imageUrl } = req.body;

    if (!title || !description || !price || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await queries.createProduct({
      userId,
      title,
      description,
      price,
      imageUrl,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product: ", error);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product (protected - owner only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, price, imageUrl } = req.body;

    // check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own products" });
    }

    const updatedProduct = await queries.updateProduct(id, {
      title,
      description,
      price,
      imageUrl,
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product: ", error);
    return res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product (protected - owner only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    //  check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own products" });
    }

    const deletedProduct = await queries.deleteProduct(id);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
