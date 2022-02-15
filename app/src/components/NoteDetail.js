import { useParams } from "react-router-dom"

export const NoteDetail = ({notes}) => {

  const {id} = useParams()
  console.log(id)
  const note = notes.find(note => note.id === id)
  if (!notes) return null

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note?.user?.name}</div>
      <div>
        <strong>
          {note.important ? 'important' : ''}
        </strong>
      </div>
    </div>
  )
}