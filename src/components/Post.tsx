
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'
import { Avatar } from './Avatar'
import { Coment } from './Coment'
import styles from './Post.module.css'
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;

}

interface Content {
  type: 'paragraph' | 'link';
  content: string
}

export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({post}:PostProps){
  const [comments, setComments] = useState ([
    'Post muito bacana!'
  ])
 
  const [newCommentText, setNewCommentText] = useState('')
  
  const publishedAtDateFormat = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{locale:ptBR})
  
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {locale: ptBR, addSuffix:true})

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }
  
  function handleCreateNewComment(event: FormEvent){
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatorio!')
  }

  function deleteComment(commentToDelete: string){
    const commentWithoutDeleteOne = comments.filter(comment => {
      return comment != commentToDelete
    })
    setComments(commentWithoutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedAtDateFormat} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line =>{
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link'){
            return <p key={line.content}><a href="#">{line.content}</a></p>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
        <strong>Deixe seu comentario</strong>
        <textarea
          name='comment' 
          placeholder='Digite aqui o que você achou do post'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty }>Publicar</button>
        </footer>
      </form>

      <div className={styles.comentList}>
        {comments.map(comment => {
          return <Coment key={comment} content={comment} onDeleteComment={deleteComment}/>
        })}
      </div>

    </article>
  )
}