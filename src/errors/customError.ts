class CustomAPIError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode?:any){
    super(message)
    this.statusCode = statusCode
  }
}

const createCustomError = (msg:string, statusCode:number) => {
  return new CustomAPIError(msg, statusCode)
}

export{CustomAPIError, createCustomError}