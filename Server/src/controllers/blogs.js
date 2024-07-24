const mongoose = require("mongoose");
const blogModel = require("../models/blog_model");

mongoose.connect("mongodb://0.0.0.0:27017/FFSD_DB");

exports.getAllBlogs = async (req, res) => {
	try {
		let blogArray = [];
		await blogModel.Blog.find({}).then((result) => {
			blogArray = result;
		});
		res.status(200).json(blogArray);
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getBlogBy_id = async (req, res) => {
	try {
		const blog_id = req.params.id;
		let blog = await blogModel.Blog.findById(blog_jd);
		res.status(200).json(blog);
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.insertBlog = async (req, res) => {
	const blog = req.body.blog;
	const image = req.body.image;
	const user = req.body.user;

	// console.log(blog, user, image);

	let today = new Date();
	let day = today.toLocaleDateString("en-IN", { dateStyle: "long" });
	await blogModel.Blog.create({
		title: blog.blogTitle,
		content: blog.blogContent,
		blogAuthor: user.name,
		blog_user_id: user._id,
		date: day,
		blogImage: image,
	});
	return res.send("Blog uploaded");
};

exports.removeBlog = async (req, res) => {
	const blog_id = req.params.id;
	blogModel.Blog.deleteOne({ _id: blog_id }).then(() =>
		console.log("Blog deleted")
	);
};
