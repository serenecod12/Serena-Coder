import { db } from '@/firebase'
import { ITaskData, ITasks } from '@/tyupe'
import { collection, getDocs, query } from 'firebase/firestore'

export const TaskService = {
  getTask: async (): Promise<ITaskData> => {
    let weekTotal = 0
    let monthTotal = 0
    let total = 0

    const q = query(collection(db, 'tasks'))
    const data = await getDocs(q)

    const tasks = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as ITasks[]

    return {
      tasks,
      weekTotal,
      monthTotal,
      total
    }
  }
}
