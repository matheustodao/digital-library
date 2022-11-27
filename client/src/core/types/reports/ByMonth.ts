interface DataTypeParams {
  month: string
  amount: number
}

export type ByMonthParams = [
  {
    id: 'student'
    data: DataTypeParams[]
  },

  {
    id: 'employee'
    data: DataTypeParams[]
  }
]
