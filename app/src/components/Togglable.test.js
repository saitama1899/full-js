import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'
import i18n from '../i18n/index'

// Para comprobar cuanto de tu codigo esta cubierto por test
// npm test -- --coverage
// Tambien puedes abrir el index.html de la carpeta coverage

describe('<Togglable />', () => {
  let component
  const buttonLabel = 'show'
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel={buttonLabel}>
        <div>testDivContent</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContent')
  })

  test('renders its children but they are not visible', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)
    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText(i18n.TOGGLABLE.CANCEL_BTN)
    fireEvent.click(cancelButton)
    expect(el.parentNode).toHaveStyle('display: none')
  })
})
