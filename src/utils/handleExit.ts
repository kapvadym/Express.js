export const handleExit = (error : Error, origin : string, server? : any) => {
  console.log(`${origin} - Shutting down`)
  console.log(error.name, error.message)
  console.log(error)

  if(server){
    server.close(()=> process.exit(1))
  } else {
    process.exit(1)
  }
}