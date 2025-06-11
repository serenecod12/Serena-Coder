export interface ITaskData {
	weekTotal : number
	monthTotal : number
	total : number
	tasks : ITasks[]	
}

export interface ITasks {
	id : string
	title : string
	stratTime : number
	endTime : number
	userID : string
	status : ITaskStatus
}

export type ITaskStatus = 'unstarted' | 'progres' | 'pause'