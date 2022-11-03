import { useState } from 'react'
import { Select } from 'chakra-react-select'

import { Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { BookParams } from '@type/digitalLibrary/book'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'

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

  return (
    <Stack spacing={20}>
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
        />
      </FormControl>

      <Flex gap={8}>
        <FormControl>
          <FormLabel>Autor</FormLabel>
          <Input disabled value={bookBeingLoaned?.authors.join(', ')} />
        </FormControl>

        <FormControl>
          <FormLabel>Editora</FormLabel>
          <Input disabled value={bookBeingLoaned?.publishingCompany} />
        </FormControl>
      </Flex>

      <Flex gap={8}>
        <FormControl>
          <FormLabel>
            Data de Retirada
            <RequiredAsterisk />
          </FormLabel>
          <SingleDatepicker
            date={exitDate}
            onDateChange={setExitDate}
            configs={configDatePicker}
            minDate={new Date()}
            propsConfigs={{
              inputProps: {
                focusBorderColor: 'orange.500'
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Data de Devolução
            <RequiredAsterisk />
          </FormLabel>
          <SingleDatepicker
            date={deliveryDate}
            onDateChange={setDeliveryDate}
            configs={configDatePicker}
            propsConfigs={{
              inputProps: {
                focusBorderColor: 'orange.500'
              }
            }}
          />
        </FormControl>
      </Flex>
    </Stack>
  )
}
