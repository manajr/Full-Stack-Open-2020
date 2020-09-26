const dummy = () => {
	return (1)
}

const totalLikes = (blogs) => {
	const reducer = (sum, blogPost) => {
		return blogPost.likes + sum
	}
	const totalLikesAmount = blogs.reduce(reducer,0)
	return (blogs.length === 0 
		? 0
		: totalLikesAmount)
}

const favoriteBlog = (blogs) => {
	const maxLikes = blogs.reduce((mostLiked, blogsPost) => {
		return (Math.max(blogsPost.likes, mostLiked))
	},0)
	const blogPostInfo = blogs.find((post) => post.likes === maxLikes) 
	return {
		title: blogPostInfo.title,
		author: blogPostInfo.author,
		likes: blogPostInfo.likes	
	} 
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}