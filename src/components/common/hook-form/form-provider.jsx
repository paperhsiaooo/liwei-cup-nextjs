import { FormProvider as Form } from 'react-hook-form'

export default function FormProvider({
  children,
  onSubmit,
  methods,
  ...other
}) {
  return (
    <Form {...methods}>
      <form {...other} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
