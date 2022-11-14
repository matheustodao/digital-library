import { useState } from 'react'
import { Select } from 'chakra-react-select'

import { Flex, FormControl, FormLabel, Input, Stack, useMediaQuery } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { BookParams } from '@type/digitalLibrary/book'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'
import { Controller, useFormContext } from 'react-hook-form'

const days = [
  'D', 'S', 'T', 'Q', 'Q', 'S', 'S'
]

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const configDatePicker = {
  dateFormat: 'dd/MM/yyyy',
  monthNames: months,
  dayNames: days
}

interface IProps {
  optionsSelect: Array<{ label: string, value: string }> | undefined
  bookBeingLoaned: BookParams | undefined
}

export default function StepMainForm({ optionsSelect, bookBeingLoaned }: IProps) {
  const [exitDate, setExitDate] = useState<Date>(new Date())
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date())
  const { control, setValue } = useFormContext()
  const [isSmallThan500px] = useMediaQuery('(max-width: 500px)')

  function handleChangeExitDate(date: Date) {
    setExitDate(date)
    setValue('exitDate', date)
  }

  function handleChangeDeliveryDate(date: Date) {
    setDeliveryDate(date)
    setValue('deliveryDate', date)
  }

  return (
    <Stack spacing={20}>
      <Controller
        control={control}
        name="bookId"
        render={({ field }) => (
          <FormControl>
            <FormLabel>
              Titulo do Livro
              <RequiredAsterisk />
            </FormLabel>
            <Select
              options={optionsSelect}
              placeholder="Escolhe um livro"
              focusBorderColor="orange.500"
              errorBorderColor="red"
              {...field}
            />
          </FormControl>
        )}
      />

      <Flex gap={8} direction={isSmallThan500px ? 'column' : 'row'}>
        <FormControl>
          <FormLabel>Autor</FormLabel>
          <Input disabled value={bookBeingLoaned?.authors.join(', ') ?? ''} />
        </FormControl>

        <FormControl>
          <FormLabel>Editora</FormLabel>
          <Input disabled value={bookBeingLoaned?.publishingCompany ?? ''} />
        </FormControl>
      </Flex>

      <Flex gap={8} direction={isSmallThan500px ? 'column' : 'row'}>
        <Controller
          control={control}
          name="exitDate"
          render={() => (
            <FormControl>
              <FormLabel>
                Data de Retirada
                <RequiredAsterisk />
              </FormLabel>
              <SingleDatepicker
                date={exitDate}
                onDateChange={handleChangeExitDate}
                configs={configDatePicker}
                minDate={new Date()}
                propsConfigs={{
                  inputProps: {
                    focusBorderColor: 'orange.500'
                  }
                }}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="deliveryDate"
          render={() => (
            <FormControl>
              <FormLabel>
                Data de Devolução
                <RequiredAsterisk />
              </FormLabel>
              <SingleDatepicker
                date={deliveryDate}
                onDateChange={handleChangeDeliveryDate}
                configs={configDatePicker}
                minDate={new Date()}
                propsConfigs={{
                  inputProps: {
                    focusBorderColor: 'orange.500'
                  }
                }}
              />
            </FormControl>
          )}
        />
      </Flex>
    </Stack>
  )
}
