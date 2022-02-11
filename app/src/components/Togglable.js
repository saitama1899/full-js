import PropTypes from 'prop-types'
import i18n from '../i18n/index'
import { forwardRef, useImperativeHandle, useState } from 'react'

// forwardRef se utiliza para definir que tu componente pueda ser referenziado por
// el useRef. Tiene una sintaxis especial. El useImperative se utiliza para asociar esas
// referencias y que se pueda utilizar en el componente padre

// Forma de pasar prop children (prop que esta envolviendo el componente)
// En este caso se utiliza con una funcionalidad de toggle para poder reutilizarla
const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  // Alternativa al renderizado condicional, pero esto si que lo renderiza, simplemente esta oculto

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Funcion que meteremos en la referencia
  const toggleVisibility = () => setVisible(!visible)

  // Crear la referencia devolviendo los elementos deseados en el objeto
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{i18n.TOGGLABLE.CANCEL_BTN}</button>
      </div>

    </div>
  )
})

// Prop types es para definir qué props necesita un componente para funcionar correctamente
// Solo saltan warnings en caso de no cumplirlas
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
