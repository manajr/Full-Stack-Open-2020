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

const mostBlogs = (blogs) => {
  const authorCountByPost = blogs.reduce( (cons, current) => {
    if (typeof(cons[current.author]) !== 'undefined'){
        cons[current.author]++
        return cons
      }else{
        cons[current.author]=1
        return(cons)
      }
    },{})
  const authorList = []
  for (i in authorCountByPost) {
    authorList.push({author:i, blogs: authorCountByPost[i]})
  }
  const maxPost = authorList.reduce((acc, inter) => Math.max(inter.blogs, acc),0)
  const maxPostingAuthor = authorList.find( (author) => author.blogs === maxPost)
  return(maxPostingAuthor)
}

const mostLikes = (blogs) => {
  const authorTotalLikes = blogs.reduce( (cons, current) => {
    const authorIndex= cons.findIndex( (res) => res.author === current.author)
    if ( authorIndex !== -1){
        cons[authorIndex].likes += current.likes
        return cons
      }else{
        let newObj = {author: current.author, likes: current.likes}
        cons.push(newObj)
        return cons
      }
    },[])
  const maxLikes = authorTotalLikes.reduce((acc, inter) => Math.max(inter.likes, acc),0)
  const maxPostingAuthor = authorTotalLikes.find( (author) => author.likes === maxLikes)
  return(maxPostingAuthor)
}


module.exports = {
	dummy,
	totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}