
import {Blog} from "../models/blog.model.js";
import mongose from "mongoose";

const createBlog = async (req, res) => {
    try {
        const { title, content, coverImage, status, tags, categories } = req.body;

        if (!title || !content || !coverImage || !status || !tags || !categories) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!["draft", "published", "archived"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        if (!Array.isArray(tags) || !Array.isArray(categories)) {
            return res.status(400).json({ error: "Tags and categories must be arrays" });
        }

        if(categories.length === 0) {
            return res.status(400).json({ error: "Blog must have at least one category" });
        }

        for(let i = 0; i < categories.length; i++) {
            if ( mongose.Types.ObjectId.isValid(categories[i]) === false) {
                return res.status(400).json({ error: "Invalid category ID" });
            }
        }

        const blogExists = await Blog.findOne({
            title,
            isActive: true,
            createdBy: req.user._id
        });

        if (blogExists) return res.status(400).json({ error: "You already have a blog with this title" });

        const slug = title.toLowerCase().replace(/ /g, "-");
        const blog = await Blog.create({
            title,
            slug,
            content,
            coverImage,
            status,
            tags, 
            categories,
            publishedAt: new Date(),
            author : req.user._id,
            createdBy: req.user._id,
            updatedBy: req.user._id

        });

        return res.status(200).json({ blog, message: "Blog created successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            isActive: true,
            status: "published"
        })
        .populate('categories', 'name -_id')
        .populate('author', "firstName lastName -_id")
        .select('_id title slug coverImage tags status author categories');

        return res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserBlogs = async (req,res) => {

    const { status } = req.body;

    if(!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    if(!["draft", "published", "archived"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        // console.log(req.user);
        const blogs = await Blog.find({
            author: req.user._id, 
            isActive: true,
            status: status
        })
        .populate('categories', 'name -_id')
        .populate('author', "firstName lastName -_id")
        .select('_id title slug coverImage status tags author categories');

        return res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPublicBlog = async (req, res) => {
    const {id} = req.params;

    try {
        const blog = await Blog.findOne({
            _id: id,
            isActive: true,
            status: "published"
        })
        .populate('categories', 'name -_id')
        .populate('author', "firstName lastName -_id")
        .select('_id title slug content coverImage tags author categories');

        return res.status(200).json({
            blog,
            message : "Blog fetched successfully"
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createBlog, getAllBlogs , getUserBlogs ,getPublicBlog};