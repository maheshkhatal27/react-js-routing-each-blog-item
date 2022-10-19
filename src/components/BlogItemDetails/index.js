import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

/* const blogData = {
  title: 'Blog Name',
  imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
  avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
  author: 'Author Name',
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
} */

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    // console.log(this.props)
    const {match} = this.props
    // console.log(match)
    const {params} = match
    const {id} = params
    console.log(id)

    /* basically how we will get id for the specific blog. So Route in App.js has "id"
     and all such properties like "match","history","location" are associated we can 
    see all of that by doing this.props */

    /* the parameter provided in App.js, <Route path="/blogs/:id" component={BlogItemDetails} wiil be appropriately 
        passed by Route to the BlogItemDetails as props under the match object
    */

    // now we got the id and now we will make use api to fetch the details

    // make us of backtick because we have to access id in string template

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    // console.log(data)

    // now convert from snake case to camel case

    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      content: data.content,
      topic: data.topic,
      author: data.author,
    }

    // now respective state and all the stuff
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state

    const {title, imageUrl, avatarUrl, content, author} = blogData

    return isLoading ? (
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    ) : (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
