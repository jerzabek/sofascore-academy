import { createContext } from 'react'
import { Question } from '../model/Question'

export default createContext<Question[]>([])