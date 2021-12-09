import { connect } from "mongoose"


const connectDB = (url:any) => {
    return connect(url)
  }


export {connectDB}