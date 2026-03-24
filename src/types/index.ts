export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  favorite: boolean
  archived: boolean
  createdAt: string
  updatedAt: string
}

export type NoteCreate = Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string
  createdAt?: string
  updatedAt?: string
}

export interface Board {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface Card {
  id: string
  boardId: string
  title: string
  content?: string
  position: number
  createdAt: string
  updatedAt: string
}
