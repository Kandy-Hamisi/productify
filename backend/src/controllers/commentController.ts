import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

// Create comment (protected)
export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // verify if the product exists
    const product = await queries.getProductById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const comment = await queries.createComment({ userId, productId, content });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment: ", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

// Delete comment (protected - owner only)

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { commentId } = req.params;

    // check if comment exists and belongs to user
    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    if (existingComment.userId !== userId) {
      res.status(403).json({ error: "You can only delete your own comments" });
    }

    const deletedComment = await queries.deleteComment(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment: ", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
