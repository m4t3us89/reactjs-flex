import React, { useRef, useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Scope } from '@unform/core'
import { Form } from '@unform/web'
import ImageInput from './components/Form/ImageInput'
import Input from './components/Form/Input'
import Select from './components/Form/Select'
import * as Yup from 'yup'

import './styles/global.css'

function App () {
  const formRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'John Doe',
        city: '1'
      })
    }, 2000)
  }, [])

  async function handleSubmit (data, { reset }) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        file: Yup.mixed().required('O arquivo é obrigatório'),
        name: Yup.string().required('O nome é obrigatório')
        //password: Yup.string().min(6).required(),
      })
      await schema.validate(data, {
        abortEarly: false
      })
      // Validation passed
      console.log(data)
      reset()
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  return (
    <div id='app'>
      <Header />
      <main id='main'>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <ImageInput name='file' label='Arquivo' />
          <Input name='name' label='Name' />
          <Select
            name='city'
            label='Cidade'
            options={[
              { value: '1', label: 'Palmas' },
              { value: '2', label: 'Açailandia' }
            ]}
          />
          <button type='submit'>Enviar</button>
        </Form>
      </main>
      <Footer />
    </div>
  )
}

export default App
