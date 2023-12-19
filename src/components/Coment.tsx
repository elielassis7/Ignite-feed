import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Coment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}


export function Coment({content, onDeleteComment}:CommentProps){
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeComment(){
    setLikeCount(likeCount + 1)
  }

  return(
    <div className={styles.coment}>
      <Avatar hasBorder={false} src="https://github.com/maykbrito.png" alt=''/>

      <div className={styles.comentBox}>
        <div className={styles.comentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Eliel Assis</strong>
              <time title='22 de Junho de 2023 às 09:00h' dateTime='2023-06-22 09:00:15'>Publicado à 2h atras</time>
            </div>

            <button onClick={handleDeleteComment} title='Deleter comentario'>
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}