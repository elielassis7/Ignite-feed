import { Post, PostType } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import styles from './App.module.css'
import './global.css'

//author: {avatar_url:"", name:"", role:""}
//publishedAt: Date
//content: string



const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Maik Brito",
      role: "Educator RocketSeat"
    },
    content: [
      {type: 'paragraph', content:"Fala galera"},
      {type: 'paragraph', content:"Acabei de subir uma nova postagem"},
      {type: 'link', content:'Hd.informatica'},

    ],
    publishedAt: new Date('2023-06-23 09:05:25')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO RocketSeat"
    },
    content: [
      {type: 'paragraph', content:"Fala galera"},
      {type: 'paragraph', content:"Acabei de subir uma nova postagem"},
      {type: 'link', content:'Hd.informatica'},

    ],
    publishedAt: new Date('2023-06-22 09:05:25')
  }
]

function App() {
  

  return (
    <div> 
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return(
              <Post
                key={post.id}  
                post={post}
                
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
