import React, { useRef, useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
//import { Scope } from '@unform/core'
import { Form } from '@unform/web'
import ImageInput from './components/Form/ImageInput'
import Input from './components/Form/Input'
import Select from './components/Form/Select'
import * as Yup from 'yup'

import './styles/global.css'

function App () {
  const formRef = useRef(null)
  const [t, setT] = useState(null)
  const [citys, setCitys] = useState([])

  useEffect(() => {
    setTimeout(() => {
      //setT('tasdfasdf')

      /*formRef.current.setFieldValue('teste', {
        value: '1',
        label: 'Teste'
      })*/
      formRef.current.setData({
        name: 'John Doe',
        name2: 'Hi'
      })

      formRef.current.setFieldValue('teste', {
        value: '1',
        label: 'Palmas'
      })

      setCitys([
        { value: '1', label: 'Palmas' },
        { value: '2', label: 'Açailandia' }
      ])
      //console.log(formRef.current.clearField('teste'))
      //setT('tasdfasdf')
    }, 1000)

    //console.log(formRef)
  }, [])

  async function handleSubmit (data, { reset }) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        //file: Yup.mixed().required('O arquivo é obrigatório'),
        //name: Yup.string().required('O nome é obrigatório')
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
          <Input name='name2' label='Name2' />
          <Select name='teste' label='teste' options={citys} />
          <button type='submit'>Enviar</button>
        </Form>
      </main>
      <Footer />
    </div>
  )
}

export default App
