import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

// Estos son test unitarios y te integración
// Para los test end to end se utiliza cypress

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note} />)

  component.getByText('This is a test')
  component.getByText('make not important')

  // Puedes usar pretty dom para ver bien el log
  // const li = component.container.querySelector('li')
  // console.log(li)
  expect(component.container).toHaveTextContent(note.content)
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  // Simular la funcion a ejecutar
  const mockHandler = jest.fn()

  // Renderizar el componente
  const component = render(<Note note={note} toggleImportance={mockHandler} />)

  // Sacar el boton del dom
  const button = component.getByText('make not important')

  // Ejecutar el evento click
  fireEvent.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
